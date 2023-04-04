let LivingCreature = require("./LivingCreature");
module.exports = class Dino extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 17;
        this.multiply = 0
        this.directions = [];


    }
    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character)
    }

    
    move() {
        this.energy--
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell && this.energy >= 0) {

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
        var emptyCells = this.chooseCell(1)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        var emptyCells1 = this.chooseCell(4)
        var newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells1.length)]
        var emptyCells2 = this.chooseCell(5)
        var newCell2 = emptyCells2[Math.floor(Math.random() * emptyCells2.length)]

        if (newCell) {
            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1)
                    break
                }
            }
        } else if (newCell1) {
            this.energy++
            var newX = newCell1[0]
            var newY = newCell1[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY

            for (var i in humArr) {
                if (newX == humArr[i].x && newY == humArr[i].y) {
                    humArr.splice(i, 1)
                    break
                }
            }
        }
        else if (newCell2) {
            this.energy++
            var newX = newCell2[0]
            var newY = newCell2[1]


            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY

            for (var i in mushroomArr) {
                if (newX == mushroomArr[i].x && newY == mushroomArr[i].y) {
                    mushroomArr.splice(i, 1)
                    break
                }
                this.die()
            }
            
        }
        else {
            this.move()

        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in humArr) {
            if (this.x == dinoArr[i].x && this.y == dinoArr[i].y) {
                dinoArr.splice(i, 1);
                break;
            }
        }
    }
}
    
    


