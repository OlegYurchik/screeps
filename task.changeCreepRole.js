const changeCreepRoleTask = {
    name: "changeCreepRole",

    action(task, room) {
        var creepName = room.memory.roleData.state.creepsByRole[task.data.originalRole].pop();
        var creep = Game.creeps[creepName];
        creep.memory.role = task.data.role;
        room.memory.roleData.state.creepsByRole[task.data.role].push(creepName);
        return true;
    },
}

module.exports = changeCreepRoleTask;
