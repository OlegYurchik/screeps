/*
* Creep Role Builder *
*/

const creepRoleUtils = require("creep.role.utils");
const creepRoleWorker = require("creep.role.worker");

const creepRoleFixer = {
    __proto__: creepRoleWorker,

    name: "fixer",
    pathColor: "#42aaff",
    // reusePath: 100,

    chooseSource(creep) {
        var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: function(structure) {
                return (structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_LINK ||
                        structure.structureType == STRUCTURE_STORAGE) &&
                        structure.store[RESOURCE_ENERGY] > 0;
            },
        });
        if (!source) {
            source = creep.pos.findClosestByPath(FIND_SOURCES, {filter: function(source) {
                return source.energy > 0;
            }});
        }
        if (!source) {
            source = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
                filter: function(resource) {
                    return resource.resourceType == RESOURCE_ENERGY && resource.amount > 0;
                },
            });
        }
        if (!source) {
            var source = creep.pos.findClosestByPath(FIND_TOMBSTONES, {
                filter: function(tombstone) {
                    return tombstone.store[RESOURCE_ENERGY] > 0;
                },
            })
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
                   (!!pathToTarget && pathToSource.length <= pathToTarget.length))) {
            creep.memory.roleData.state = this.stateHarvest;
        } else if (creep.memory.roleData.state != this.stateAction &&
                   creep.store[RESOURCE_ENERGY] > 0 && !!target &&
                   (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0 ||
                   (!!pathToSource && pathToTarget.length <= pathToSource.length))) {
            creep.memory.roleData.state = this.stateAction;
        }
    },

    do(creep, source, pathToSource, target, pathToTarget) {
        if (creep.memory.roleData.state == this.stateAction) {
            creepRoleUtils.doFix(creep, target, this.pathColor, this.reusePath);
        } else if (creep.memory.roleData.state == this.stateHarvest) {
            if (source instanceof Resource) {
                creepRoleUtils.doPickup(creep, source, this.pathColor, this.reusePath);
            } else if (source instanceof Source) {
                creepRoleUtils.doHarvest(creep, source, this.pathColor, this.reusePath);
            } else if (source instanceof Tombstone || source instanceof Structure) {
                creepRoleUtils.doWithdraw(creep, source, RESOURCE_ENERGY, this.pathColor,
                                          this.reusePath);
            }
        } else if (creep.memory.roleData.state == this.stateRest &&
                   creep.memory.roleData.restPoint) {
            creepRoleUtils.doRest(creep, creep.memory.roleData.restPoint, this.reusePath);
        }
    },
};

module.exports = creepRoleFixer;
