let roomRoleUtils = require("room.role.utils")

let roomRoleDefault = {
    name: "default",
    eventHandlers: {
        
    },

    loop: function(room) {
        // let events = room.getEventLog(false)
        
        // for (let index in events) {
        //     let event = events[index]
        //     if (event.event in this.eventHandlers) {
        //         this[this.eventHandlers[event.event]](room, event)
        //     }
        // }
        
        let creepsByRoles = roomRoleUtils.getCreepsByRoles(room)
        let tasks = roomRoleUtils.calculateTasks(room, creepsByRoles)
        if (tasks) {
            roomRoleUtils.doTasks(room, creepsByRoles, tasks[0], tasks[1], tasks[2])
        }
    },
}

module.exports = roomRoleDefault