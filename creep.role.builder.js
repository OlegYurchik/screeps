const creepRoleUtils = require("creep.role.utils")
const stateHarvest = 0
const stateBuild = 1

/*
* Builder creep fields *
* state: int
*/ 

let creepRoleBuilder = {
    name: "builder",
    pathColor: "#42aaff",
    reusePath: 100,
    states: [stateHarvest, stateBuild],
    body: {
        [WORK]: 1,
        [CARRY]: 1,
        [MOVE]: 1,
    },

    loop: function(creep) {
        if (!(creep.memory.roleData.state in this.states)) {
            creep.memory.roleData.state = creep.store[RESOURCE_ENERGY] < creep.store.getCapacity() / 2 ? stateHarvest : stateBuild
        }

        if (creep.memory.roleData.state == stateBuild && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.roleData.state = stateHarvest
        } else if (creep.memory.roleData.state == stateHarvest && creep.store.getFreeCapacity() == 0) {
            creep.memory.roleData.state = stateBuild
        }

        if (creep.memory.roleData.state == stateBuild) {
            let target = this.choiceTarget(creep)
            creepRoleUtils.doBuild(creep, target, this.pathColor, this.reusePath)
        } else if (creep.memory.roleData.state == stateHarvest) {
            let source = this.choiceSource(creep)
            creepRoleUtils.doHarvest(creep, source, this.pathColor, this.reusePath)
        }
    },

    choiceSource: function(creep) {
        let sources = creep.room.find(FIND_SOURCES)
        return sources[0]
    },

    choiceTarget: function(creep) {
        let sites = creep.room.find(FIND_CONSTRUCTION_SITES)
        return sites[0]
    },
}

module.exports = creepRoleBuilder
