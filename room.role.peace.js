const creepRoles = require("creep.role")
const roomRoleUtils = require("room.role.utils")
const taskTypes = require("task")

/*
* Peace room fields *
* state: object
* targetState: object
* tasks: array
*/

let roomRolePeace = {
    name: "peace",
    eventHandlers: {
        
    },
    creepRolePriority: {
        [creepRoles.spawner]: 3,
        [creepRoles.upgrader]: 2,
        [creepRoles.builder]: 1,
    },

    loop: function(room) {
        let tasks = roomRoleUtils.calculateCreepTasks(room, this.creepRolePriority)
        if (tasks.length > 0) {
            let task = tasks[0]
            taskTypes[task.action].action(task, room)
        }

        // let events = room.getEventLog(false)
        
        // for (let index in events) {
        //     let event = events[index]
        //     if (event.event in this.eventHandlers) {
        //         this[this.eventHandlers[event.event]](room, event)
        //     }
        // }
    },
}

module.exports = roomRolePeace
