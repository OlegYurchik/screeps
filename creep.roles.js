const creepRoleBuilder = require("creep.role.builder");
const creepRoleGuard = require("creep.role.guard");
const creepRoleHarvester = require("creep.role.harvester");
const creepRoleUpgrader = require("creep.role.upgrader");

const creepRoles = {
    default: creepRoleHarvester,
    [creepRoleBuilder.name]: creepRoleBuilder,
    [creepRoleGuard.name]: creepRoleGuard,
    [creepRoleHarvester.name]: creepRoleHarvester,
    [creepRoleUpgrader.name]: creepRoleUpgrader,
};

module.exports = creepRoles;
