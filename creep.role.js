const creepRoleBuilder = require("creep.role.builder")
const creepRoleHarvester = require("creep.role.harvester")
const creepRoleRepairer = require("creep.role.repairer")
const creepRoleUpgrader = require("creep.role.upgrader")

let creepRoles = {
    default: creepRoleHarvester,
    [creepRoleBuilder.name]: creepRoleBuilder,
    [creepRoleHarvester.name]: creepRoleHarvester,
    [creepRoleRepairer.name]: creepRoleRepairer,
    [creepRoleUpgrader.name]: creepRoleUpgrader,
}

module.exports = creepRoles
