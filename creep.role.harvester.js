/*
* Creep Role Harvester *
* resourceType: string
*/ 

const creepRoleWorker = require("creep.role.worker");

let creepRoleHarvester = {
    __proto__: creepRoleWorker,

    name: "harvester",
    defaultResourceType: RESOURCE_ENERGY,

    // loop(creep) {
    //     if (!creep.memory.roleData.resourceType) {
    //         creep.memory.roleData.resourceType = this.defaultResourceType;
    //     }
    //     creepRoleWorker.loop(creep);
    // },

    chooseResource(creep) {
        if (!creep.memory.roleData.resourceType) {
            creep.memory.roleData.resourceType = this.defaultResourceType;
        }

        var source;
        if (creep.memory.roleData.resourceType == RESOURCE_ENERGY) {
            source = this.chooseSource(creep);
        } else {
            source = this.chooseMineral(creep, creep.memory.roleData.resourceType);
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
                return (structure.structureType == STRUCTURE_CONTAINER ||
                    structure.structureType == STRUCTURE_LINK ||
                    structure.structureType == STRUCTURE_STORAGE) &&
                    structure.store.getFreeCapacity(creep.memory.roleData.resourceType) > 0;
            },
        });
        if (!target && creep.memory.roleData.resourceType == RESOURCE_ENERGY) {
            target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function(structure) {
                    return (structure.structureType == STRUCTURE_TOWER ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_EXTENSION) &&
                        structure.store.getFreeCapacity(creep.memory.roleData.resourceType) > 0;
                },
            });
        }
        return target;
    },

    chooseState(creep, source, pathToSource, target, pathToTarget) {
        if (creep.memory.roleData.forceRest || (creep.memory.roleData.state != this.stateRest &&
                (!source || creep.store.getFreeCapacity(creep.memory.roleData.resourceType) == 0) &&
                (!target || target.store.getFreeCapacity(creep.memory.roleData.resourceType) == 0 ||
                creep.store[creep.memory.roleData.resourceType] == 0))) {
           creep.memory.roleData.state = this.stateRest;
        } else if (creep.memory.roleData.state != this.stateHarvest &&
                       creep.store.getFreeCapacity(creep.memory.roleData.resourceType) > 0 &&
                       !!source && (creep.store[creep.memory.roleData.resourceType] == 0 ||
                       (!!pathToTarget && pathToSource.length <= pathToTarget.length)) || !target) {
            creep.memory.roleData.state = this.stateHarvest;
        } else if (creep.memory.roleData.state != this.stateAction &&
                       creep.store[creep.memory.roleData.resourceType] > 0 && !!target &&
                       (creep.store.getFreeCapacity(creep.memory.roleData.resourceType) == 0 ||
                       (!!pathToSource && pathToTarget.length <= pathToSource.length)) || !source) {
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
                } else if (source instanceof Tombstone || source instanceof Ruin) {
                    this.doWithdraw(creep, source, creep.memory.roleData.resourceType,
                                    pathToSource);
                }
                break;
            case this.stateAction:
                this.doTransfer(creep, target, creep.memory.roleData.resourceType, pathToTarget);
                break;
        }
    },
};

module.exports = creepRoleHarvester;
