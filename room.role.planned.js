const creepRoles = require("creep.role")
const taskTypes = require("task")

/*
* Peace room fields *
* state: object
* * creepsByRole: object
* targetState: object
* * creepsByRole: object
* tasks: array of object
*/

let roomRolePlanned = {
    name: "planned",
    eventHandlers: {
        [EVENT_OBJECT_DESTROYED]: "objectDestroyedHandler",
    },
    creepRolePriority: {
        [creepRoles.harvester.name]: 3,
        [creepRoles.upgrader.name]: 2,
        [creepRoles.builder.name]: 1,
    },

    loop: function(room) {
        if (room.memory.roleData.state === undefined) {
            room.memory.roleData.state = {
                creepsByRole: this.getCreepsByRole(room),
            }
        }
        if (room.memory.roleData.targetState === undefined) {
            room.memory.roleData.targetState = {}
        }

        if (room.memory.roleData.tasks === undefined) {
            room.memory.roleData.tasks = []     
        }
        if (room.memory.roleData.tasks.length > 0) {
            let task = room.memory.roleData.tasks[0]
            if (taskTypes[task.action].action(task, room)) {
                room.memory.roleData.tasks.shift()
            }
        }

        let events = room.getEventLog(false)
        
        for (let event of events) {
            if (event.event in this.eventHandlers) {
                this[this.eventHandlers[event.event]](room, event)
            }
        }
    },

    getCreepsByRole: function(room) {
        let creeps = {}
        for (let creep of room.find(FIND_MY_CREEPS)) {
            if (creep.memory.role in creepRoles) {
                if (!(creep.memory.role in creeps)) {
                    creeps[creep.memory.role] = []
                }
                creeps[creep.memory.role].push(creep.name)
            }
        }
        return creeps
    },

    calculateCreepTasks: function(room) {
        if (!room.memory.roleData.targetState.creepsByRole) {
            return []
        }
    
        // Calculate difference beetwen current and want creeps states
        let creepsByRoleDifference = {}
        for (let roleName in room.memory.roleData.targetState.creepsByRole) {
            let current
            if (roleName in room.memory.roleData.state.creepsByRole) {
                current = room.memory.roleData.state.creepsByRole[roleName].length
            } else {
                current = 0
            }
            if (current != room.memory.roleData.targetState.creepsByRole[roleName]) {
                creepsByRoleDifference[roleName] =
                    room.memory.roleData.targetState.creepsByRole[roleName] - current
            }
        }
        
        // Calculate tasks for change creeps
        let changeCreepRoleTasks = []
        let killCreepTasks = []
        let spawnCreepTasks = []
        for (let roleName1 in creepsByRoleDifference) {
            if (creepsByRoleDifference[roleName1] < 0) {
                for (let roleName2 in creepsByRoleDifference) {
                    // TODO: Add compairing with body items
                    if (creepsByRoleDifference[roleName2] > 0) {
                        let count = Math.min(
                            Math.abs(creepsByRoleDifference[roleName1]),
                            creepsByRoleDifference[roleName2],
                        )
                        for (let i = 0; i < count; i++) {
                            changeCreepRoleTasks.push({
                                action: taskTypes.changeCreepRole.name,
                                data: {
                                    originalRole: roleName1,
                                    role: roleName2,
                                },
                            })
                        }
                        creepsByRoleDifference[roleName1] += count
                        creepsByRoleDifference[roleName2] -= count
                    }
                }
            }
        }
    
        // Calculate tasks for delete and create creeps
        for (let roleName in creepsByRoleDifference) {
            if (creepsByRoleDifference[roleName] < 0) {
                let count = Math.abs(creepsByRoleDifference[roleName])
                for (let i = 0; i < count; i++) {
                    killCreepTasks.push({
                        action: taskTypes.killCreep.name,
                        data: {role: roleName},
                    })
                }
            } else if (creepsByRoleDifference[roleName] > 0) {
                let count = creepsByRoleDifference[roleName]
                for (let i = 0; i < count; i++) {
                    spawnCreepTasks.push({
                        action: taskTypes.spawnCreep.name,
                        data: {role: roleName},
                    })
                }
            }
        }
        
        // Sorting tasks
        if (this.creepRolePriority) {
            changeCreepRoleTasks.sort(function(task1, task2) {
                let result = this.creepRolePriority[task2.data.originalRole] -
                    this.creepRolePriority[task1.data.originalRole]
                if (result == 0) {
                    result = this.creepRolePriority[task2.data.role] -
                        this.creepRolePriority[task1.data.role] 
                }
                return result
            }.bind(this))
            killCreepTasks.sort(function(task1, task2) {
                return this.creepRolePriority[task2.data.role] -
                    this.creepRolePriority[task1.data.role]
            }.bind(this))
            spawnCreepTasks.sort(function(task1, task2) {
                return this.creepRolePriority[task2.data.role] -
                    this.creepRolePriority[task1.data.role]
            }.bind(this))
        }
    
        return changeCreepRoleTasks.concat(killCreepTasks).concat(spawnCreepTasks)
    },

    setTargetState: function(room, creepsByRole) {
        room.memory.roleData.targetState = {
            creepsByRole: creepsByRole,
        }
        room.memory.roleData.tasks = this.calculateCreepTasks.bind(this)(room)
    },

    // Event handlers
    objectDestroyedHandler: function(room, event) {
        if (event.data.type == "creep") {
            room.memory.roleData.state.creepsByRole = this.getCreepsByRole(room)
            room.memory.roleData.tasks = this.calculateCreepTasks(room)
        }
    },
}

module.exports = roomRolePlanned
