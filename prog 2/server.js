var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs");




app.use(express.static("."));
app.get('/', function (req, res) {
res.redirect('index.html');
});

server.listen(3000);


function generator(matLen, gr, grEat,pred,hum,mush,dino) {
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
        for (let i = 0; i < dino; i++) {
            let x = Math.floor(Math.random() * matLen);
            let y = Math.floor(Math.random() * matLen);
            if (matrix[x][y] == 0) {
                matrix[x][y] = 6;
            }
        }
    }
    io.emit("send matrix",matrix)
    return matrix;
}

matrix = generator(30, 28, 20,10,4,22,5);
grassArr = []
grassEaterArr = []
predatorArr = []
humArr = []
mushroomArr = []
dinoArr = []

const Grass = require('./Grass')
const GrassEater = require('./GrassEater')
const Predator = require('./Predator')
const Hum = require('./Hum')
const Mushroom = require('./Mushroom')
const Dino = require('./Dino')

function creatObject(){
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
            else if(matrix[y][x] == 6){
                let dino = new Dino(x,y)
                dinoArr.push(dino)
            }
    
    
        }
    }
    io.sockets.emit('send matrix', matrix)
    
}
creatObject()

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
    for(let i in dinoArr){
        
        dinoArr[i].eat()
    
}
io.emit("send matrix",matrix)
}
setInterval(gameMove,500)

var weather;

function Winter() {
    weather = 'Winter';
    io.emit('Winter', weather);
}

function Summer() {
    weather = 'Summer';
    io.emit('Summer', weather);
}

function Spring() {
    weather = 'Spring';
    io.emit('Spring', weather);
}
function Autumn() {
    weather = 'Autumn';
    io.emit('Autumn', weather);
}

function killall() {
    grassArr = [];
    grassEaterArr = [];
    predatorArr = [];
    humArr = [];
    mushroomArr = [];
    dinoArr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.emit("send matrix", matrix);
}

io.on('connection', function (socket) {
    creatObject()
    socket.on('Spring', Spring);
    socket.on('Summer', Summer);
    socket.on('Autumn', Autumn);
    socket.on('Winter', Winter);
    socket.on("killAll",killall);
    
})
var statistics = {};
setInterval(function () {
    statistics.Grass = grassArr.length;
    statistics.GrassEater = grassEaterArr.length;
    statistics.Predator = predatorArr.length;
    statistics.Hum = humArr.length;
    statistics.Mushroom = mushroomArr.length;
    statistics.Dino = dinoArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
    })
}, 1000);


