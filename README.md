## Planned room steps

### Step 1

* Controller level: 1
* Harvester [WORKx1, CARRYx1, MOVEx1]: number of places for harvest energy * 3
* Scavenger [CARRYx1, MOVEx2]: 1

```
const NOPFHE = 5; const ROOM = "sim"; require("room.role.planned").setTargetState(Game.rooms[ROOM], [{role: "harvester", body: [WORK, CARRY, MOVE], count: NOPFHE * 3}, {role: "scavenger", body: [CARRY, MOVE, MOVE], count: 1}]);
```

### Step 2

* Controller level: 2
* Harvester [WORKx1, CARRYx1, MOVEx1]: number of places for harvest energy
* Scavenger [CARRYx1, MOVEx2]: 1
* Upgrader [WORKx1, CARRYx1, MOVEx1]: number of places for harvest energy * 2

```
const NOPFHE = 5; const ROOM = "sim"; require("room.role.planned").setTargetState(Game.rooms[ROOM], [{role: "harvester", body: [WORK, CARRY, MOVE], count: NOPFHE}, {role: "scavenger", body: [CARRY, MOVE, MOVE], count: 1}, {role: "upgrader", body: [WORK, CARRY, MOVE], count: NOPFHE * 2}]);
```

### Step 3

* Contoller level: 3
* Extensions: 5
* Harvester [WORKx1, CARRYx1, MOVEx1]: number of places for harvest energy
* Scavenger [CARRYx1, MOVEx2]: 1
* Upgrader [WORKx1, CARRYx1, MOVEx1]: number of places for harvest energy
* Builder [WORKx1, CARRYx1, MOVEx1]: number of places for harvest energy
* Fixer [WORKx1, CARRYx1, MOVEx1]: 1

```
const NOPFHE = 5; const ROOM = "sim"; require("room.role.planned").setTargetState(Game.rooms[ROOM], [{role: "harvester", body: [WORK, CARRY, MOVE], count: NOPFHE}, {role: "scavenger", body: [CARRY, MOVE, MOVE], count: 1}, {role: "upgrader", body: [WORK, CARRY, MOVE], count: NOPFHE}, {role: "builder", body: [WORK, CARRY, MOVE], count: NOPFHE}, {role: "fixer", body: [WORK, CARRY, MOVE], count: 1}]);
```

### Step 6

* Contoller level: 4
* Extensions: 10
* Tower: 1
* Harvester [MOVEx3, CARRYx2, WORKx2]: number of places for harvest energy
* Scavenger [MOVEx5, CARRYx4]: 1
* Upgrader [MOVEx3, CARRYx2, WORKx2]: number of places for harvest energy / 2
* Builder [MOVEx3, CARRYx2, WORKx2]: number of places for harvest energy / 2
* Fixer [MOVEx3, CARRYx2, WORKx2]: 1
* Guard [MOVEx3, RANGED_ATTACKx2, ATTACKx1, TOUGHx2]: number of places for harvest energy

```
const NOPFHE = 5; const ROOM = "sim"; require("room.role.planned").setTargetState(Game.rooms[ROOM], [{role: "harvester", body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], count: NOPFHE}, {role: "scavenger", body: [MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY], count: 1}, {role: "upgrader", body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], count: Math.floor(NOPFHE / 2) ? Math.floor(NOPFHE / 2) : 1}, {role: "builder", body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], count: Math.floor(NOPFHE / 2) ? Math.floor(NOPFHE / 2) : 1}, {role: "fixer", body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], count: 1}, {role: "guard", body: [MOVE, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, ATTACK, TOUGH, TOUGH], count: NOPFHE}]);
```

### Step 7

* Contoller level: 5
* Extensions: 20
* Tower: 1
* Storage: 1
* Harvester [MOVEx5, CARRYx5, WORKx3]: number of places for harvest energy
* Scavenger [MOVEx5, CARRYx5, WORKx3]: 1
* Upgrader [MOVEx5, CARRYx5, WORKx3]: number of places for harvest energy / 2
* Builder [MOVEx5, CARRYx5, WORKx3]: number of places for harvest energy / 2
* Fixer [MOVEx5, CARRYx5, WORKx3]: 1
* Guard [MOVEx4, RANGED_ATTACKx2, ATTACKx3, TOUGHx6]: number of places for harvest energy
