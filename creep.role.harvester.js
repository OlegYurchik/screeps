/*
* Creep Role Harvester *
*/ 

const creepRoleUtils = require("creep.role.utils");
const creepRoleWorker = require("creep.role.worker");

let creepRoleHarvester = {
    __proto__: creepRoleWorker,

    name: "harvester",
    pathColor: "#ffff00",
    reusePath: 100,

    chooseSource(creep) {
        var source = creep.pos.findClosestByPath(FIND_TOMBSTONES, {
            filter: function(tombstone) {
                return tombstone.store[RESOURCE_ENERGY] > 0;
            },
        })
        if (!source) {
            source = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
                filter: function(resource) {
                    return resource.resourceType == RESOURCE_ENERGY && resource.amount > 0;
                },
            });
        }
        if (!source) {
            source = creep.pos.findClosestByPath(FIND_SOURCES, {
                filter: function(source) {
                    return source.energy > 0;
                },
            });
        }
        return source;
    },

    chooseTarget(creep) {
        var target =  creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_EXTENSION) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            },
        });
        if (!target) {
            target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER ||
                            structure.structureType == STRUCTURE_STORAGE) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                },
            });
        }
        return target;
    },

    chooseState(creep, source, pathToSource, target, pathToTarget) {
        if (creep.memory.roleData.forceRest || (creep.memory.roleData.state != this.stateRest &&
            (!source || source.energy == 0 || creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) &&
            (!target || target.store.getFreeCapacity(RESOURCE_ENERGY) == 0 ||
            creep.store[RESOURCE_ENERGY] == 0))) {
           creep.memory.roleData.state = this.stateRest;
        } else if (creep.memory.roleData.state != this.stateHarvest &&
                   creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0 && source &&
                   source.energy > 0 && (creep.store[RESOURCE_ENERGY] == 0 ||
                   (pathToTarget && pathToSource.length <= pathToTarget.length))) {
            creep.memory.roleData.state = this.stateHarvest;
        } else if (creep.memory.roleData.state != this.stateAction &&
                   creep.store[RESOURCE_ENERGY] > 0 && target &&
                   target.store.getFreeCapacity(RESOURCE_ENERGY) > 0 &&
                   (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0 ||
                   (pathToSource && pathToTarget.length <= pathToSource.length))) {
            creep.memory.roleData.state = this.stateAction;
        }
    },

    do(creep, source, pathToSource, target, pathToTarget) {
        if (creep.memory.roleData.state == this.stateAction) {
            creepRoleUtils.doTransfer(creep, target, RESOURCE_ENERGY, this.pathColor,
                                      this.reusePath);
        } else if (creep.memory.roleData.state == this.stateHarvest) {
            if (source instanceof Resource) {
                creepRoleUtils.doPickup(creep, source, this.pathColor, this.reusePath);
            } else if (source instanceof Tombstone) {
                creepRoleUtils.doWithdraw(creep, source, RESOURCE_ENERGY, this.pathColor,
                                          this.reusePath);
            } else if (source instanceof Source) {
                creepRoleUtils.doHarvest(creep, source, this.pathColor, this.reusePath);
            }
        } else if (creep.memory.roleData.state == this.stateRest &&
                   creep.memory.roleData.restPoint) {
            creepRoleUtils.doRest(creep, creep.memory.roleData.restPoint, this.reusePath);
        }
    },
};

module.exports = creepRoleHarvester;
