const creepRoles = require("creep.role")
const taskTypes = require("task")

let getCreepsByRoles = function(room) {
    let creeps = {}
    for (let creep of room.find(FIND_MY_CREEPS)) {
        if (creep.memory.role in creepRoles) {
            if (!(creep.memory.role in creeps)) {
                creeps[creep.memory.role] = []
            }
            creeps[creep.memory.role].push(creep)
        }
    }
    return creeps
}

let calculateCreepTasks = function(room) {
    if (!room.memory.targetState.creeps) {
        return []
    }

    // Calculate difference beetwen current and want creeps states
    let creepsDifference = {}
    for (let roleName in room.memory.targetState.creeps) {
        let current
        if (roleName in room.memory.state.creepsByRoles) {
            current = room.memory.state.creepsByRoles[roleName].length
        } else {
            current = 0
        }
        if (current != room.memory.targetState.creeps[roleName]) {
            creepsDifference[roleName] = room.memory.targetState.creeps[roleName] - current
        }
    }
    
    // Calculate tasks for change creeps
    let changeCreepRoleTasks = []
    let killCreepTasks = []
    let spawnCreepTasks = []
    for (let roleName1 in creepsDifference) {
        if (creepsDifference[roleName1] < 0) {
            for (let roleName2 in creepsDifference) {
                if (new Set(creepRoles[roleName2].body) == new Set(creepRoles[roleName1].body)) {
                    changeCreepRoleTasks.push({
                        action: taskTypes.changeCreepRole.name,
                        data: {
                            value: Math.min(
                                Math.abs(creepsDifference[roleName1]),
                                Math.abs(creepsDifference[role])
                            ),
                            originalRole: roleName1,
                            role: roleName2,
                        },
                    })
                    creepsDifference[roleName1] += changeCreepRoleTasks[roleName1].data.value
                    creepsDifference[roleName2] -= changeCreepRoleTasks[roleName1].data.value
                }
            }
        }
    }

    // Calculate tasks for delete and create creeps
    for (let roleName in creepsDifference) {
        if (creepsDifference[roleName] < 0) {
            killCreepTasks.push({
                action: taskTypes.killCreep.name,
                data: {
                    value: Math.abs(creepsDifference[roleName]),
                    role: roleName, 
                },
            })
        } else if (creepsDifference[roleName] > 0) {
            spawnCreepTasks.push({
                action: taskTypes.spawnCreep.name,
                data: {
                    value: creepsDifference[roleName],
                    role: roleName, 
                },
            })
        }
    }
    
    // Sorting tasks
    // if (creepRolePriority) {
    //     changeCreepRoleTasks.sort(function(task1, task2) {
    //         return creepRolePriority[task1.from] > creepRolePriority[task2.from] ||
    //             (creepRolePriority[task1.from] == creepRolePriority[task2.from] &&
    //             creepRolePriority[task1.to] > creepRolePriority[task2.to])
    //     })
    //     killCreepTasks.sort(function(task1, task2) {
    //         return creepRolePriority[task1.to] > creepRolePriority[task2.to]
    //     })
    //     spawnCreepTasks.sort(function(task1, task2) {
    //         return creepRolePriority[task1.to] > creepRolePriority[task2.to]
    //     })
    // }

    return changeCreepRoleTasks.concat(killCreepTasks).concat(spawnCreepTasks)
}

module.exports = {
    calculateCreepTasks: calculateCreepTasks,
    getCreepsByRoles: getCreepsByRoles,
}
