/*
* Creep Role Common *
*/

const creepRoleCommon = {
    name: "common",

    chooseDropped(creep, resourceType) {
        return creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
            filter: function(resource) {
                return (!resourceType || resource.resourceType == resourceType) &&
                    resource.amount > 0;
            },
        });
    },

    chooseMineral(creep, resourceType) {
        return creep.pos.findClosestByPath(FIND_MINERALS, {filter: function(mineral) {
            return (!resourceType || mineral.mineralType == resourceType) &&
                mineral.mineralAmount > 0;
        }});
    },

    chooseSource(creep) {
        return creep.pos.findClosestByPath(FIND_SOURCES, {filter: function(source) {
            return source.energy > 0;
        }});
    },

    chooseStorage(creep, resourceType) {
        return creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: function(structure) {
                return (structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_LINK ||
                        structure.structureType == STRUCTURE_STORAGE) &&
                        (!resourceType || structure.store[resourceType] > 0);
            },
        });
    },

    chooseDestroyed(creep, resourceType) {
        var target = creep.pos.findClosestByPath(FIND_TOMBSTONES, {
            filter: function(tombstone) {
                if (resourceType) {
                    return tombstone.store[resourceType] > 0;
                }
                for (let resource in tombstone.store) {
                    if (tombstone.store[resource] > 0) {
                        return true;
                    }
                }
                return false;
            },
        });
        if (!target) {
            target = creep.pos.findClosestByPath(FIND_RUINS, {
                filter: function(ruin) {
                    if (resourceType) {
                        return ruin.store[resourceType] > 0;
                    }
                    for (let resource in ruin.store) {
                        if (ruin.store[resource] > 0) {
                            return true;
                        }
                    }
                    return false;
                },
            });
        }
        return target;
    },

    doAttack(creep, target, path, pathColor, reusedPath) {
        creep.say("👊");
        
        var result = creep.attack(target);
        if (result != ERR_NOT_IN_RANGE) {
            result = creep.rangedAttack(target);
        }
        if (result == ERR_NOT_IN_RANGE) {
            result = this.doMove(creep, target, path, pathColor, reusedPath);
        }
        return result;
    },

    doBuild(creep, target, path, pathColor, reusedPath) {
        creep.say("🚧");
        
        var result = creep.build(target);
        if (result == ERR_NOT_IN_RANGE) {
            result = this.doMove(creep, target, path, pathColor, reusedPath);
        }
        return result;
    },

    doFix(creep, target, path, pathColor, reusedPath) {
        creep.say("🔧");
        
        var result = creep.repair(target);
        if (result == ERR_NOT_IN_RANGE) {
            result = this.doMove(creep, target, path, pathColor, reusedPath);
        }
        return result;
    },

    doHarvest(creep, target, path, pathColor, reusedPath) {
        creep.say("⛏");
        
        var result = creep.harvest(target);
        if (result == ERR_NOT_IN_RANGE) {
            result = this.doMove(creep, target, path, pathColor, reusedPath);
        }
        return result;
    },

    doMove(creep, target, path, pathColor, reusedPath) {
        if (path) {
            return creep.moveByPath(path);
        } else {
            return creep.moveTo(target, {
                visualizePathStyle: {color: pathColor},
                reusedPath: reusedPath,
            });
        }
    },

    doPickup(creep, target, path, pathColor, reusedPath) {
        creep.say("🤏");
        
        var result = creep.pickup(target);
        if (result == ERR_NOT_IN_RANGE) {
            result = this.doMove(creep, target, path, pathColor, reusedPath);
        }
        return result;
    },

    doReserve(creep, target, path, pathColor, reusedPath) {
        creep.say("🏴‍☠️");

        var result = creep.reserveController(target);
        if (result == ERR_NOT_IN_RANGE) {
            result = this.doMove(creep, target, path, pathColor, reusedPath);
        }
        return result;
    },

    doRest(creep, pos, path, pathColor, reusedPath) {
        creep.say("🏠");

        var result;
        if (creep.pos != pos) {
            result = this.doMove(creep, pos, path, pathColor, reusedPath);
        }
        return result;
    },

    doTransfer(creep, target, resourceType, path, pathColor, reusedPath) {
        creep.say("📦");

        var result;
        if (resourceType) {
            result = creep.transfer(target, resourceType);
        } else {
            for (resourceType in creep.store) {
                result = creep.transfer(target, resourceType);
                break;
            }
        }
        if (result == ERR_NOT_IN_RANGE) {
            result = this.doMove(creep, target, path, pathColor, reusedPath);
        }
        return result;
    },

    doUpgrade(creep, path, pathColor, reusedPath) {
        creep.say("⬆");

        var result = creep.upgradeController(creep.room.controller);
        if (result == ERR_NOT_IN_RANGE) {            
            result = this.doMove(creep, creep.room.controller, path, pathColor, reusedPath);
        }
        return result;
    },

    doWithdraw(creep, target, resourceType, path, pathColor, reusedPath) {
        creep.say("🤏");

        var result;
        if (resourceType) {
            result = creep.withdraw(target, resourceType);
        } else {
            if (target instanceof Tombstone || target instanceof Ruin) {
                for (resourceType in target.store) {
                    result = creep.withdraw(target, resourceType);
                    break;
                }
            }
        }
        if (result == ERR_NOT_IN_RANGE) {
            result = this.doMove(creep, target, path, pathColor, reusedPath);
        }
        return result;
    },

    loop(creep) {throw "Not implemented"},
};

module.exports = creepRoleCommon;
