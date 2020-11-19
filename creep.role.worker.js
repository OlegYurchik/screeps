/*
* Creep Role Worker [Abstract] *
* state: int
* restPoint: array of 2 digits
* forceSourceID: string
* forceTargetID: string
* forceRest: bool
*/

const stateRest = 0;
const stateHarvest = 1;
const stateAction = 2;

const creepRoleWorker = {
    name: "worker",
    stateRest: stateRest,
    stateHarvest: stateHarvest,
    stateAction: stateAction,
    states: [stateRest, stateHarvest, stateAction],
    defaultState: stateRest,

    loop(creep) {
        var source, target, pathToSource, pathToTarget;

        // Get source and target
        if (creep.memory.roleData.forceSourceID) {
            source = Game.getObjectById(creep.memory.roleData.forceSourceID);
        }
        if (!source) {
            source = this.chooseSource(creep);
        }
        if (creep.memory.roleData.forceTargetID) {
            target = Game.getObjectById(creep.memory.roleData.forceTargetID);
        }
        if (!target) {
            target = this.chooseTarget(creep);
        }

        // Calculate paths to source and target
        if (source) {
            pathToSource = creep.room.findPath(creep.pos, source.pos, {ignoreCreeps: true});
        }
        if (target) {
            pathToTarget = creep.room.findPath(creep.pos, target.pos, {ignoreCreeps: true});
        }

        // Set default state if state is undefined
        if (!(creep.memory.roleData.state in this.states)) {      
            creep.memory.roleData.state = this.defaultState;
        }

        this.chooseState(creep, source, pathToSource, target, pathToTarget);
        this.do(creep, source, pathToSource, target, pathToTarget);
    },

    setRestState(creep) {
        if (creep.memory.roleData.restPoint) {
            creep.memory.roleData.state = stateRest;
            return true;
        }
        return false;
    },

    setHarvestState(creep) {
        creep.memory.roleData.state = stateHarvest;
        return true;
    },

    setActionState(creep) {
        creep.memory.roleData.state = stateAction;
        return true;
    },

    setRestPoint(creep, point) {
        creep.memory.roleData.restPoint = [point.x, point.y];
        return true;
    },

    unsetRestPoint(creep) {
        creep.memory.roleData.restPoint = null;
        return true;
    },

    setForceSource(creep, source) {
        creep.memory.roleData.forceSourceID = source.id;
        return true;
    },

    unsetForceSource(creep) {
        creep.memory.roleData.forceSourceID = null;
        return true;
    },

    setForceTarget(creep, target) {
        creep.memory.roleData.forceTargetID = target.id;
        return true;
    },

    unsetForceTarget(creep) {
        creep.memory.roleData.forceTargetID = null;
        return true;
    },

    setForceRest: function(creep) {
        creep.memory.roleData.forceRest = true;
        return true;
    },

    unsetForceRest: function(creep) {
        creep.memory.roleData.forceRest = false;
        return true;
    },

    chooseSource(creep) {throw "Not implemented"},
    chooseTarget(creep) {throw "Not implemented"},
    chooseState(creep, source, pathToSource, target, pathToTarget) {throw "Not implemented"},
    do(creep, source, pathToSource, target, pathToTarget) {throw "Not implemented"},
};

module.exports = creepRoleWorker;
