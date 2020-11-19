function doAttack(creep, target, pathColor, reusePath) {
    var result = creep.attack(target);
    if (result != OK) {
        result = creep.rangedAttack(target);
    }
    if (result == ERR_NOT_IN_RANGE) {
        creep.say("👊");
        creep.moveTo(target, {
            visualizePathStyle: {stroke: pathColor},
            reusePath: reusePath,
            // ignoreCreeps: true.
        });
    }
}

function doBuild(creep, target, pathColor, reusePath) {
    var result = creep.build(target);
    if (result == ERR_NOT_IN_RANGE) {
        creep.say("🚧");
        creep.moveTo(target, {
            visualizePathStyle: {stroke: pathColor},
            reusePath: reusePath,
            // ignoreCreeps: true,
        });
    }
}

function doFix(creep, target, pathColor, reusePath) {
    var result = creep.repair(target);
    if (result == ERR_NOT_IN_RANGE) {
        creep.say("🔧");
        creep.moveTo(target, {
            visualizePathStyle: {stroke: pathColor},
            reusePath: reusePath,
            // ignoreCreeps: true,
        });
    }
}

function doHarvest(creep, target, pathColor, reusePath) {
    var result = creep.harvest(target);
    if (result == ERR_NOT_IN_RANGE) {
        creep.say("⛏");
        creep.moveTo(target, {
            visualizePathStyle: {stroke: pathColor},
            reusePath: reusePath,
            // ignoreCreeps: true,
        });
    }
}

function doPickup(creep, target, pathColor, reusePath) {
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

function doRest(creep, pos, reusePath) {
    if (creep.pos != pos) {
        creep.say("🏠");
        creep.moveTo(pos, {
            visualizePathStyle: {stroke: "#ffffff"},
            reusePath: reusePath,
            // ignoreCreeps: true,
        });
    }
}

function doTransfer(creep, target, resourceType, pathColor, reusePath) {
    var result = creep.transfer(target, resourceType);
    if (result == ERR_NOT_IN_RANGE) {
        creep.say("📦");
        creep.moveTo(target, {
            visualizePathStyle: {stroke: pathColor},
            reusePath: reusePath,
            // ignoreCreeps: true,
        });
    }
}

function doUpgrade(creep, pathColor, reusePath) {
    var result = creep.upgradeController(creep.room.controller);
    if (result == ERR_NOT_IN_RANGE) {
        creep.say("⬆");
        creep.moveTo(creep.room.controller, {
            visualizePathStyle: {stroke: pathColor},
            reusePath: reusePath,
            // ignoreCreeps: true,
        });
    }
}

function doWithdraw(creep, target, resourceType, pathColor, reusePath) {
    var result = creep.withdraw(target, resourceType);
    if (result == ERR_NOT_IN_RANGE) {
        creep.say("🤏");
        creep.moveTo(target, {
            visualizePathStyle: {stroke: pathColor},
            reusePath: reusePath,
            // ignoreCreeps: true,
        });
    }
}

function getCreepHash(roleName, body) {
    var string = roleName + body.join("");
    var hash = 0;
    for (let i = 0; i < string.length; i++) {
        let character = string.charCodeAt(i);
        hash = ((hash<<5)-hash)+character;
        hash = hash & hash;
    }
    return hash.toString();
}

module.exports = {
    doAttack: doAttack,
    doBuild: doBuild,
    doFix: doFix,
    doHarvest: doHarvest,
    doPickup, doPickup,
    doRest: doRest,
    doTransfer: doTransfer,
    doUpgrade: doUpgrade,
    doWithdraw: doWithdraw,
    getCreepHash: getCreepHash,
};
