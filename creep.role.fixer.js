/*
* Creep Role Builder *
*/

const creepRoleWorker = require("creep.role.worker");

const creepRoleFixer = {
    __proto__: creepRoleWorker,

    name: "fixer",

    chooseResource(creep) {
        var source = this.chooseStorage(creep, RESOURCE_ENERGY);
        if (!source) {
            source = this.chooseSource(creep);
        }
        if (!source) {
            source = this.chooseDropped(creep, RESOURCE_ENERGY);
        }
        if (!source) {
            source = this.chooseDestroyed(creep, RESOURCE_ENERGY);
        }
        return source;
    },

    chooseTarget(creep) {
        var target;
        var structures = creep.room.find(FIND_STRUCTURES, {filter: function(structure) {
            return structure.hits < structure.hitsMax;
        }})
        if (structures.length > 0) {
            target = structures[0];
            for (let structure of structures) {
                if (structure.hits < target.hits) {
                    target = structure;
                }
            }
        }
        return target;
    },

    chooseState(creep, source, pathToSource, target, pathToTarget) {
        if (creep.memory.roleData.forceRest || (creep.memory.roleData.state != this.stateRest &&
                (!source || creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0)) &&
                (!target || creep.store[RESOURCE_ENERGY] == 0)) {
           creep.memory.roleData.state = this.stateRest;
        } else if (creep.memory.roleData.state != this.stateHarvest &&
                       creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0 && !!source &&
                       (creep.store[RESOURCE_ENERGY] == 0 ||
                       (!!pathToTarget && pathToSource.length <= pathToTarget.length - 3) ||
                       !target)) {
            creep.memory.roleData.state = this.stateHarvest;
        } else if (creep.memory.roleData.state != this.stateAction &&
                       creep.store[RESOURCE_ENERGY] > 0 && !!target &&
                       (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0 ||
                       (!!pathToSource && pathToTarget.length - 3 <= pathToSource.length) ||
                       !source)) {
            creep.memory.roleData.state = this.stateAction;
        }
    },

    do(creep, source, pathToSource, target, pathToTarget) {
        switch (creep.memory.roleData.state) {
            case this.stateRest:
                if (creep.memory.roleData.restPoint) {
                    this.doRest(creep, creep.memory.roleData.restPoint);
                }
                break;
            case this.stateHarvest:
                if (source instanceof Resource) {
                    this.doPickup(creep, source, pathToSource);
                } else if (source instanceof Source) {
                    this.doHarvest(creep, source, pathToSource);
                } else if (source instanceof Tombstone || source instanceof Structure ||
                        source instanceof Ruin) {
                    this.doWithdraw(creep, source, RESOURCE_ENERGY, pathToTarget);
                }
                break;
            case this.stateAction:
                this.doFix(creep, target, pathToSource);
                break;
        }
    },
};

module.exports = creepRoleFixer;
