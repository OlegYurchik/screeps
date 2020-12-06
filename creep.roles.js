const creepRoleBuilder = require("creep.role.builder");
const creepRoleClaimer = require("creep.role.claimer");
const creepRoleCourier = require("creep.role.courier");
const creepRoleFixer = require("creep.role.fixer");
const creepRoleGuard = require("creep.role.guard");
const creepRoleHarvester = require("creep.role.harvester");
const creepRoleReserver = require("creep.role.reserver");
const creepRoleScavenger = require("creep.role.scavenger");
const creepRoleUpgrader = require("creep.role.upgrader");

const creepRoles = {
    default: creepRoleHarvester,
    [creepRoleBuilder.name]: creepRoleBuilder,
    [creepRoleClaimer.name]: creepRoleClaimer,
    [creepRoleCourier.name]: creepRoleCourier,
    [creepRoleFixer.name]: creepRoleFixer,
    [creepRoleGuard.name]: creepRoleGuard,
    [creepRoleHarvester.name]: creepRoleHarvester,
    [creepRoleReserver.name]: creepRoleReserver,
    [creepRoleScavenger.name]: creepRoleScavenger,
    [creepRoleUpgrader.name]: creepRoleUpgrader,
};

module.exports = creepRoles;
