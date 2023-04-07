
let side = 20;
const socket = io()

function setup() {
    createCanvas(30* side, 30 * side);
    background('#acacac');
}






socket.on('Winter', function (data) {
    weather = data;
})
socket.on('Summer', function (data) {
    weather = data;
})
socket.on('Spring', function (data) {
    weather = data;
})
socket.on('Autumn', function (data) {
    weather = data;
})

var  weather 
function changeCol(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                if (weather == 'Spring') {
                    fill("green");
                }
                else if (weather == 'Summer') {
                    fill("yellow");
                }
                else if (weather == 'Autumn') {
                    fill("orange");
                }
                if (weather == 'Winter') {
                    fill("white");
                }
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
socket.on('send matrix', changeCol);


    function Winter() {
        socket.emit('Winter');
    }
    function Summer() {
        socket.emit('Summer');
    }
    function Spring() {
        socket.emit('Spring');
    }
    function Autumn() {
        socket.emit('Autumn');
    }
    function killall(){
        socket.emit("killAll");
    }







