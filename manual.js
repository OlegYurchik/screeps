let manual = {
    setRoomTargetState: function(roomName, creeps) {
        Game.rooms[roomName].memory.targetState = {
            creeps: creeps,
        }
        return true
    },
}

module.exports = manual
