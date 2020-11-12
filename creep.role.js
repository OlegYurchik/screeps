const creepRoleBuilder = require("creep.role.builder")
const creepRoleHarvester = require("creep.role.harvester")
const creepRoleUpgrader = require("creep.role.upgrader")

let creepRoles = {
    default: creepRoleHarvester,
    [creepRoleBuilder.name]: creepRoleBuilder,
    [creepRoleHarvester.name]: creepRoleHarvester,
    [creepRoleUpgrader.name]: creepRoleUpgrader,
}

module.exports = creepRoles
