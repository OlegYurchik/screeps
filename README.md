## Planned room steps

### Step 1

* Controller level: 1
* Courier [WORKx1, CARRYx1, MOVEx1]: number of places for harvest energy * 3
* Scavenger [CARRYx1, MOVEx2]: 1

```
const NOPFHE = 5; const ROOM = "sim"; require("room.role.planned").setTargetState(Game.rooms[ROOM], [{role: "courier", body: [WORK, CARRY, MOVE], count: NOPFHE * 3}, {role: "scavenger", body: [CARRY, MOVE, MOVE], count: 1}]);
```

### Step 2

* Controller level: 2
* Courier [WORKx1, CARRYx1, MOVEx1]: number of places for harvest energy
* Scavenger [CARRYx1, MOVEx2]: 1
* Upgrader [WORKx1, CARRYx1, MOVEx1]: number of places for harvest energy * 2

```
const NOPFHE = 5; const ROOM = "sim"; require("room.role.planned").setTargetState(Game.rooms[ROOM], [{role: "courier", body: [WORK, CARRY, MOVE], count: NOPFHE}, {role: "scavenger", body: [CARRY, MOVE, MOVE], count: 1}, {role: "upgrader", body: [WORK, CARRY, MOVE], count: NOPFHE * 2}]);
```

### Step 3

* Contoller level: 3
* Extensions: 5
* Courier [WORKx1, CARRYx1, MOVEx1]: number of places for harvest energy
* Scavenger [CARRYx1, MOVEx2]: 1
* Upgrader [WORKx1, CARRYx1, MOVEx1]: number of places for harvest energy
* Builder [WORKx1, CARRYx1, MOVEx1]: number of places for harvest energy

```
const NOPFHE = 5; const ROOM = "sim"; require("room.role.planned").setTargetState(Game.rooms[ROOM], [{role: "courier", body: [WORK, CARRY, MOVE], count: NOPFHE}, {role: "scavenger", body: [CARRY, MOVE, MOVE], count: 1}, {role: "upgrader", body: [WORK, CARRY, MOVE], count: NOPFHE}, {role: "builder", body: [WORK, CARRY, MOVE], count: NOPFHE}, {role: "fixer", body: [WORK, CARRY, MOVE], count: 1}]);
```

### Step 4

* Contoller level: 4
* Extensions: 10
* Tower: 1
* Courier [MOVEx3, CARRYx2, WORKx2]: number of places for harvest energy
* Scavenger [MOVEx5, CARRYx4]: 1
* Upgrader [MOVEx3, CARRYx2, WORKx2]: number of places for harvest energy / 2
* Builder [MOVEx3, CARRYx2, WORKx2]: number of places for harvest energy / 2
* Guard [MOVEx3, RANGED_ATTACKx2, ATTACKx1, TOUGHx5]: number of places for harvest energy

```
const NOPFHE = 5; const ROOM = "sim"; require("room.role.planned").setTargetState(Game.rooms[ROOM], [{role: "courier", body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], count: NOPFHE}, {role: "scavenger", body: [MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY], count: 1}, {role: "upgrader", body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], count: Math.floor(NOPFHE / 2) ? Math.floor(NOPFHE / 2) : 1}, {role: "builder", body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], count: Math.floor(NOPFHE / 2) ? Math.floor(NOPFHE / 2) : 1}, {role: "guard", body: [MOVE, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH], count: NOPFHE}]);
```

### Step 7

* Contoller level: 5
* Extensions: 20
* Tower: 2
* Storage: 1
* Courier [MOVEx6, CARRYx4, WORKx3]: number of places for harvest energy
* Scavenger [MOVEx8, CARRYx8]: 1
* Upgrader [MOVEx5, CARRYx5, WORKx3]: number of places for harvest energy / 3
* Builder [MOVEx5, CARRYx5, WORKx3]: number of places for harvest energy / 3
* Guard [MOVEx4, RANGED_ATTACKx2, ATTACKx3, TOUGHx6]: number of places for harvest energy / 3

const NOPFHE = 5; const ROOM = "sim"; require("room.role.planned").setTargetState(Game.rooms[ROOM], [{role: "courier", body: [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK], count: NOPFHE}, {role: "scavenger", body: [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], count: 1}, {role: "upgrader", body: [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK], count: Math.floor(NOPFHE / 3) ? Math.floor(NOPFHE / 3) : 1}, {role: "builder", body: [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK], count: Math.floor(NOPFHE / 3) ? Math.floor(NOPFHE / 3) : 1}, {role: "guard", body: [MOVE, MOVE, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, ATTACK, ATTACK, ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH], count: Math.floor(NOPFHE / 3) ? Math.floor(NOPFHE / 3) : 1}]);
