## Planned room steps

### Step 1

* Controller level: 1
* Harvester [WORK, CARRY, MOVE]: number of places for harvest energy * 3

### Step 2

* Controller level: 2
* Harvester [WORK, CARRY, MOVE]: number of places for harvest energy
* Upgrader [WORK, CARRY, MOVE]: number of places for harvest energy * 2

### Step 4

* Contoller level: 3
* Extensions: 5
* Harvester [WORK, CARRY, MOVE]: number of places for harvest energy
* Upgrader [WORK, CARRY, MOVE]: number of places for harvest energy
* Builder [WORK, CARRY, MOVE]: number of places for harvest energy

### Step 6

* Contoller level: 4
* Extensions: 10
* Tower: 1
* Harvester [MOVE, MOVE, MOVE, CARRY, CARRY, WORK, WORK]: number of places for harvest energy
* Upgrader [MOVE, MOVE, MOVE, CARRY, CARRY, WORK, WORK]: number of places for harvest energy / 2
* Builder [MOVE, MOVE, MOVE, CARRY, CARRY, WORK, WORK]: number of places for harvest energy / 2
* Guard [MOVE, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, ATTACK, TOUGH, TOUGH]: number of places for harvest energy

Task:

Places for harvest energy = 5
Exits = 3

```
require("room.role.planned").setTargetState(Game.rooms["W23S45"], [{role: "harvester", body: [MOVE, MOVE, MOVE, CARRY, CARRY, WORK, WORK], count: 5}, {role: "upgrader", body: [MOVE, MOVE, MOVE, CARRY, CARRY, WORK, WORK], count: 2}, {role: "builder", body: [MOVE, MOVE, MOVE, CARRY, CARRY, WORK, WORK], count: 2}, {role: "guard", body: [MOVE, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, ATTACK, TOUGH, TOUGH], count: 5}])
```