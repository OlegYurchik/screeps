const creepManager = require("creep.manager")
const creepRoles = require("creep.role")

let getRandomString = function(count) {
    let result = ""
    while (result.length < count) {
        result += Math.random().toString(36).substring(2)
    }
    return result.substring(0, count)
}

let spawnCreepTask = {
    name: "spawnCreep",

    action: function(task, room) {
        let created = false
        let creepRole = creepRoles[task.data.role]
        let spawns = room.find(FIND_MY_SPAWNS, {filter: function(spawn) {return spawn.spawning === null}})
        for (let spawn of spawns) {

            let body = []
            for (let bodyItem in creepRole.body) {
                for (let count = 0; count < creepRole.body[bodyItem]; count++) {
                    body.push(bodyItem)
                }
            }
            let creepName = getRandomString(8)
            let result = spawn.spawnCreep(body, creepName, {memory: {role: task.data.role}})
            if (result == OK) {
                created = true
                if (!(task.data.role in room.memory.state.creepsByRoles)) {
                    room.memory.state.creepsByRoles[task.data.role] = []
                }
                let creep = Game.creeps[creepName]
                room.memory.state.creepsByRoles[task.data.role].push(creep)
                creepManager.init(creep, task.data.role)
            }
        }
        return created
    }
}

module.exports = spawnCreepTask
