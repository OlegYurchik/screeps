/*
* Tower required fields *
*/

const towerManager = {
    init(tower) {

    },

    loop(tower) {
        var target = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: function(creep) {
                return creep.hits < creep.hitsMax;
        }});
        if (!target) {
            target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        }
        if (!target) {
            target = tower.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: function(structure) {
                    return structure.hits < structure.hitsMax;
            }});
        }
        if (!target) {
            target = tower.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
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
        } else if (target instanceof Structure) {
            if (target.owner.uwername == "NoraQ") {
                tower.repair(target);
            } else {
                tower.attack(target);
            }
        }
    },
};

module.exports = towerManager;
