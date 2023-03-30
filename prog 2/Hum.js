let LivingCreature = require("./LivingCreature")
module.exports = class Hum extends LivingCreature {
    constructor(x, y) {
       super(x,y)
        this.energy = 15;
        this.multiply = 0
        this.directions = [];


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
    if (newCell && this.multiply >= 21) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = 4;

        var newPredator = new Hum(newX, newY);
        HumArr.push(newPredator);
        this.multiply = 0;
    }
}
move() {
    this.energy--
    var emptyCells = this.chooseCell(0)
    var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

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
move() {
        this.energy--
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

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
    for (var i in humArr) {
        if (this.x == humArr[i].x && this.y == humArr[i].y) {
            humArr.splice(i, 1);
            break;
        }
    }
}
}