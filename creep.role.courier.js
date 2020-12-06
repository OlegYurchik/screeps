/*
* Creep Role Сourier *
*/ 

const creepRoleWorker = require("creep.role.worker");

let creepRoleCourier = {
    __proto__: creepRoleWorker,

    name: "courier",

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
        var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: function(structure) {
                return (structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_EXTENSION) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;     
            },
        });
        if (!target) {
            target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function(structure) {
                    return structure.structureType == STRUCTURE_TOWER &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;     
                },
            });
        }
        return target;
    },

    chooseState(creep, source, pathToSource, target, pathToTarget) {
        if (creep.memory.roleData.forceRest || (creep.memory.roleData.state != this.stateRest &&
                (!source || creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) &&
                (!target || target.store.getFreeCapacity(RESOURCE_ENERGY) == 0 ||
                creep.store[RESOURCE_ENERGY] == 0))) {
           creep.memory.roleData.state = this.stateRest;
        } else if (creep.memory.roleData.state != this.stateHarvest &&
                       creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0 &&
                       !!source && (creep.store[RESOURCE_ENERGY] == 0 ||
                       (!!pathToTarget && pathToSource.length <= pathToTarget.length) || !target)) {
            creep.memory.roleData.state = this.stateHarvest;
        } else if (creep.memory.roleData.state != this.stateAction &&
                       creep.store[RESOURCE_ENERGY] > 0 && !!target &&
                       (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0 ||
                       (!!pathToSource && pathToTarget.length <= pathToSource.length) || !source)) {
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
                } else if (source instanceof Source || source instanceof Mineral) {
                    this.doHarvest(creep, source, pathToSource);
                } else if (source instanceof Tombstone || source instanceof Structure ||
                        source instanceof Ruin) {
                    this.doWithdraw(creep, source, RESOURCE_ENERGY, pathToSource);
                }
                break;
            case this.stateAction:
                this.doTransfer(creep, target, RESOURCE_ENERGY, pathToTarget);
                break;
        }
    },
};

module.exports = creepRoleCourier;
