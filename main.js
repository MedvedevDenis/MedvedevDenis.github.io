 
class Vertex {
    
    constructor(id,x,y,r) 
    {
      this.id = id;
      this.x=x;
      this.y=y;
      this.r=r;
      this.edges=[];
      this.active=0
      this.dfsi=-1
    }
  
   
  
  }
  
   
var vertices=[]
var canvas = document.getElementById("canvas"), 
context = canvas.getContext("2d"),
w = canvas.width,
h=canvas.height;
var btn_clear = document.getElementById("btn_clear");
var I=0;
var J=0;
var mouse = { x:0, y:0};
var draw = false;
var V=0;


clear=function()
{
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);

}
render = function()
{
  
     
   
    clear();
    for(i=0;i<vertices.length;i++){
        for(j=0;j<vertices[i].edges.length;j++){
            for(k=0;k<vertices.length;k++){
                if(vertices[i].edges[j]==vertices[k].id){
                   
                   
                    context.beginPath();  
                    context.moveTo(vertices[i].x,vertices[i].y);   
                    context.lineTo(vertices[k].x, vertices[k].y);
                    context.stroke();                          
                    context.closePath();
                                                         }
              
                            }
                                            }
                                        }   
    

    for(i=0;i<vertices.length;i++){
        context.beginPath();
        context.arc(vertices[i].x, vertices[i].y, vertices[i].r, 0, 2 * Math.PI, false);
        if(vertices[i].active==0)
        context.fillStyle = 'green';
        if(vertices[i].active==1)
        context.fillStyle = 'red';
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = '#003300';
        context.stroke();
        
        context.closePath();
        context.font = "30px Arial";
        context.fillStyle = 'black'; 
        context.fillText(vertices[i].id.toString(),vertices[i].x,vertices[i].y); 
        if(vertices[i].dfsi>=0)
        context.fillText(vertices[i].dfsi.toString(),vertices[i].x-vertices[i].r,vertices[i].y-vertices[i].r*1.5); 
        
                                }
                                
                                        

                    }
canvas.addEventListener("mousedown", function(e)
{
    V=0;
mouse.x = e.pageX - this.offsetLeft;
mouse.y = e.pageY - this.offsetTop;
A=0;
for(i=0;i<vertices.length;i++) 
{ 
    if(Math.sqrt((vertices[i].x-mouse.x)*(vertices[i].x-mouse.x)+(vertices[i].y-mouse.y)*(vertices[i].y-mouse.y))<=vertices[i].r){
        I=i;
        V=1;}
        if(Math.sqrt((vertices[i].x-mouse.x)*(vertices[i].x-mouse.x)+(vertices[i].y-mouse.y)*(vertices[i].y-mouse.y))<=2*vertices[i].r){
             
            A=2;}
} 
 

    if(V==0 && A==0){
        
        vertices.push(new Vertex(vertices.length,mouse.x,mouse.y,50));
        for(i=0;i<vertices.length;i++)
        {
            vertices[i].dfsi=-1;
        }
       
    }
    context.beginPath();
 
context.moveTo(mouse.x, mouse.y);
if(V==1)draw = true;
});
canvas.addEventListener("mousemove", function(e){
 
    if(draw==true && V==1){
        
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        context.lineTo(mouse.x, mouse.y);
        context.stroke();
    }
});

canvas.addEventListener("mouseup", function(e){
 
mouse.x = e.pageX - this.offsetLeft;
mouse.y = e.pageY - this.offsetTop;
context.closePath();


draw = false;

var flag=0;
for(i=0;i<vertices.length;i++) 
{ 
    if(Math.sqrt((vertices[i].x-mouse.x)*(vertices[i].x-mouse.x)+(vertices[i].y-mouse.y)*(vertices[i].y-mouse.y))<=vertices[i].r && i != I){
        J=i;
        flag=1;
        for(j=0;j<vertices[I].edges.length;j++)
        {
        
            if(i==vertices[I].edges[j]) {flag=0;}
        
        }
         }

         if(Math.sqrt((vertices[i].x-mouse.x)*(vertices[i].x-mouse.x)+(vertices[i].y-mouse.y)*(vertices[i].y-mouse.y))<=vertices[i].r && i == I){
             
             for(k=0;k<vertices.length;k++)
             vertices[k].active=0;

             vertices[i].active=1;
             }
  
  
}
if(flag==1 && V==1)
{
    vertices[I].edges.push(vertices[J].id);
    vertices[J].edges.push(vertices[I].id);
}
V=0;
 
render();

});

btn_clear.addEventListener("click", function(e){clear();vertices=[];});

function GetMatrix(rows,columns){
    var arr = new Array();
    for(var i=0; i<rows; i++){
      arr[i] = new Array();
      for(var j=0; j<columns; j++){
        arr[i][j] =0;
        for(k=0;k<vertices[i].edges.length;k++)
        if(vertices[i].edges[k]==j)
        {   arr[i][j] =1;
           
        }
        
      }
    }
    return arr;
  }
used=[];
vu=[];
K=0;
Prev=0
function dfs(M,v)
{
   
  
  used[v] = 1;  
  vertices[v].dfsi=K;
  

  Prev=v;
  for (var i = 0; i < vertices.length; i++)
    {   
       
        
    if (M[v][i]==1 && used[i] !=1) 
    {   
        K=K+1;    
        dfs(M,i);     
    }

}

  
} 
btn_dfs.addEventListener("click", function(e){
    Active=0;
    K=0;
    used=[];
    for(i=0;i<vertices.length;i++)
    {
        if(vertices[i].active==1)
            Active=i;
    used.push(0);
    }
    var M=GetMatrix(vertices.length,vertices.length);
     
       
        dfs(M,Active);
       
    render();
}); 
