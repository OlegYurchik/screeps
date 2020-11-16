const doBuild = function(creep, target, pathColor, reusePath) {
    var result = creep.build(target);
    if (result == ERR_NOT_IN_RANGE) {
        creep.say("🚧");
        creep.moveTo(target, {
            visualizePathStyle: {stroke: pathColor},
            reusePath: reusePath,
            // ignoreCreeps: true,
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
            // ignoreCreeps: true,
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
            // ignoreCreeps: true,
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
            // ignoreCreeps: true,
        });
    }
};

const doRest = function(creep, pos, reusePath) {
    if (creep.pos != pos) {
        creep.say("🏠");
        creep.moveTo(pos, {
            visualizePathStyle: {stroke: "#ffffff"},
            reusePath: reusePath,
            // ignoreCreeps: true,
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
            // ignoreCreeps: true,
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
            // ignoreCreeps: true,
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
            // ignoreCreeps: true,
        });
    }
};

const getCreepHash = function(roleName, body) {
    var string = roleName + body.sort().join("");
    var hash = 0;
    for (let i = 0; i < string.length; i++) {
        let character = string.charCodeAt(i);
        hash = ((hash<<5)-hash)+character;
        hash = hash & hash;
    }
    return hash.toString();
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
    getCreepHash: getCreepHash,
};
