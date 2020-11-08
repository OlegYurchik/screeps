const creepRoleBuilder = require("creep.role.builder")
const creepRoleSpawner = require("creep.role.spawner")
const creepRoleUpgrader = require("creep.role.upgrader")

let creepRoles = {
    default: creepRoleSpawner,
    [creepRoleBuilder.name]: creepRoleBuilder,
    [creepRoleSpawner.name]: creepRoleSpawner,
    [creepRoleUpgrader.name]: creepRoleUpgrader,
}

module.exports = creepRoles
