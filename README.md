## Planned room steps

### First step

* Controller level: 2
* Harvester [WORK, CARRY, MOVE]: number of places for harvest energy
* Upgrader [WORK, CARRY, MOVE]: number of places for harvest energy

### Second step

* Controller level: 3
* Extensions: 5
* Harvester [WORK, CARRY, MOVE]: number of places for harvest energy
* Upgrader [WORK, CARRY, MOVE]: number of places for harvest energy
* Builder [WORK, CARRY, MOVE]: number of places for harvest energy

### Third step

* Controller level: 4
* Extensions: 10
* Tower: 1
* Harvester [MOVE, MOVE, MOVE, CARRY, CARRY, WORK, WORK]: number of places for harvest energy
* Upgrader [MOVE, MOVE, MOVE, CARRY, CARRY, WORK, WORK]: number of places for harvest energy / 2
* Builder [MOVE, MOVE, MOVE, CARRY, CARRY, WORK, WORK]: number of places for harvest energy / 2
* Fixer [MOVE, MOVE, MOVE, CARRY, CARRY, WORK, WORK]: number of places for harvest energy
* Guard [MOVE, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, ATTACK, TOUGH, TOUGH]: number of exits * 2

Task:

Places for harvest energy = 5
Exits = 3

```
require("room.role.planned").setTargetState(Game.rooms["W23S45"], [{role: "harvester", body: [MOVE, MOVE, MOVE, CARRY, CARRY, WORK, WORK], count: 5}, {role: "upgrader", body: [MOVE, MOVE, MOVE, CARRY, CARRY, WORK, WORK], count: 2}, {role: "builder", body: [MOVE, MOVE, MOVE, CARRY, CARRY, WORK, WORK], count: 2}, {role: "fixer", body: [MOVE, MOVE, MOVE, CARRY, CARRY, WORK, WORK], count: 5}, {role: "guard", body: [MOVE, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, ATTACK, TOUGH, TOUGH], count: 6}])
```