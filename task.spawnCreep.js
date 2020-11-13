const creepManager = require("creep.manager")
const creepRoles = require("creep.roles")

const spawnCreepTask = {
    name: "spawnCreep",

    getRandomString(count) {
        var result = "";
        while (result.length < count) {
            result += Math.random().toString(36).substring(2);
        }
        return result.substring(0, count);
    },

    action(task, room) {
        var created = false;
        var creepRole = creepRoles[task.data.role];
        var spawns = room.find(FIND_MY_SPAWNS, {filter: function(spawn) {
            return spawn.spawning === null;
        }});
        for (let spawn of spawns) {
            let body = [];
            for (let bodyItem of creepRole.body) {
                for (let count = 0; count < creepRole.body[bodyItem]; count++) {
                    body.push(bodyItem);
                }
            }
            while (true) {
                let creepName = this.getRandomString(8);
                let result = spawn.spawnCreep(creepRole.body, creepName, {
                    memory: {role: task.data.role},
                });
                if (result == ERR_NAME_EXISTS) {
                    continue;
                }
                if (result == OK) {
                    created = true;
                    if (!(task.data.role in room.memory.roleData.state.creepsByRole)) {
                        room.memory.roleData.state.creepsByRole[task.data.role] = [];
                    }
                    let creep = Game.creeps[creepName];
                    room.memory.roleData.state.creepsByRole[task.data.role].push(creep.name);
                    creepManager.init(creep, task.data.role);
                }
                break;
            }
        }
        return created;
    }
};

module.exports = spawnCreepTask;
