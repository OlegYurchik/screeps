let changeCreepRoleTask = {
    name: "changeCreepRole",

    action: function(task, room) {
        let creepName = room.memory.roleData.state.creepsByRole[task.data.originalRole].pop()
        let creep = Game.creeps[creepName]
        creep.memory.role = task.data.role
        room.memory.roleData.state.creepsByRole[task.data.role].push(creepName)
        return true
    },
}

module.exports = changeCreepRoleTask
