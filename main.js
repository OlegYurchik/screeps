var requiredCreeps = {
    harvester: 10,
}
var lastId = 0


module.exports.loop = function() {
    let creepsCount = {
        harvester: 0
    }
    for (let name in Game.creeps) {
        if (Game.creeps[name].role == "harvester") {
            creepsCount["harvester"]++
        }
    }
    for (let role in creepsCount) {
        for (let index = 0; index < requiredCreeps[role] - creepsCount[role]; index++) {
            Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], "Creep" + lastId)
            lastId++
        }
    }
}