const creepManager = require("creep.manager");

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
        var spawns = room.find(FIND_MY_SPAWNS, {filter: function(spawn) {
            return spawn.spawning === null;
        }});
        for (let spawn of spawns) {
            while (true) {
                let creepName = this.getRandomString(8);
                let result = spawn.spawnCreep(task.data.body, creepName, {
                    memory: {role: task.data.role},
                });
                if (result == ERR_NAME_EXISTS) {
                    continue;
                }
                if (result == OK) {
                    created = true;
                    if (!(task.data.hash in room.memory.roleData.state.creepsByHash)) {
                        room.memory.roleData.state.creepsByHash[task.data.hash] = {
                            role: task.data.role,
                            body: task.data.body,
                            creepsNames: [],
                        };
                    }
                    room.memory.roleData.state.creepsByHash[task.data.hash].creepsNames.push(
                        creepName,
                    );
                    creepManager.init(Game.creeps[creepName], task.data.role, task.data.roleData);
                    return created;
                }
                break;
            }
        }
    }
};

module.exports = spawnCreepTask;
