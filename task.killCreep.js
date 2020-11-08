let killCreepTask = {
    name: "killCreep",

    action: function(task, room) {
        creep = room.memory.state.creepByRoles[task.data.role].pop()
        creep.suicide()
        return true
    },
}

module.exports = killCreepTask
