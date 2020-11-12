let killCreepTask = {
    name: "killCreep",

    action: function(task, room) {
        let creepName = room.memory.roleData.state.creepsByRole[task.data.role].pop()
        let creep = Game.creeps[creepName]
        creep.suicide()
        return true
    },
}

module.exports = killCreepTask
