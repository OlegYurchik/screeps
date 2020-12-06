/*
* Memory required fields *
* initialized: bool
* role: string
* roleData: object
*/

const creepManager = require("creep.manager");
const marketManager = require("market.manager");
const roomManager = require("room.manager");
const rootRoles = require("root.roles");
const towerManager = require("tower.manager");

const rootManager = {
    init(roleName, roleData) {
        if (!Memory.initialized) {
            Memory.initialized = true;
            Memory.role = roleName ? roleName : rootRoles.default.name;
            Memory.roleData = roleData ? roleData : {};
        }
    },

    loop() {
        this.init();

        // Delete memory
        for (let creepName in Memory.creeps) {
            if (Game.creeps[creepName] === undefined) {
                delete Memory.creeps[creepName];
            }
        }
        for (let roomName in Memory.rooms) {
            if (Game.rooms[roomName] === undefined) {
                delete Memory.rooms[roomName];
            }
        }

        // Call loop for root


        // Call loop for rooms and towers
        for (let roomName in Game.rooms) {
            roomManager.loop(Game.rooms[roomName]);
            let towers = Game.rooms[roomName].find(FIND_STRUCTURES, {
                filter: function(structure) {
                    return structure.structureType == STRUCTURE_TOWER &&
                        structure.owner.username == "NoraQ";
            }});
            for (let tower of towers) {
                towerManager.loop(tower);
            }
        }

        // Call loop for creeps
        for (let creepName in Game.creeps) {
            creepManager.loop(Game.creeps[creepName]);
        }

        // Call loop for market
        marketManager.loop();
        },
};

module.exports = rootManager;
