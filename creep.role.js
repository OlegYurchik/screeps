let creepRoleBuilder = require("creep.role.builder")
let creepRoleSpawner = require("creep.role.spawner")
let creepRoleUpgrader = require("creep.role.upgrader")

let creepRoles = {
    [creepRoleBuilder.name]: creepRoleBuilder,
    [creepRoleSpawner.name]: creepRoleSpawner,
    [creepRoleUpgrader.name]: creepRoleUpgrader,
}

module.exports = creepRoles
