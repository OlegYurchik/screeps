/*
* Creep Role Scavenger *
* resourceType: string
*/ 

const creepRoleUtils = require("creep.role.utils");
const creepRoleWorker = require("creep.role.worker");

let creepRoleScavenger = {
    __proto__: creepRoleWorker,

    name: "scavenger",
    pathColor: "#ffff00",
    defaultResourceType: RESOURCE_ENERGY, 
    // reusePath: 100,

    chooseSource(creep) {
        if (!creep.memory.roleData.resourceType) {
            creep.memory.roleData.resourceType = this.defaultResourceType;
        }

        var source = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
            filter: function(resource) {
                return resource.resourceType == creep.memory.roleData.resourceType &&
                    resource.amount > 0;
            },
        });
        if (!source) {
            var source = creep.pos.findClosestByPath(FIND_TOMBSTONES, {
                filter: function(tombstone) {
                    return tombstone.store[creep.memory.roleData.resourceType] > 0;
                },
            })
        }
        return source;
    },

    chooseTarget(creep) {
        var target;
        if (creep.memory.roleData.resourceType == RESOURCE_ENERGY) {
            target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function(structure) {
                    return structure.structureType == STRUCTURE_TOWER &&
                        structure.store.getFreeCapacity(creep.memory.roleData.resourceType) > 0;     
                },
            });
            if (!target) {
                target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: function(structure) {
                        return (structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_EXTENSION) &&
                                structure.store.getFreeCapacity(creep.memory.roleData.resourceType) > 0;
                    },
                });
            }
        }
        if (!target) {
            target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function(structure) {
                    return (structure.structureType == STRUCTURE_CONTAINER ||
                            structure.structureType == STRUCTURE_LINK ||
                            structure.structureType == STRUCTURE_STORAGE) &&
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
                   (!!pathToTarget && pathToSource.length <= pathToTarget.length))) {
            creep.memory.roleData.state = this.stateHarvest;
        } else if (creep.memory.roleData.state != this.stateAction &&
                   creep.store[creep.memory.roleData.resourceType] > 0 && !!target &&
                   (creep.store.getFreeCapacity(creep.memory.roleData.resourceType) == 0 ||
                   (!!pathToSource && pathToTarget.length <= pathToSource.length))) {
            creep.memory.roleData.state = this.stateAction;
        }
    },

    do(creep, source, pathToSource, target, pathToTarget) {
        if (creep.memory.roleData.state == this.stateAction) {
            creepRoleUtils.doTransfer(creep, target, creep.memory.roleData.resourceType,
                                      this.pathColor, this.reusePath);
        } else if (creep.memory.roleData.state == this.stateHarvest) {
            if (source instanceof Resource) {
                creepRoleUtils.doPickup(creep, source, this.pathColor, this.reusePath);
            } else if (source instanceof Tombstone) {
                creepRoleUtils.doWithdraw(creep, source, creep.memory.roleData.resourceType,
                                          this.pathColor, this.reusePath);
            }
        } else if (creep.memory.roleData.state == this.stateRest &&
                   creep.memory.roleData.restPoint) {
            creepRoleUtils.doRest(creep, creep.memory.roleData.restPoint, this.reusePath);
        }
    },
};

module.exports = creepRoleScavenger;
