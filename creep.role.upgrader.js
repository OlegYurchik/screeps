/*
* Creep Role Upgrader *
*/

const creepRoleWorker = require("creep.role.worker");

const creepRoleUpgrader = {
    __proto__: creepRoleWorker,

    name: "upgrader",

    chooseResource(creep) {
        var source = this.chooseStorage(creep, RESOURCE_ENERGY);
        if (!source) {
            source = this.chooseSource(creep);
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
        return creep.room.controller;
    },

    chooseState(creep, source, pathToSource, target, pathToTarget) {
        if (creep.memory.roleData.forceRest || (creep.memory.roleData.state != this.stateRest &&
                (!source || creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0)) &&
                (!target || creep.store[RESOURCE_ENERGY] == 0)) {
           creep.memory.roleData.state = this.stateRest;
        } else if (creep.memory.roleData.state != this.stateHarvest &&
                       creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0 && !!source &&
                       (creep.store[RESOURCE_ENERGY] == 0 ||
                       (!!pathToTarget && pathToSource.length <= pathToTarget.length - 3) ||
                       !target)) {
            creep.memory.roleData.state = this.stateHarvest;
        } else if (creep.memory.roleData.state != this.stateAction &&
                       creep.store[RESOURCE_ENERGY] > 0 && !!target &&
                       (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0 ||
                       (!!pathToSource && pathToTarget.length - 3 <= pathToSource.length) ||
                       !source)) {
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
                } else if (source instanceof Source) {
                    this.doHarvest(creep, source, pathToSource);
                } else if (source instanceof Tombstone || source instanceof Structure ||
                        source instanceof Ruin) {
                    this.doWithdraw(creep, source, RESOURCE_ENERGY, pathToTarget);
                }
                break;
            case this.stateAction:
                this.doUpgrade(creep, pathToTarget);
                break;
        }
    },
};

module.exports = creepRoleUpgrader;
