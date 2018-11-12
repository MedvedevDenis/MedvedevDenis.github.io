class Vertex {

    constructor(id, x, y, r) {
        this.id = id;
        this.edges = [];
        this.active = 0
        this.dfsi = -1
        this.return_index = -1;
        this.IsCutVertex = false;
        this.x = x;
        this.y = y;
        this.r = r;
    }



}





var newWidth = 2 *window.innerWidth;
var newHeight =2 * (window.innerHeight - 100) ;

 
var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');
alert(window.innerWidth)
alert(window.innerHeight)
canvas.width =  newWidth;
canvas.height = newHeight;
var fs=(window.innerWidth+window.innerHeight)/(68);
var vertices = []
var blc = document.getElementById('blc')
blc.style.fontSize=fs.toString()+'px';
var R = (newWidth + newHeight) / 40;
var btn_clear = document.getElementById("btn_clear");
var btn_dv = document.getElementById("btn_dv");
var btn_dfs = document.getElementById("btn_dfs");
var I = 0;
var J = 0;
var mouse = {
    x: 0,
    y: 0
};
var draw = false;
var V = 0;




clear = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);


}
render = function() {



    clear();
    for (i = 0; i < vertices.length; i++) {
        for (j = 0; j < vertices[i].edges.length; j++) {
            for (k = 0; k < vertices.length; k++) {
                if (vertices[i].edges[j] == vertices[k].id) {


                    context.beginPath();
                    context.moveTo(vertices[i].x, vertices[i].y);
                    context.lineTo(vertices[k].x, vertices[k].y);
                    context.strokeStyle = '#2c3e50';
                    context.stroke();
                    context.closePath();
                }

            }
        }
    }


    for (i = 0; i < vertices.length; i++) {
        context.beginPath();
        context.arc(vertices[i].x, vertices[i].y, vertices[i].r, 0, 2 * Math.PI, false);
        if (vertices[i].active == 0)
            context.fillStyle = '#f1f2f6';
        if (vertices[i].active == 1)
            context.fillStyle = '#2ed573';
        if (vertices[i].IsCutVertex == true)
            context.fillStyle = '#ff4757';
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = '#2c3e50';
        context.stroke();

        context.closePath();
        context.font = "20px Arial";
        context.fillStyle = 'black';
        context.fillText((vertices[i].id+1).toString(), vertices[i].x, vertices[i].y);
        if (vertices[i].dfsi >= 0)
            context.fillText((vertices[i].dfsi+1).toString(), vertices[i].x - vertices[i].r, vertices[i].y - vertices[i].r * 1.5);
        if (vertices[i].return_index >= 0) {
            context.beginPath();
            context.arc(vertices[i].x - vertices[i].r * 1.9, vertices[i].y - vertices[i].r * 1.6, 20, 0, 2 * Math.PI, false);
            context.lineWidth = 3;
            context.strokeStyle = '#ff4757';
            context.stroke();

            context.fillText((vertices[i].return_index+1).toString(), vertices[i].x - vertices[i].r * 2, vertices[i].y - vertices[i].r * 1.5);
        }

    }



}
 

canvas.addEventListener("mousedown", function(e) {
    mouse.x = 2 * (e.pageX - this.offsetLeft);
    mouse.y = 2 * (e.pageY - this.offsetTop);
    V = 0;
    var A = 0;
    for (var i = 0; i < vertices.length; i++) {
        if (Math.sqrt((vertices[i].x - mouse.x) * (vertices[i].x - mouse.x) + (vertices[i].y - mouse.y) * (vertices[i].y - mouse.y)) <= vertices[i].r) {
            I = i;
            V = 1;
        }
        if (Math.sqrt((vertices[i].x - mouse.x) * (vertices[i].x - mouse.x) + (vertices[i].y - mouse.y) * (vertices[i].y - mouse.y)) <= 2 * vertices[i].r) {

            A = 2;
        }
    }


    if (V == 0 && A == 0) {

        vertices.push(new Vertex(vertices.length, mouse.x, mouse.y, R));
        for (var i = 0; i < vertices.length; i++) {
            vertices[i].dfsi = -1;
        }

    }
    context.beginPath();

    context.moveTo(mouse.x, mouse.y);
    if (V == 1) draw = true;
    
});
canvas.addEventListener("mousemove", function(e) {

    if (draw == true && V == 1) {

        mouse.x = 2 * (e.pageX - this.offsetLeft);
        mouse.y = 2 * (e.pageY - this.offsetTop);

        context.lineTo(mouse.x, mouse.y);
        context.strokeStyle = '#2c3e50';
        context.stroke();
    }
});

canvas.addEventListener("mouseup", function(e) {

    mouse.x = 2 * (e.pageX - this.offsetLeft);
    mouse.y = 2 * (e.pageY - this.offsetTop);
    context.closePath();


    draw = false;

    var flag = 0;
    for (i = 0; i < vertices.length; i++) {
        if (Math.sqrt((vertices[i].x - mouse.x) * (vertices[i].x - mouse.x) + (vertices[i].y - mouse.y) * (vertices[i].y - mouse.y)) <= vertices[i].r && i != I) {
            J = i;
            flag = 1;
            for (j = 0; j < vertices[I].edges.length; j++) {

                if (i == vertices[I].edges[j]) {
                    flag = 0;
                }

            }
        }

        if (Math.sqrt((vertices[i].x - mouse.x) * (vertices[i].x - mouse.x) + (vertices[i].y - mouse.y) * (vertices[i].y - mouse.y)) <= vertices[i].r && i == I) {

            for (k = 0; k < vertices.length; k++)
                vertices[k].active = 0;

            vertices[i].active = 1;
        }


    }
    if (flag == 0) {
        vertices[I].x = mouse.x;
        vertices[I].y = mouse.y;
    }
    if (flag == 1 && V == 1) {
        vertices[I].edges.push(vertices[J].id);
        vertices[J].edges.push(vertices[I].id);
    }
    V = 0;

    render();

});

btn_clear.addEventListener("click", function(e) {
    vertices = [];
    clear();
    render();
});
btn_dv.addEventListener("click", function(e) {
    var Active = 0;
    var flag = 0;
    var JJ;
    for (var i = 0; i < vertices.length; i++) {
        if (vertices[i].active == 1) {
            Active = i;
            break;
        }
    }
    for (var i = 0; i < vertices.length; i++) {
        for (var j = 0; j < vertices[i].edges.length; j++) {
            if (vertices[Active].id == vertices[i].edges[j]) {
                JJ = vertices[i].edges[j];
                vertices[i].edges.splice(j, 1);
                flag = 1;

            }
        }
    }
    for (var i = 0; i < vertices.length; i++) {

        for (var k = 0; k < vertices[i].edges.length; k++) {
            if (JJ < vertices[i].edges[k])
                vertices[i].edges[k] = vertices[i].edges[k] - 1;
        }

    }
    vertices.splice(Active, 1)
    for (var i = 0; i < vertices.length; i++)
        vertices[i].id = i;
    render();
});

function GetMatrix(rows, columns) {
    var arr = new Array();
    for (var i = 0; i < rows; i++) {
        arr[i] = new Array();
        for (var j = 0; j < columns; j++) {
            arr[i][j] = 0;
            for (k = 0; k < vertices[i].edges.length; k++)
                if (vertices[i].edges[k] == j) {
                    arr[i][j] = 1;

                }

        }
    }
    return arr;
}
var used = [];

var K = 0;
var prev = 0;
var MD = 1000;
var Active = 0;

function dfs(M, v) {


    used[v] = 1;
    vertices[v].dfsi = K;
    var pv = prev;


    for (var i = 0; i < vertices.length; i++) {


        if (M[v][i] == 1 && used[i] != 1) {
            K = K + 1;
            flag = 1;
            prev = v;

            dfs(M, i);
            if (v == Active)
                MD = 1000;

        }

    }

    var min = [];
    for (var j = 0; j < vertices[v].edges.length; j++) {
        for (var k = 0; k < vertices.length; k++) {
            if (vertices[v].edges[j] == vertices[k].id && vertices[v].edges[j] != vertices[pv].id) {
                min.push(vertices[k].dfsi)
            }
        }
    }

    min.push(vertices[v].dfsi)
    min.push(MD);

    vertices[v].return_index = Math.min.apply(null, min);

    render();
    MD = vertices[v].return_index;


}
btn_dfs.addEventListener("click", function(e) {

    K = 0;
    used = [];
    for (i = 0; i < vertices.length; i++) {
        if (vertices[i].active == 1)
            Active = i;
        used.push(0);
    }

    var M = GetMatrix(vertices.length, vertices.length);


    dfs(M, Active);

    render();
});