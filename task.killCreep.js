const killCreepTask = {
    name: "killCreep",

    action(task, room) {
        var creepName = room.memory.roleData.state.creepsByRole[task.data.role].pop();
        var creep = Game.creeps[creepName];
        creep.suicide();
        return true;
    },
}

module.exports = killCreepTask;
