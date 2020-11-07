let creepRoles = require("creep.role")

let randomString = function(count) {
    let result = ""
    while (result.length < count) {
        result += Math.random().toString(36).substring(2)
    }
    return result.substring(0, count)
}

let createTask = function(value, to, from) {
    return {
        value: value,
        to: to,
        from: from,
    }
}

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

let setWantState = function(room, wantState) {
    room.memory.wantState = wantState
}

let calculateTasks = function(room, creepsByRoles, creepRolePriority) {
    if (!room.memory.wantState) {
        return
    }

    // Calculate difference beetwen current and want creeps states
    let creepsDifference = {}
    for (let roleName in room.memory.wantState) {
        let current = roleName in creepsByRoles ? creepsByRoles[roleName].length : 0
        if (current != room.memory.wantState[roleName]) {
            creepsDifference[roleName] = room.memory.wantState[roleName] - current
        }
    }
    
    // Calculate tasks for change creeps
    let creepChangeTasks = []
    let creepDeleteTasks = []
    let creepCreateTasks = []
    for (let roleName1 in creepsDifference) {
        if (creepsDifference[roleName1] < 0) {
            for (let roleName2 in creepsDifference) {
                if (new Set(creepRoles[roleName2].body) == new Set(creepRoles[roleName1].body)) {
                    creepChangeTasks.push(createTask(
                        Math.min(Math.abs(creepsDifference[roleName1]), Math.abs(creepsDifference[role])),
                        roleName2,
                        roleName1,
                    ))
                    creepsDifference[roleName1] = creepsDifference[roleName1] + creepChangeTasks[roleName1].value
                    creepsDifference[roleName2] = creepsDifference[roleName2] - creepChangeTasks[roleName1].value
                }
            }
        }
    }

    // Calculate tasks for delete and create creeps
    for (let roleName in creepsDifference) {
        if (creepsDifference[roleName] < 0) {
            creepDeleteTasks.push(createTask(
                Math.abs(creepsDifference[roleName]),
                roleName,
            ))
        } else if (creepsDifference[roleName] > 0) {
            creepCreateTasks.push(createTask(
                creepsDifference[roleName],
                roleName,
            ))
        }
    }
    
    // Sorting tasks
    if (creepRolePriority) {
        creepChangeTasks.sort(function(task1, task2) {
            return creepRolePriority[task1.from] > creepRolePriority[task2.from] ||
                (creepRolePriority[task1.from] == creepRolePriority[task2.from] &&
                creepRolePriority[task1.to] > creepRolePriority[task2.to])
        })
        creepDeleteTasks.sort(function(task1, task2) {
            return creepRolePriority[task1.to] > creepRolePriority[task2.to]
        })
        creepCreateTasks.sort(function(task1, task2) {
            return creepRolePriority[task1.to] > creepRolePriority[task2.to]
        })
    }
    
    return [creepChangeTasks, creepDeleteTasks, creepCreateTasks]
}

let doTasks = function(room, creepsByRoles, changeTasks, deleteTasks, createTasks) {
    for (let task of changeTasks) {
        let creep = creepsByRoles[task.from].pop()
        creep.memory.role = task.to
        creepsByRoles[tasks.to].push(creep)
    }
    for (let task of deleteTasks) {
        let creep = creepByRoles[task.to].pop()
        creep.suicide()
    }
    for (let task of createTasks) {
        for (let spawnName in Game.spawns) {
            let spawn = Game.spawns[spawnName]
            let body = []
            let lastBody = []
            for (let bodyItem in creepRoles[task.to].body) {
                for (let count = 0; count < creepRoles[task.to].body[bodyItem]; count++) {
                    body.push(bodyItem)
                }
            }
            while (spawn.canCreateCreep(body) == OK) {
                lastBody = body
                for (let bodyItem in creepRoles[task.to].body) {
                    for (let count = 0; count < creepRoles[task.to].body[bodyItem]; count++) {
                        body.push(bodyItem)
                    }
                }
            }
            if (lastBody) {
                spawn.spawnCreep(lastBody, randomString(8), {memory: {role: task.to}})
                break
            }
        }
        break
    }
}

module.exports = {
    calculateTasks: calculateTasks,
    doTasks: doTasks,
    getCreepsByRoles: getCreepsByRoles,
    setWantState: setWantState,
}