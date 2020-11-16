const changeCreepRoleTask = {
    name: "changeCreepRole",

    action(task, room) {
        var creepName =
            room.memory.roleData.state.creepsByHash[task.data.originalHash].creepsNames.pop();
        var creep = Game.creeps[creepName];
        creep.memory.role = task.data.role;
        if (!(task.data.hash in room.memory.roleData.state.creepsByHash)) {
            room.memory.roleData.state.creepsByHash[task.data.hash] = {
                role: task.data.role,
                body: task.data.body,
                creepsNames: [],
            };
        }
        room.memory.roleData.state.creepsByHash[task.data.hash].creepsNames.push(creepName);
        return true;
    },
}

module.exports = changeCreepRoleTask;
