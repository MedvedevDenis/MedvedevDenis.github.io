class Poly
{      
    constructor()
    {
        this.variables=[]
    }  
    Push(variable)
    {
       var f=1
       for(var i=0;i<this.variables.length;i++)
       {
            if(this.variables[i].Degree==variable.Degree)
            {   
                this.variables[i].A+=variable.A
                f=0
                break;
            }
        }
        if(f==1||this.variables.length==0)
        {
            this.variables.push(variable)
        }
        
    }
    Add(poly)
    {
 
       for(var i=0;i<this.variables.length;i++)
       {
            for(var j=0;j<poly.variables.length;j++)
            {
                if(this.variables[i].Degree==poly.variables[j].Degree)
                {
                    this.variables[i].Add(poly.variables[j])
                }
            }     
       }
         
        
    }
    Sub(poly)
    {
 
       for(var i=0;i<this.variables.length;i++)
       {
            for(var j=0;j<poly.variables.length;j++)
            {
                if(this.variables[i].Degree==poly.variables[j].Degree)
                {
                    this.variables[i].Sub(poly.variables[j])
                }
            }     
       }
         
        
    }
    LaTeX()
    {
        var TeX=" \\begin{equation*}\r\n"
        for(var i=0;i<this.variables.length;i++)
        {   var sgn=""
            if(i!=0 &&this.variables[i].A>=0)
            {
                sgn="+"
            }
            
            TeX=TeX+sgn+this.variables[i].LaTeX()
        }
        TeX=TeX+"\r\n\\end{equation*}"
        document.getElementById("TeX").innerHTML+= TeX+"\r\n";
    }
    Generate(sym,max_degree,min_degree)
    {
        for(var i=min_degree;i<max_degree;i++)
        {
                  var v=new Variable(sym,randomInteger(0,30),i)
                  this.Push(v);
        }
    }
}

class Variable
{
    constructor(symbol,a,degree)
    {
        this.Symbol = symbol;
        this.Degree = degree
        this.A=a
    }
   Add(v) 
    {
        if(this.Symbol==v.Symbol)
        {
            this.A+=v.A
        }
        else
        {
            alert("Error")
        }
    }
   Sub(v) 
    {
        if(this.Symbol==v.Symbol)
        {
            this.A-=v.A
        }
        else
        {
            alert("Error")
        }
    }
    print()
    {
        alert(this.Symbol)
    }
    eval(value)
    {
        return Math.pow(value,this.Degree)
    }
    LaTeX()
    {
        var TeX=this.A.toString()+this.Symbol+"^{"+this.Degree.toString()+"}"
        return TeX
    }
}
function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
  }
 

var btn_gen = document.getElementById("generate"); 
var P=new Poly();
window.EVENT=0
btn_gen.addEventListener("click", function(e) {

    window.EVENT=1
});
if(window.EVENT==1)
{   P.Generate()
    P.LaTeX()
    window.EVENT=0
}
    
 