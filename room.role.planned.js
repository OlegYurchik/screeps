/*
* Room Role Planned *
* state: object
* * creepsByHash: object
* targetState: object
* * creepsByHash: object
* tasks: array of object
*/

const creepRoles = require("creep.roles");
const creepRoleUtils = require("creep.role.utils");
const taskTypes = require("tasks");

function arraysEquals(array1, array2) {
    if (array1.length != array2.length) {
        return false;
    }
    for (let index = 0; index < array1.length; index++) {
        if (array1[index] != array2[index]) {
            return false;
        }
    }
    return true;
}

const roomRolePlanned = {
    name: "planned",
    eventHandlers: {
        [EVENT_OBJECT_DESTROYED]: "objectDestroyedHandler",
    },
    creepRolePriority: {
        [creepRoles.harvester.name]: 5,
        [creepRoles.guard.name]: 4,
        [creepRoles.fixer.name]: 3,
        [creepRoles.upgrader.name]: 2,
        [creepRoles.builder.name]: 1,
    },

    init(room, roleData) {

    },

    loop(room) {
        if (room.memory.roleData.state === undefined) {
            room.memory.roleData.state = {
                creepsByHash: this.getCreepsByHash(room),
            };
        }
        if (room.memory.roleData.targetState === undefined) {
            room.memory.roleData.targetState = {};
        }

        if (room.memory.roleData.tasks === undefined) {
            room.memory.roleData.tasks = [];
        }
        if (room.memory.roleData.tasks.length > 0) {
            let task = room.memory.roleData.tasks[0];
            if (taskTypes[task.action].action(task, room)) {
                room.memory.roleData.tasks.shift();
            }
        }

        var events = room.getEventLog(false);
        
        for (let event of events) {
            if (event.event in this.eventHandlers) {
                this[this.eventHandlers[event.event]](room, event);
            }
        }
    },

    getCreepsByHash(room) {
        var creeps = {};
        for (let creep of room.find(FIND_MY_CREEPS)) {
            let hash = creepRoleUtils.getCreepHash(creep.memory.role, creep.body);
            if (!(hash in creeps)) {
                creeps[hash] = {
                    role: creep.memory.role,
                    body: creep.body.sort(),
                    creepsNames: [],
                };
            }
            creeps[hash].creepsNames.push(creep.name);
        }
        return creeps;
    },

    calculateCreepTasks(room) {
        if (!room.memory.roleData.targetState.creepsByHash) {
            return [];
        }
    
        // Calculate difference beetwen current and want creeps states
        var creepsByHashDifference = {};
        for (let hash in room.memory.roleData.targetState.creepsByHash) {
            let current;
            if (hash in room.memory.roleData.state.creepsByHash) {
                current = room.memory.roleData.state.creepsByHash[hash].creepsNames.length;
            } else {
                current = 0;
            }
            if (current != room.memory.roleData.targetState.creepsByHash[hash].count) {
                creepsByHashDifference[hash] = {
                    role: room.memory.roleData.targetState.creepsByHash[hash].role,
                    body: room.memory.roleData.targetState.creepsByHash[hash].body,
                    count: room.memory.roleData.targetState.creepsByHash[hash].count - current,
                };
            }
        }
        for (let hash in room.memory.roleData.state.creepsByHash) {
            if (hash in room.memory.roleData.targetState.creepsByHash) {
                continue;
            }
            let current = room.memory.roleData.state.creepsByHash[hash].creepsNames.length;
            if (current) {
                creepsByHashDifference[hash] = {
                    role: room.memory.roleData.state.creepsByHash[hash].role,
                    body: room.memory.roleData.state.creepsByHash[hash].body,
                    count: -current,
                };
            }
        }

        // Calculate tasks for change creeps
        var changeCreepRoleTasks = [];
        var killCreepTasks = [];
        var spawnCreepTasks = [];
        for (let hash1 in creepsByHashDifference) {
            if (creepsByHashDifference[hash1].count < 0) {
                for (let hash2 in creepsByHashDifference) {
                    if (creepsByHashDifference[hash2].count > 0 &&
                        arraysEquals(
                            creepsByHashDifference[hash1].body.sort(),
                            creepsByHashDifference[hash2].body.sort(),
                        )) {
                        let count = Math.min(
                            -creepsByHashDifference[hash1].count,
                            creepsByHashDifference[hash2].count,
                        );
                        for (let i = 0; i < count; i++) {
                            changeCreepRoleTasks.push({
                                action: taskTypes.changeCreepRole.name,
                                data: {
                                    originalHash: hash1,
                                    hash: hash2,
                                    originalRole: creepsByHashDifference[hash1].role,
                                    role: creepsByHashDifference[hash2].role,
                                },
                            });
                        }
                        creepsByHashDifference[hash1].count += count;
                        creepsByHashDifference[hash2].count -= count;
                    }
                }
            }
        }

        // Calculate tasks for delete and create creeps
        for (let hash in creepsByHashDifference) {
            if (creepsByHashDifference[hash].count < 0) {
                let count = -creepsByHashDifference[hash].count;
                for (let i = 0; i < count; i++) {
                    killCreepTasks.push({
                        action: taskTypes.killCreep.name,
                        data: {hash: hash},
                    });
                }
            } else if (creepsByHashDifference[hash].count > 0) {
                let count = creepsByHashDifference[hash].count;
                for (let i = 0; i < count; i++) {
                    spawnCreepTasks.push({
                        action: taskTypes.spawnCreep.name,
                        data: {
                            hash: hash,
                            role: creepsByHashDifference[hash].role,
                            body: creepsByHashDifference[hash].body,
                        },
                    });
                }
            }
        }

        // Sorting tasks
        if (this.creepRolePriority) {
            changeCreepRoleTasks.sort(function(task1, task2) {
                let result = this.creepRolePriority[task2.data.originalRole] -
                    this.creepRolePriority[task1.data.originalRole];
                if (result == 0) {
                    result = this.creepRolePriority[task2.data.role] -
                        this.creepRolePriority[task1.data.role];
                }
                return result;
            }.bind(this));
            killCreepTasks.sort(function(task1, task2) {
                return this.creepRolePriority[task2.data.role] -
                    this.creepRolePriority[task1.data.role];
            }.bind(this));
            spawnCreepTasks.sort(function(task1, task2) {
                return this.creepRolePriority[task2.data.role] -
                    this.creepRolePriority[task1.data.role];
            }.bind(this));
        }
    
        return changeCreepRoleTasks.concat(spawnCreepTasks).concat(killCreepTasks);
    },

    setTargetState: function(room, targetState) {
        var creepsByHash = {};
        for (let state of targetState) {
            let hash = creepRoleUtils.getCreepHash(state.role, state.body);
            if (!(hash in creepsByHash)) {
                creepsByHash[hash] = state;
            }
        }
        room.memory.roleData.targetState = {
            creepsByHash: creepsByHash,
        };
        room.memory.roleData.tasks = this.calculateCreepTasks(room);
    },

    // Event handlers
    objectDestroyedHandler: function(room, event) {
        if (event.data.type == "creep") {
            room.memory.roleData.state.creepsByHash = this.getCreepsByHash(room);
            room.memory.roleData.tasks = this.calculateCreepTasks(room);
        }
    },
}

module.exports = roomRolePlanned;
