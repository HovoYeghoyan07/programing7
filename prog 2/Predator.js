let LivingCreature = require("./LivingCreature")
module.exports = class Predator extends LivingCreature {
    constructor(x, y) {
        super(x,y)
        this.multiply = 0
        this.directions = [];
        this.energy = 16
    }
   

    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character)
    }

mul() {
    this.multiply++;
    var emptyCells = this.chooseCell(0);
    var newCell = emptyCells[Math.floor(Math.random()*emptyCells.length)];

    // console.log(emptyCells);
    if (newCell && this.multiply >= 19) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = 3;

        var newGrassEater = new Predator (newX, newY);
        predatorArr.push(newGrassEater);
        this.multiply = 0;
    }
}
move() {
    this.energy--
    var emptyCells = this.chooseCell(0)
    var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
// console.log(newCell);
    if (newCell && this.energy >= 0) {
        // console.log(newCell)
        var newX = newCell[0]
        var newY = newCell[1]
        matrix[newY][newX] = matrix[this.y][this.x]
        matrix[this.y][this.x] = 0
        this.x = newX
        this.y = newY
    }
    else {
        if (this.energy < 0) {
            this.die()
        }
    }
}
eat() {
    var emptyCells = this.chooseCell(2)
    var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

    if (newCell) {
        this.energy++
        var newX = newCell[0]
        var newY = newCell[1]

        matrix[newY][newX] = matrix[this.y][this.x]
        matrix[this.y][this.x] = 0
        this.x = newX
        this.y = newY
        for (var i in grassEaterArr) {
            if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1)
                break
            }
        }
        if(this.energy >= 15){
            this.mul()
        }
    }
    else {
        this.move()     

    }
    
    
    
}
die() {
    matrix[this.y][this.x] = 0;
    for (var i in predatorArr) {
        if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
            predatorArr.splice(i, 1);
            break;
        }
    }
}
}