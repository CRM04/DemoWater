var total = 2;
var actual = 1;
$(document).ready(function(){
        console.log("Listo !");        
        //Funcion para eliminar la variable del localStorage.
        //localStorage.removeItem("fechas");  
          $("#centro").width($("#centro").css("width"));
          $("#centro").height($("#centro").css("height"));
            console.log("proporciones creadas");

            $("#der").click(function(){
                console.log("derecha click");
                transicion();
            });

            $("#izq").click(function(){
                console.log("izq click");
                transicion();
            });

            $("#up").click(function(){
                var cantidad = parseInt(document.getElementById("cantidad").innerHTML);
                console.log("cantidad: " + cantidad);
                if(cantidad < 11){
                    cantidad++;
                }
                document.getElementById("cantidad").innerHTML = cantidad;
            });

            $("#down").click(function(){
                var cantidad = parseInt(document.getElementById("cantidad").innerHTML);
                console.log("cantidad: " + cantidad);
                if(cantidad > 1){
                    cantidad --;
                }
                document.getElementById("cantidad").innerHTML = cantidad;                
            });

            $("#consultar").click(function(){
                //var test = JSON.parse(localStorage['fechas']);
                //var testAgua = JSON.parse(localStorage['TotalAgua']);
                //alert("Fechas: " + test + "\n" + "AguaTotal: " + testAgua);
                window.location.href ="grafico.html";
            });
            
            $("#reset").click(function(){
                localStorage.removeItem("fechas");
                localStorage.removeItem("TotalAgua");
                alert("Reseteado");
            });
            //Funcion del boton Agregar.
            $("#agregar").click(function(){
                if(actual == 1)
                {
                    var tempCantidad = document.getElementById("cantidad").innerHTML;
                    var temp = (250 * tempCantidad) / 1000;
                }
                if(actual == 2)
                {
                    var tempCantidad = document.getElementById("cantidad").innerHTML;
                    var temp = (250 * tempCantidad) / 1000;
                }
                swal({
                    title: "¿Estás seguro?",
                    text: "Se añadirán " +temp+ " L de agua a su registro del día hoy.",
                    type: "info",
                    showCancelButton: true,
                    //confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Si, agregalo",
                    cancelButtonText: "No, cancelar !",
                    closeOnConfirm: false,
                    closeOnCancel: false
                    },
                    function(isConfirm){
                        if (isConfirm) {
                            var fecha = new Date();
                            Meses = new Array ("Enero", "Febrero", "Marzo", "Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
                            var hoy = fecha.getDate() + " de "+ Meses[fecha.getMonth()];
                            //console.log("fecha:"+ hoy);
                            //console.log("cantidad "+ c);
                            if(actual == 1){ // Caso para el vaso.
                                var cantidad = document.getElementById("cantidad").innerHTML;
                                var cantidadAgua = (250 * cantidad) / 1000;
                                //console.log("Cantidad de agua " + cantidadAgua);
                                AgregarFecha(hoy, cantidadAgua);
                                swal("Listo !", "Se han añadido " + cantidadAgua +" L a su contenido de agua.", "success");
                            }
                            if(actual == 2){
                                //console.log("Guardando: botella x "+ document.getElementById("cantidad").innerHTML);
                                var cantidad = document.getElementById("cantidad").innerHTML;
                                var cantidadAgua = (600 * cantidad) / 1000;
                                //console.log("Cantidad de agua " + cantidadAgua);
                                AgregarFecha(hoy, cantidadAgua);
                                swal("Listo !", "Se han añadido " + cantidadAgua +" L a su contenido de agua.", "success");
                            }                            
                        } else {
                            swal("Cancelado", "Se ha cancelado", "error");
                        }
                });               
            });
        }); 

        //Funcion que se encargara de agrear una fecha nueva y recibe como parametro la fecha actual.
        function AgregarFecha(hoy, cantidad){
            //console.log("Guardando: vaso x "+ document.getElementById("cantidad").innerHTML);                    
                    //Se crea una variable donde se intentara guardar el contenido del localStorage si es que existe, 
                    //si no existe se creara en el else para entonces guardar su primer elemento.
                    var localFechas = localStorage.getItem("fechas");
                    if( localFechas != null && localFechas != "" && localFechas != false && localFechas != undefined){
                        //Si existe 
                        //
                        var fechaNueva = new Array();
                        fechaNueva = JSON.parse(localStorage['fechas']);
                        //Se busca que no exista la fecha actual.
                        var tamaño = fechaNueva.length;
                        //Se comprueba que el ultimo dia alla cambiado ya que debe ser una fecha diferente
                        if(fechaNueva[tamaño-1] != hoy){
                            fechaNueva.push(hoy);
                            localStorage.setItem("fechas", JSON.stringify(fechaNueva));                            
                            tamaño ++;
                        }                        
                        AgregarAgua(cantidad, tamaño-1);
                        //console.log("Tipo:"+typeof(fechaNueva));
                        var test = JSON.parse(localStorage['fechas']);
                        console.log("test: " + test);
                    }else{
                        //No existe la variable y se agrega por prmera vez 
                        var SaveFecha  = new Array();
                        SaveFecha[0] = hoy;                        
                        //localStorage.setItem("fechas", JSON.stringify(SaveFecha));
                        localStorage['fechas']=JSON.stringify(SaveFecha);
                        AgregarAgua(cantidad, 1);
                        console.log("se creo la variable localStorage");
                        //alert("Primera fecha: " + localStorage.getItem("fechas"));
                    }
        }
        
        //Funcion que se encargara de agregar el agua dentro de un arreglo.                
        function AgregarAgua(cantidadAgua, indice){
            var localAgua = localStorage.getItem("TotalAgua");
                    if( localAgua != null && localAgua != "" && localAgua != false && localAgua != undefined){
                        //Si existe 
                        //
                        var Agua = new Array();
                        Agua = JSON.parse(localStorage['TotalAgua']);
                        //Se busca que no exista la fecha actual.
                        var tamaño = Agua.length;
                        //Se comprueba que el ultimo dia alla cambiado ya que debe ser una fecha diferente                        
                        if(Agua[indice] == undefined){ //Significa que es la primera vez que toma el agua en un nuevo dia.
                            Agua[indice] = cantidadAgua;
                            localStorage.setItem("TotalAgua", JSON.stringify(Agua));
                        }else{
                            var aguaTemp = parseInt(Agua[indice]);//Se obtiene el agua que ya se tenia almacenaada para luego sumarle la nueva y agregarla
                            Agua[indice] = cantidadAgua + aguaTemp;
                            localStorage.setItem("TotalAgua", JSON.stringify(Agua));
                        }                                                
                        //console.log("Tipo:"+typeof(fechaNueva));
                        var testAgua = JSON.parse(localStorage['TotalAgua']);
                        console.log("testAgua: " + testAgua);
                    }else{
                        //No existe la variable y se agrega por prmera vez 
                        var SaveAgua  = new Array();
                        SaveAgua[0] = cantidadAgua;
                        //localStorage.setItem("fechas", JSON.stringify(SaveFecha));
                        localStorage['TotalAgua']=JSON.stringify(SaveAgua);
                        console.log("se creo la variable localStorage de Agua");
                    }
        }

        function transicion(){                        
            console.log("actual "+actual);
            if(actual > total){
                console.log("Set");
                actual = 1;
            }else{
                $("#"+actual.toString()).fadeOut(200);
                actual++;
                if(actual > total){
                   console.log("Set");
                    actual = 1;
                }   
                console.log("actual- "+actual);
                $("#"+actual.toString()).delay(200).fadeIn(200);
            }                                    
        }