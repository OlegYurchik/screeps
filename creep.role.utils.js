const doBuild = function(creep, target, pathColor, reusePath) {
    var result = creep.build(target);
    if (result == ERR_NOT_IN_RANGE) {
        creep.say("🚧");
        creep.moveTo(target, {
            visualizePathStyle: {stroke: pathColor},
            reusePath: reusePath,
        });
    }
};

const doHarvest = function(creep, target, pathColor, reusePath) {
    var result = creep.harvest(target);
    if (result == ERR_NOT_IN_RANGE) {
        creep.say("⛏");
        creep.moveTo(target, {
            visualizePathStyle: {stroke: pathColor},
            reusePath: reusePath,
        });
    }
};

const doPickup = function(creep, target, pathColor, reusePath) {
    var result = creep.pickup(target);
    if (result == ERR_NOT_IN_RANGE) {
        creep.say("🤏");
        creep.moveTo(target, {
            visualizePathStyle: {stroke: pathColor},
            reusePath: reusePath,
        });
    }
};

const doRepair = function(creep, target, pathColor, reusePath) {
    var result = creep.repair(target);
    if (result == ERR_NOT_IN_RANGE) {
        creep.say("🔧");
        creep.moveTo(target, {
            visualizePathStyle: {stroke: pathColor},
            reusePath: reusePath,
        });
    }
};

const doRest = function(creep, pos, reusePath) {
    if (creep.pos != pos) {
        creep.say("🏠");
        creep.moveTo(pos, {
            visualizePathStyle: {stroke: "#ffffff"},
            reusePath: reusePath,
        });
    }
};

const doTransfer = function(creep, target, resourceType, pathColor, reusePath) {
    var result = creep.transfer(target, resourceType);
    if (result == ERR_NOT_IN_RANGE) {
        creep.say("📦");
        creep.moveTo(target, {
            visualizePathStyle: {stroke: pathColor},
            reusePath: reusePath,
        });
    }
};

const doUpgrade = function(creep, pathColor, reusePath) {
    var result = creep.upgradeController(creep.room.controller);
    if (result == ERR_NOT_IN_RANGE) {
        creep.say("⬆");
        creep.moveTo(creep.room.controller, {
            visualizePathStyle: {stroke: pathColor},
            reusePath: reusePath,
        });
    }
};

const doWithdraw = function(creep, target, resourceType, pathColor, reusePath) {
    var result = creep.withdraw(target, resourceType);
    if (result == ERR_NOT_IN_RANGE) {
        creep.say("🤏");
        creep.moveTo(target, {
            visualizePathStyle: {stroke: pathColor},
            reusePath: reusePath,
        });
    }
};

module.exports = {
    doBuild: doBuild,
    doHarvest: doHarvest,
    doPickup, doPickup,
    doRepair: doRepair,
    doRest: doRest,
    doTransfer: doTransfer,
    doUpgrade: doUpgrade,
    doWithdraw: doWithdraw,
};
