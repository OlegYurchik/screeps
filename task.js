const changeCreepRoleTask = require("task.changeCreepRole")
const killCreepTask = require("task.killCreep")
const spawnCreepTask = require("task.spawnCreep")

module.exports = {
    [changeCreepRoleTask.name]: changeCreepRoleTask,
    [killCreepTask.name]: killCreepTask,
    [spawnCreepTask.name]: spawnCreepTask,
}
