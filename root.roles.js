const rootRolePlanned = require("root.role.planned");

const rootRoles = {
    default: rootRolePlanned.name,
    [rootRolePlanned.name]: rootRolePlanned,
};

module.exports = rootRoles;
