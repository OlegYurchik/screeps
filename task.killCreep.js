const killCreepTask = {
    name: "killCreep",

    action(task, room) {
        var index, chosenIndex;
        var ttl = CREEP_LIFE_TIME;
        var creepsNames = room.memory.roleData.state.creepsByHash[task.data.hash].creepsNames;
        for (index = 0, chosenIndex = 0; index < creepsNames.length; index++) {
            if (creepsNames[index].ticksToLive < ttl) {
                ttl = creepsNames[index].ticksToLive;
                chosenIndex = index;
            }
        }
        var creep = Game.creeps[creepsNames[chosenIndex]];
        if (creep) {
            creep.suicide();
        }
        return true;
    },
}

module.exports = killCreepTask;
