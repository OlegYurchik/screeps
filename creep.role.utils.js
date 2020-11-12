let doBuild = function(creep, target, pathColor, reusePath) {
    let result = creep.build(target)
    if (result == ERR_NOT_IN_RANGE) {
        creep.say("🚧")
        creep.moveTo(target, {
            visualizePathStyle: {stroke: pathColor},
            reusePath: reusePath,
        })
    }
}

let doHarvest = function(creep, target, pathColor, reusePath) {
    let result = creep.harvest(target)
    if (result == ERR_NOT_IN_RANGE) {
        creep.say("⛏")
        creep.moveTo(target, {
            visualizePathStyle: {stroke: pathColor},
            reusePath: reusePath,
        })
    }
}

let doPickup = function(creep, target, pathColor, reusePath) {
    let result = creep.pickup(target)
    if (result == ERR_NOT_IN_RANGE) {
        creep.say("🤏")
        creep.moveTo(target, {
            visualizePathStyle: {stroke: pathColor},
            reusePath: reusePath,
        })
    }
}

let doRest = function(creep, pos, reusePath) {
    if (creep.pos != pos) {
        creep.say("🏠")
        creep.moveTo(pos, {
            visualizePathStyle: {stroke: "#ffffff"},
            reusePath: reusePath,
        })
    }
}

let doTransfer = function(creep, target, resourceType, pathColor, reusePath) {
    let result = creep.transfer(target, resourceType)
    if (result == ERR_NOT_IN_RANGE) {
        creep.say("📦")
        creep.moveTo(target, {
            visualizePathStyle: {stroke: pathColor},
            reusePath: reusePath,
        })
    }
}

let doUpgrade = function(creep, pathColor, reusePath) {
    let result = creep.upgradeController(creep.room.controller)
    if (result == ERR_NOT_IN_RANGE) {
        creep.say("⬆")
        creep.moveTo(creep.room.controller, {
            visualizePathStyle: {stroke: pathColor},
            reusePath: reusePath,
        })
    }
}

let doWithdraw = function(creep, target, resourceType, pathColor, reusePath) {
    let result = creep.withdraw(target, resourceType)
    if (result == ERR_NOT_IN_RANGE) {
        creep.say("🤏")
        creep.moveTo(target, {
            visualizePathStyle: {stroke: pathColor},
            reusePath: reusePath,
        })
    }
}

module.exports = {
    doBuild: doBuild,
    doHarvest: doHarvest,
    doPickup, doPickup,
    doRest: doRest,
    doTransfer: doTransfer,
    doUpgrade: doUpgrade,
    doWithdraw: doWithdraw,
}
