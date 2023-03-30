var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("."));
app.get('/', function (req, res) {
res.redirect('index.html');
});

server.listen(3000);


function generator(matLen, gr, grEat,pred,hum,mush) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pred; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < hum; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < mush; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    io.emit("send matrix",matrix)
    return matrix;
}
matrix = generator(15, 25, 20,10,4,22);
grassArr = []
grassEaterArr = []
predatorArr = []
humArr = []
mushroomArr = []
const Grass = require('./Grass')
const GrassEater = require('./GrassEater')
const Predator = require('./Predator')
const Hum = require('./Hum')
const Mushroom = require('./Mushroom')
function creatObj(){
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let gre = new GrassEater(x, y)
                grassEaterArr.push(gre)
    
            } else if (matrix[y][x] == 3) {
                let pre = new Predator(x, y)
                predatorArr.push(pre)
            }
            else if(matrix[y][x] == 4){
                let hum = new Hum(x,y)
                humArr.push(hum)
            }
            else if(matrix[y][x] == 5){
                let mush = new Mushroom(x,y)
                mushroomArr.push(mush)
            }
    
    
        }
    }
    
}
creatObj()

function gameMove(){
    for (let i in grassArr) {
        grassArr[i].mul()
    }
    for (let i in grassEaterArr) {
        // grassEaterArr[i].mul()
        grassEaterArr[i].eat()
        // grassEaterArr[i].die()
        // grassEaterArr[i].move()

    }
    for (let i in predatorArr) {
        // predatorArr[i].mul()
        predatorArr[i].eat()
        // predatorArr[i].die()
        // predatorArr[i].move()
    }
    for(let i in humArr){
        // humArr[i].mul()
        humArr[i].eat()
        // humArr[i].die()
        // humArr[i].move()
      

    }
    io.emit("send matrix",matrix)

}
setInterval(gameMove,500)

