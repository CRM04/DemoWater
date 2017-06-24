$(document).ready(function(){
   CargarDirs();
});

function CargarDirs(){
    var Direcciones = localStorage.getItem("Dir");
    var Direc = new Array();
    var flag;
    if( Direcciones != null && Direcciones != "" && Direcciones != false && Direcciones != undefined){        
        Direc = JSON.parse(localStorage['Dir']);
        console.log("Tamaño direcciones: " +Direc.length);
        if(Direc.length == 1){
            document.getElementById("dir1").innerHTML += Direc[0].Apodo;
            document.getElementById("infoDir1").innerHTML +="<strong> Calle: </strong> " + Direc[0].calle + "<br>"+
            "<strong> Colonia: </strong>"+Direc[0].colonia+"<br>" + "<strong> CP: </strong>" + Direc[0].cp + "<br>"+" <strong> Entre Calles: </strong>"+Direc[0].entreCalles;
            $("#card2").hide();
        }
        if(Direc.length == 2){
            document.getElementById("dir1").innerHTML += Direc[0].Apodo;
            document.getElementById("infoDir1").innerHTML +="<strong> Calle: </strong> " + Direc[0].calle + "<br>"+
            "<strong> Colonia: </strong>"+Direc[0].colonia+"<br>" + "<strong> CP: </strong>" + Direc[0].cp + "<br>"+" <strong> Entre Calles: </strong>"+Direc[0].entreCalles;

            document.getElementById("dir2").innerHTML += Direc[1].Apodo; 
            document.getElementById("infoDir2").innerHTML +="<strong> Calle: </strong> " + Direc[1].calle + "<br>"+
            "<strong> Colonia: </strong>"+Direc[1].colonia+"<br>" + "<strong> CP: </strong>" + Direc[1].cp + "<br>"+" <strong> Entre Calles: </strong>"+Direc[1].entreCalles;
        }
                
        flag = true;        
    }else{
        console.log("Ocultando");
            $("#card1").hide();            
            $("#error").show();
    }
    return flag;
}