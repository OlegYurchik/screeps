/*
* Creep Role Builder *
*/

const creepRoleUtils = require("creep.role.utils");
const creepRoleWorker = require("creep.role.worker");

const creepRoleBuilder = {
    __proto__: creepRoleWorker,

    name: "builder",
    pathColor: "#42aaff",
    // reusePath: 100,

    chooseSource(creep) {
        var source = creep.pos.findClosestByPath(FIND_SOURCES, {filter: function(source) {
            return source.energy > 0;
        }});
        if (source) {
            return source;
        }
        return creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: function(structure) {
                return (structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_STORAGE) &&
                        structure.store[RESOURCE_ENERGY] > 0;
            },
        });
    },

    chooseTarget(creep) {
        var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        if (target) {
            return target;
        }
        var structures = creep.room.find(FIND_STRUCTURES, {filter: function(structure) {
            return structure.hits < structure.hitsMax;
        }})
        structures.sort(function(structure1, structure2) {
            return structure1.hits - structure2.hits;
        });
        if (structures.length > 0) {
            return structures[0];
        }
    },

    chooseState(creep, source, pathToSource, target, pathToTarget) {
        if (creep.memory.roleData.forceRest || (creep.memory.roleData.state != this.stateRest &&
            (!source || source.energy == 0 || creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0)) &&
            (!target || creep.store[RESOURCE_ENERGY] == 0)) {
           creep.memory.roleData.state = this.stateRest;
        } else if (creep.memory.roleData.state != this.stateHarvest &&
                   creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0 && source &&
                   source.energy > 0 && (creep.store[RESOURCE_ENERGY] == 0 ||
                   (pathToTarget && pathToSource.length <= pathToTarget.length))) {
            creep.memory.roleData.state = this.stateHarvest;
        } else if (creep.memory.roleData.state != this.stateAction &&
                   creep.store[RESOURCE_ENERGY] > 0 && target &&
                   (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0 ||
                   (pathToSource && pathToTarget.length <= pathToSource.length))) {
            creep.memory.roleData.state = this.stateAction;
        }
    },

    do(creep, source, pathToSource, target, pathToTarget) {
        if (creep.memory.roleData.state == this.stateAction) {
            if (target instanceof ConstructionSite) {
                creepRoleUtils.doBuild(creep, target, this.pathColor, this.reusePath);
            } else if (target instanceof Structure) {
                creepRoleUtils.doFix(creep, target, this.pathColor, this.reusePath);
            }
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

module.exports = creepRoleBuilder;
