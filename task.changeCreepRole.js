let changeCreepRoleTask = {
    name: "changeCreepRole",

    action: function(task, room) {
        let creep = room.memory.roleData.state.creepsByRole[task.data.originalRole].pop()
        creep.memory.role = task.data.role
        room.memory.roleData.state.creepsByRole[task.data.role].push(creep)
        return true
    },
}

module.exports = changeCreepRoleTask
