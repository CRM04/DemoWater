 $(document).ready(function(){
     console.log("listo");
     $("#myChart").hide();
    /*localStorage.removeItem("Peso");
    localStorage.removeItem("TotalAgua");
    localStorage.removeItem("fechas");*/
    var PesoGuardado = localStorage.getItem("Peso"); // Se alamcena el peso en el localStorage
    var MetaDiaria = 0; // Almacena el agua que se debe tomar deacuerdo al peso
    var AguaCons = 0; // Agua consumida durante el dia.

    if( PesoGuardado != null && PesoGuardado != "" && PesoGuardado != false && PesoGuardado != undefined)
    {
        console.log("Existe local");
        var PesoGuardado = localStorage.getItem("Peso");
        CalcularAgua(PesoGuardado);        
    }else
    {
        console.log("NO existe local");
        getPeso();        
        //location.reload();
    }
    
    //Funcion realiza por el botnon guardar.
    $("#BtnPeso").click(function(){
        getPeso();
    });

    function getPeso(){        
        swal({
            title: "Escribe tu peso",
            text: "Escribe tu peso para poder calcular tu meta diaria",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
             inputPlaceholder: "Escibe tu peso"
             },
            function(inputValue){
                if (inputValue === false) {
                    return false;                    
                }                            
                if (inputValue === "") {
                    swal.showInputError("Error escribe tu peso porfavor!");
                    return false;
                }
                localStorage.setItem("Peso", inputValue);                
                PesoGuardado = inputValue;
                swal("Peso Guardado!", "Tu peso actual es: " + inputValue, "success");
                CalcularAgua(PesoGuardado);
            });            
    }    


    function CalcularAgua(peso){
        var libra = 2.2; // un kilo tiene es equivalente a eso en libras
        var onza = 0.0295735; // Una Onza es equivalene a eso en Libtros
        MetaDiaria = ((peso * libra) / 2) * onza;
        localStorage.setItem("MetaD", MetaDiaria);
        console.log("Meta Diaria: " + MetaDiaria);        
        DatoStorage();
    }

    
    //Funcion encargada de ir al localStorage y corroborar la cantidad de agua que ha tomado el usuario
    //Si es que ha tomado.
    function DatoStorage(){        
        var fechaStorage = new Array();
        fechaStorage = JSON.parse(localStorage['fechas']);        
        var tamaño = fechaStorage.length;

        var fecha = new Date();
        Meses = new Array ("Enero", "Febrero", "Marzo", "Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
        var hoy = fecha.getDate() + " de "+ Meses[fecha.getMonth()];
        console.log("fecha hoy: " + hoy);
        console.log("fecha Storage: " + fechaStorage[tamaño - 1]);
        if(hoy == fechaStorage[tamaño - 1]){
            var aguaStorage = new Array();
            aguaStorage = JSON.parse(localStorage['TotalAgua']);
            AguaCons = aguaStorage[aguaStorage.length - 1];
            console.log("Agua consumida hoy: " + AguaCons);
            DibujarGrafica();
        }else{
            console.log("no ha consumido agua today");
        }        
    }
//Graficos solo desplegaran cuando la varibale peso tengo contenido

    function DibujarGrafica(){
        if((AguaCons > 0) && (MetaDiaria > 0)){
            $("#error").hide();
            $("#myChart").show();
            console.log("Pasa por aqui");
            var ctx = document.getElementById("myChart");
            console.log("AGUA CONSUMIDA_: " + AguaCons);
            console.log("META DIARIA_: " + MetaDiaria);
            console.log("DIFERENCIA_: "+ (MetaDiaria - AguaCons));
            if(MetaDiaria <= AguaCons){
                var data = {
                    labels: [                        
                        "Agua Consumida"          
                    ],
                    datasets: [
                        {
                            //data: [(MetaDiaria - AguaCons), AguaCons],
                            data:[100],
                            backgroundColor: [
                                "#3ebfcc"                                
                            ],
                            hoverBackgroundColor: [
                                "#3ebfcc"
                                 //naranja
                            ]                
                        }]
                };
            }else{
                var data = {
                    labels: [
                        "Agua Restante",
                        "Agua Consumida"                
                    ],
                    datasets: [
                        {
                            data: [(MetaDiaria - AguaCons), AguaCons],
                            //data:[100],
                            backgroundColor: [
                                "#ef7f12",
                                "#3ebfcc"                                
                            ],
                            hoverBackgroundColor: [
                                "#ef7f12",
                                "#3ebfcc"                                
                            ]                
                        }]
                };
            }            

            var myDoughnutChart = new Chart(ctx, {
                type: 'doughnut',
                data: data        
            });
        }else{
            console.log("AGUA CONSUMIDA: " + AguaCons);
            console.log("META DIARIA: " + MetaDiaria);
        }        
    }


// Efecto de agua dentro del body.--------------------------------------------------------
    $('body').ripples({
        resolution: 512,
        dropRadius: 20, //px
        perturbance: 0.04,
        interactive: false
    });

    setInterval(function() {
        var $el = $('body');
        var x = Math.random() * $el.outerWidth();
        var y = Math.random() * $el.outerHeight();
        var dropRadius = 20;
        var strength = 0.04 + Math.random() * 0.04;

        $el.ripples('drop', x, y, dropRadius, strength);
    }, 400);    

});