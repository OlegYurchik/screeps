const creepRoleUtils = require("creep.role.utils")
const stateRest = 0
const stateHarvest = 1
const stateRepair = 2

/*
* Repairer creep fields *
* state: int
* restPoint: object
* forceSource: object
* forceTarget: object
* forceRest: bool
*/ 

let creepRoleRepairer = {
    name: "repairer",
    pathColor: "#42aaff",
    reusePath: 100,
    states: [stateRest, stateHarvest, stateRepair],
    defaultState: stateRest,
    body: {
        [WORK]: 1,
        [CARRY]: 1,
        [MOVE]: 1,
    },

    loop: function(creep) {
        // Get source and target
        let source
        let target
        if (creep.memory.roleData.forceSource) {
            source = creep.memory.roleData.forceSource
        }
        if (!source) {
            source = this.chooseDroppedResource(creep)
        }
        if (!source) {
            source = this.chooseTombstone(creep)
        }
        if (!source) {
            source = this.chooseSource(creep)
        }
        if (creep.memory.roleData.forceTarget) {
            target = creep.memory.roleData.forceTarget
        }
        if (!target) {
            target = this.chooseTarget(creep)
        }

        // Calculate paths to source and target
        let pathToSource
        let pathToTarget
        if (source) {
            pathToSource = creep.room.findPath(creep.pos, source.pos, {ignoreCreeps: true})
        }
        if (target) {
            pathToTarget = creep.room.findPath(creep.pos, target.pos, {ignoreCreeps: true})
        }

        // Set default state if state is undefined
        if (!(creep.memory.roleData.state in this.states)) {      
            creep.memory.roleData.state = this.defaultState
        }

        // Change state if conditions is true
        if (creep.memory.roleData.forceRest || (creep.memory.roleData.state != stateRest &&
            (!source || source.energy == 0 || creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0)) &&
            (!target || creep.store[RESOURCE_ENERGY] == 0)) {
           creep.memory.roleData.state = stateRest
        } else if (creep.memory.roleData.state != stateHarvest &&
                   creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0 && source &&
                   source.energy > 0 && (creep.store[RESOURCE_ENERGY] == 0 ||
                   (pathToTarget && pathToSource.length <= pathToTarget.length))) {
            creep.memory.roleData.state = stateHarvest
        } else if (creep.memory.roleData.state != stateRepair &&
                   creep.store[RESOURCE_ENERGY] > 0 && target && target.hits < target.hitsMax &&
                   (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0 ||
                   (pathToSource && pathToTarget.length <= pathToSource.length))) {
            creep.memory.roleData.state = stateRepair
        }

        // Do action
        if (creep.memory.roleData.state == stateRepair) {
            creepRoleUtils.doRepair(creep, target, this.pathColor, this.reusePath)
        } else if (creep.memory.roleData.state == stateHarvest) {
            if (source instanceof Resource) {
                creepRoleUtils.doPickup(creep, source, this.pathColor, this.reusePath)
            } else if (source instanceof Tombstone) {
                creepRoleUtils.doWithdraw(creep, source, RESOURCE_ENERGY, this.pathColor,
                                          this.reusePath)
            } else if (source instanceof Source) {
                creepRoleUtils.doHarvest(creep, source, this.pathColor, this.reusePath)
            }
        } else if (creep.memory.roleData.state == stateRest &&
                   creep.memory.roleData.restPoint) {
            creepRoleUtils.doRest(creep, creep.memory.roleData.restPoint, this.reusePath)
        }
    },

    chooseDroppedResource: function(creep) {
        return creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {filter: function(resource) {
            return resource.resourceType == RESOURCE_ENERGY && resource.amount > 0
        }})
    },

    chooseTombstone: function(creep) {
        return creep.pos.findClosestByPath(FIND_TOMBSTONES, {filter: function(tombstone) {
            return tombstone.store[RESOURCE_ENERGY] > 0
        }})
    },

    chooseSource: function(creep) {
        if (creep.memory.roleData.forceSource) {
            return creep.memory.roleData.forceSource
        }
        return creep.pos.findClosestByPath(FIND_SOURCES, {filter: function(source) {
            return source.energy > 0
        }})
    },

    chooseTarget: function(creep) {
        if (creep.memory.roleData.forceTarget) {
            return creep.memory.roleData.forceTarget
        }
        return creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: function(structure) {
            return structure.hits < structure.hitsMax
        }})
    },

    setRestState: function(creep) {
        if (creep.memory.roleData.restPoint) {
            creep.memory.roleData.state = stateRest
            return true
        }
        return false
    },

    setHarvestState: function(creep) {
        creep.memory.roleData.state = stateHarvest
        return true
    },

    setRepairState: function(creep) {
        creep.memory.roleData.state = stateRepair
        return true
    },

    setRestPoint: function(creep, point) {
        creep.memory.roleData.restPoint = point
        return true
    },

    unsetRestPoint: function(creep) {
        creep.memory.roleData.restPoint = null
        return true
    },

    setForceSource: function(creep, source) {
        creep.memory.roleData.forceSource = source
        return true
    },

    unsetForceSource: function(creep) {
        creep.memory.roleData.forceSource = null
        return true
    },

    setForceTarget: function(creep, target) {
        creep.memory.roleData.forceTarget = target
        return true
    },

    unsetForceTarget: function(creep) {
        creep.memory.roleData.forceTarget = null
        return true
    },

    setForceRest: function(creep) {
        creep.memory.roleData.forceRest = true
        return true
    },

    unsetForceRest: function(creep) {
        creep.memory.roleData.forceRest = false
        return true
    },
}

module.exports = creepRoleRepairer
