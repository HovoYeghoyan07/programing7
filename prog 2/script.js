
// function generator(matLen, gr, grEat,pred,hum) {
//     let matrix = [];
//     for (let i = 0; i < matLen; i++) {
//         matrix[i] = [];
//         for (let j = 0; j < matLen; j++) {
//             matrix[i][j] = 0;
//         }
//     }
//     for (let i = 0; i < gr; i++) {
//         let x = Math.floor(Math.random() * matLen);
//         let y = Math.floor(Math.random() * matLen);
//         if (matrix[x][y] == 0) {
//             matrix[x][y] = 1;
//         }
//     }
//     for (let i = 0; i < grEat; i++) {
//         let x = Math.floor(Math.random() * matLen);
//         let y = Math.floor(Math.random() * matLen);
//         if (matrix[x][y] == 0) {
//             matrix[x][y] = 2;
//         }
//     }
//     for (let i = 0; i < pred; i++) {
//         let x = Math.floor(Math.random() * matLen);
//         let y = Math.floor(Math.random() * matLen);
//         if (matrix[x][y] == 0) {
//             matrix[x][y] = 3;
//         }
//     }
//     for (let i = 0; i < pred; i++) {
//         let x = Math.floor(Math.random() * matLen);
//         let y = Math.floor(Math.random() * matLen);
//         if (matrix[x][y] == 0) {
//             matrix[x][y] = 4;
//         }
//     }
//     return matrix;
// }

let side = 20;
const socket = io()

// let matrix = generator(15, 25, 5,10,4);
// let grassArr = []
// let grassEaterArr = []
// let predatorArr = []
// let humArr = []
// let mushroomArr = []
function setup() {
    createCanvas(30* side, 30 * side);
    background('#acacac');
}
//     for (var y = 0; y < matrix.length; y++) {
//         for (var x = 0; x < matrix[y].length; x++) {
//             if (matrix[y][x] == 1) {
//                 let gr = new Grass(x, y)
//                 grassArr.push(gr)
//             } else if (matrix[y][x] == 2) {
//                 let gre = new GrassEater(x, y)
//                 grassEaterArr.push(gre)

//             } else if (matrix[y][x] == 3) {
//                 let pre = new Predator(x, y)
//                 predatorArr.push(pre)
//             }
//             // else if(matrix[y][x] == 4){
//             //     let hum = new Hum(x,y)
//             //     predatorArr.push(hum)
//             // }


//         }
//     }





socket.on("Winter", function (data) {
    weath = data;
})
socket.on("Summer", function (data) {
    weath = data;
})
socket.on("Spring", function (data) {
    weath = data;
})
socket.on("Autumn", function (data) {
    weath = data;
})

var  weath = "autumn" 
function changeColors(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                if (weather == "spring") {
                    fill("green");
                }
                else if (weath == "summer") {
                    fill("yellow");
                }
                else if (weath == "autumn") {
                    fill("orange");
                }
                if (weath == "winter") {
                    fill("white");
                }
            }

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow")
            }
            else if (matrix[y][x] == 3) {
                fill("red")


            }
            else if(matrix[y][x] == 4){
                fill("blue")
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if(matrix[y][x] == 5){
                fill("brown")
            }
            else if(matrix[y][x] == 6){
                fill("black")
            }
            
            
            
            rect(x * side, y * side, side, side);
        }
    }
}
socket.on('send matrix', changeColors);


    function Winter() {
        socket.emit("winter");
    }
    function Summer() {
        socket.emit("summer");
    }
    function Spring() {
        socket.emit("spring");
    }
    function Autumn() {
        socket.emit("autumn");
    }
    function Kill(){
        socket.emit("killAll");
    }


    // for (let i in grassArr) {
    //     grassArr[i].mul()
    // }
    // for (let i in grassEaterArr) {
    //     grassEaterArr[i].mul()
    //     grassEaterArr[i].eat()

    // }
    // for (let i in predatorArr) {
    //     predatorArr[i].mul()
    //     predatorArr[i].eat()
    // }
    // for(let i in humArr){
    //     humArr[i].mul()
      

    // }





