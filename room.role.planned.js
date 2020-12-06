/*
* Room Role Planned *
* state: object
* * creepsByHash: object
* targetState: object
* * creepsByHash: object
* tasks: array of object
*/

const creepRoles = require("creep.roles");
const roomRoleCommon = require("room.role.common");
const taskTypes = require("tasks");

function arraysIsEqual(array1, array2) {
    if (array1.length != array2.length) {
        return false;
    }
    for (let index = 0; index < array1.length; index++) {
        if (array2[index] != array1[index]) {
            return false;
        }
    }
    return true;
}

const roomRolePlanned = {
    __proto__: roomRoleCommon,

    name: "planned",
    eventHandlers: {
        [EVENT_OBJECT_DESTROYED]: "objectDestroyedHandler",
    },
    ticksToLiveRenew: 100,
    creepRolePriority: {
        [creepRoles.courier.name]: 9,
        [creepRoles.harvester.name]: 8,
        [creepRoles.guard.name]: 7,
        [creepRoles.scavenger.name]: 6,
        [creepRoles.fixer.name]: 5,
        [creepRoles.builder.name]: 4,
        [creepRoles.upgrader.name]: 3,
        [creepRoles.reserver.name]: 2,
        [creepRoles.claimer.name]: 1,
    },

    init(room, roleData) {

    },

    loop(room) {
        if (!room.memory.roleData.state) {
            room.memory.roleData.state = {
                creepsByHash: this.getCreepsState(room),
            };
        }
        if (!room.memory.roleData.targetState) {
            room.memory.roleData.targetState = {};
        }

        if (!room.memory.roleData.tasks) {
            room.memory.roleData.tasks = [];
        }

        // Do tasks
        if (room.memory.roleData.tasks.length > 0) {
            let task = room.memory.roleData.tasks[0];
            if (this.doTask(room, task)) {
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

    getCreepHash(roleName, body) {
        var string = roleName + body.join("");
        var hash = 0;
        for (let i = 0; i < string.length; i++) {
            let character = string.charCodeAt(i);
            hash = ((hash<<5)-hash)+character;
            hash = hash & hash;
        }
        return hash.toString();
    },

    getCreepsState(room) {
        var creeps = room.find(FIND_MY_CREEPS, {filter: function(creep) {
            return creep.memory.roomData.planned == room.name;
        }})
        var state = {};
        for (let creep of creeps) {
            let body = [];
            for (let bodyItem of creep.body) {
                body.push(bodyItem.type);
            }
            let hash = this.getCreepHash(creep.memory.role, body.sort());
            if (!(hash in state)) {
                state[hash] = {
                    role: creep.memory.role,
                    body: body,
                    creepsNames: [],
                };
            }
            state[hash].creepsNames.push(creep.name);
        }
        return state;
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
                let roleData;
                if (room.memory.roleData.targetState.creepsByHash[hash].roleData) {
                    roleData = room.memory.roleData.targetState.creepsByHash[hash].roleData;
                } else {
                    roleData = {};
                }
                creepsByHashDifference[hash] = {
                    role: room.memory.roleData.targetState.creepsByHash[hash].role,
                    roleData: roleData,
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
                    roleData: {},
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
                        arraysIsEqual(
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
                                    roleData: creepsByHashDifference[hash2].roleData,
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
                            roleData: creepsByHashDifference[hash].roleData,
                            roomData: {planned: room.name},
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

    setTargetState(room, targetState) {
        var creepsByHash = {};
        for (let state of targetState) {
            let hash = this.getCreepHash(state.role, state.body.sort());
            creepsByHash[hash] = state;
        }
        room.memory.roleData.targetState = {
            creepsByHash: creepsByHash,
        };
        room.memory.roleData.tasks = this.calculateCreepTasks(room);
    },

    doTask(room, task) {
        return taskTypes[task.action].action(task, room);
    },

    // Event handlers
    objectDestroyedHandler(room, event) {
        if (event.data.type == LOOK_CREEPS) {
            room.memory.roleData.state.creepsByHash = this.getCreepsState(room);
            room.memory.roleData.tasks = this.calculateCreepTasks(room);
        }
    },
}

module.exports = roomRolePlanned;
