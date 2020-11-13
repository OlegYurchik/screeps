const roomRolePlanned = require("room.role.planned");

module.exports = {
    setPlannedRoomTargetState: function(roomName, creepsByRole) {
        roomRolePlanned.setTargetState(Game.rooms[roomName], creepsByRole);
        return true;
    },

    killAllCreeps: function(roomName) {
        var creeps;
        if (roomName) {
            creeps = Game.rooms[roomName].find(FIND_MY_CREEPS);
        } else {
            creeps = [];
            for (let creepName in Game.creeps) {
                creeps.push(Game.creeps[creepName]);
            }
        }
        for (let creep of creeps) {
            creep.suicide();
        }
        return true;
    },
};
