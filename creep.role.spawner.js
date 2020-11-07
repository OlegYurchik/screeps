let creepRoleUtils = require("creep.role.utils")

let creepRoleSpawner = {
    name: "spawner",
    pathColor: "#ffff00",
    reusePath: 100,
    body: {
        [WORK]: 1,
        [CARRY]: 1,
        [MOVE]: 1,
    },

    loop: function(creep) {
        if (creep.memory.forceHarvest || creep.store[RESOURCE_ENERGY] == 0) {
            let source = creep.memory.forceSource ? creep.memory.forceSource : this.choiceSource(creep)
            creepRoleUtils.doHarvest(creep, source, this.pathColor, this.reusePath)      
        } else {
            let target = creep.memory.forceTarget ? creep.memory.forceTarget : this.choiceTarget(creep)
            creepRoleUtils.doTransfer(creep, target, this.pathColor, this.reusePath)
        }
    },

    choiceSource: function(creep) {
        let sources = creep.room.find(FIND_SOURCES)
        return sources[0]
    },

    choiceTarget: function(creep) {
        let structures = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_EXTENSION) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            }
        })
        return structures[0]
    },
}

module.exports = creepRoleSpawner
