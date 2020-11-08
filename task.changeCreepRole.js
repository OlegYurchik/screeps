let changeCreepRoleTask = {
    name: "changeCreepRole",

    action: function(task, room) {
        creep = room.memory.state.creepsByRoles[task.data.originalRole].pop()
        creep.memory.role = task.data.role
        room.memory.state.creepsByRoles[task.data.role].push(creep)
        return true
    },
}

module.exports = changeCreepRoleTask
