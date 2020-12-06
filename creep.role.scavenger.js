/*
* Creep Role Scavenger *
*/ 

const creepRoleWorker = require("creep.role.worker");

let creepRoleScavenger = {
    __proto__: creepRoleWorker,

    name: "scavenger",

    // loop(creep) {
    //     if (!creep.memory.roleData.resourceType) {
    //         creep.memory.roleData.resourceType = this.defaultResourceType;
    //     }
    //     creepRoleWorker.loop(creep);
    // },

    chooseResource(creep) {
        var source = this.chooseDropped(creep);
        if (!source) {
            source = this.chooseDestroyed(creep);
        }
        return source;
    },

    chooseTarget(creep) {
        return creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: function(structure) {
                if ((structure.structureType != STRUCTURE_CONTAINER &&
                        structure.structureType != STRUCTURE_LINK &&
                        structure.structureType != STRUCTURE_STORAGE)) {
                    return false;
                }
                for (let resource in creep.store) {
                    if (structure.store.getFreeCapacity(resource) > 0) {
                        return true;
                    }
                }
                return false;
            },
        });
    },

    chooseState(creep, source, pathToSource, target, pathToTarget) {
        if (creep.memory.roleData.forceRest || (creep.memory.roleData.state != this.stateRest &&
                (!source || creep.store.getFreeCapacity() == 0) && !target)) {
           creep.memory.roleData.state = this.stateRest;
        } else if (creep.memory.roleData.state != this.stateHarvest &&
                       creep.store.getFreeCapacity() > 0 &&
                       !!source && ((!!pathToTarget &&
                       pathToSource.length <= pathToTarget.length) || !target)) {
            creep.memory.roleData.state = this.stateHarvest;
        } else if (creep.memory.roleData.state != this.stateAction && !!target &&
                       (creep.store.getFreeCapacity() == 0 ||
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

module.exports = creepRoleScavenger;
