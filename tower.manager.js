/*
* Tower required fields *
*/

const towerManager = {
    reserveEnergyAmount: 500,

    init(tower) {

    },

    loop(tower) {
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (!target) {
            target = tower.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
        }
        if (!target) {
            target = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: function(creep) {
                    return creep.hits < creep.hitsMax;
            }});
        }
        if (!target &&
                tower.store[RESOURCE_ENERGY] > this.reserveEnergyAmount) {
            let structures = tower.room.find(FIND_STRUCTURES, {filter: function(structure) {
                return (structure instanceof OwnedStructure &&
                    structure.owner.username == "NoraQ" ||
                    structure.room.controller.owner.username == "NoraQ") &&
                    structure.hits < structure.hitsMax;
            }})
            if (structures.length > 0) {
                target = structures[0];
                for (let structure of structures) {
                    if (structure.hits < target.hits) {
                        target = structure;
                    }
                }
            }
        }

        this.do(tower, target);
    },

    do(tower, target) {
        if (target instanceof Creep) {
            if (target.owner.username == "NoraQ") {
                tower.heal(target);
            } else {
                tower.attack(target);
            }
        } else if (target instanceof OwnedStructure) {
            if (target.owner.username == "NoraQ") {
                tower.repair(target);
            } else {
                tower.attack(target);
            }
        } else if (target instanceof Structure) {
            tower.repair(target);
        }
    },
};

module.exports = towerManager;
