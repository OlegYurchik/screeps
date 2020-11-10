const creepRoleUtils = require("creep.role.utils")
const stateRest = 0
const stateHarvest = 1
const stateTransfer = 2

/*
* Spawner creep fields *
* state: int
* restPoint: object
* forceSource: object
* forceTarget: object
* forceRest: bool
*/

let creepRoleSpawner = {
    name: "spawner",
    pathColor: "#ffff00",
    reusePath: 100,
    states: [stateRest, stateHarvest, stateTransfer],
    defaultState: stateRest,
    body: {
        [WORK]: 1,
        [CARRY]: 1,
        [MOVE]: 1,
    },

    loop: function(creep) {
        // Get source and target, calculate paths
        let source = this.chooseSource(creep)
        let target = this.chooseTarget(creep)
        let routeToSource
        let routeToTarget
        if (source) {
            routeToSource = PathFinder.search(search.pos)
        }
        if (target) {
            routeToTarget = PathFinder.search(target.pos)
        }

        // Set default state if state is undefined
        if (!(creep.memory.roleData.state in this.states)) {
            creep.memory.roleData.state = this.defaultState
        }

        // Change state if conditions is true
        if (creep.memory.roleData.forceRest || (creep.memory.roleData.state != stateRest &&
            (!source || source.energy == 0) && (!target || target.store.getFreeCapacity() == 0))) {
           creep.memory.roleData.state = stateRest
        } else if (creep.memory.roleData.state != stateHarvest &&
                   creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0 && source &&
                   source.energy > 0 && routeToSource.cost <= routeToTarget.cost) {
            creep.memory.roleData.state = stateHarvest
        } else if (creep.memory.roleData.state != stateTransfer &&
                   creep.store[RESOURCE_ENERGY] > 0 && target &&
                   target.store.getFreeCapacity(RESOURCE_ENERGY) > 0 &&
                   routeToTarget.cost <= routeToSource.cost) {
            creep.memory.roleData.state = stateTransfer
        }

        // Do action
        if (creep.memory.roleData.state == stateTransfer) {
            creepRoleUtils.doTransfer(creep, target, this.pathColor, this.reusePath)
        } else if (creep.memory.roleData.state == stateHarvest) {
            creepRoleUtils.doHarvest(creep, source, this.pathColor, this.reusePath)
        } else if (creep.memory.roleData.state == stateRest &&
                   creep.memory.roleData.restPoint) {
            creepRoleUtils.doRest(creep, creep.memory.roleData.restPoint, this.reusePath)
        }
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
        return creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_EXTENSION) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            }
        })
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

    setTransferState: function(creep) {
        creep.memory.roleData.state = stateTransfer
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

module.exports = creepRoleSpawner
