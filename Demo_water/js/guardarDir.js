
$(document).ready(function(){
    //localStorage.removeItem("Dir");
    var NuevaDireccion = new Direccion();    

    $("#add").click(function(){
        NuevaDireccion.Apodo = document.getElementById("txtApodo").value;
        NuevaDireccion.calle = document.getElementById("txtCalle").value;
        NuevaDireccion.colonia= document.getElementById("txtColonia").value;
        NuevaDireccion.cp = document.getElementById("txtCP").value;
        NuevaDireccion.entreCalles = document.getElementById("txtEntre").value;
        //console.log(NuevaDireccion.Apodo + NuevaDireccion.calle);        
        
        if( !SaveDir(NuevaDireccion)){
            console.log("2 direcciones listas");
            OverRideDir(NuevaDireccion);            
        }else{
            swal("Listo!", "Su dirección se guardo con exito.", "success");
        }
    });    
});


//Sobreescribe la la nueva direccion 
function OverRideDir(NuevaDireccion){
    var Direc = new Array();
    Direc = JSON.parse(localStorage['Dir']);
    console.log("tamaño - over :" + Direc.length);
    var direc1 = Direc[0].Apodo;
    var direc2 = Direc[1].Apodo;

    var inputOptions = new Promise(function (resolve) {
        setTimeout(function () {
            resolve({
            0 : '<span style="color: black">' +direc1 + '</span>',
            1 : '<span style="color: black">' +direc2 + '</span>'
            })
        }, 2000)
        })

        swal({
            title: 'Solo se permiten guardar 2 direcciones',
            text: 'Seleciona una para reemplazarla o cancela para continuar sin guardar la dirección.',
            input: 'radio',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: 'No, cancelarl!',
            inputOptions: inputOptions,
            inputValidator: function (result) {
                return new Promise(function (resolve, reject) {
                if (result) {
                    console.log("Sobreescribiendo dirección.");
                    resolve()
                    Direc[result] = NuevaDireccion;
                    localStorage.setItem("Dir", JSON.stringify(Direc));
                } else {
                    reject('Escoge una dirección.!')
                }
                })
            }
            }).then(function (result) {
                swal({
                    type: 'success',
                    html: 'Direccion actualizada.'
                })
            },function (dismiss) {
                    // dismiss can be 'cancel', 'overlay',
                    // 'close', and 'timer'
                if (dismiss === 'cancel') {
                    console.log("Direccion cancelada");
                    swal(
                        'Cancelado',
                        'No se ha guardado la direccion',
                        'error'
                    )                            
                }
            })
}

//Comprueba si existen las direcciones guardadas en el LocalStorage para luego guardarlas.
function SaveDir(NuevaDireccion){
    var Direcciones = localStorage.getItem("Dir");
    var Direc = new Array();
    var flag;
    if( Direcciones != null && Direcciones != "" && Direcciones != false && Direcciones != undefined){        
        Direc = JSON.parse(localStorage['Dir']);
        console.log("Tamaño direcciones: " +Direc.length);
        if(Direc.length < 2){ // Si hay menos de 3 direcciones guardadas se procede a gardar
            console.log("MEnos de 2 direcciones")
            swal({
                title: "Estas seguro de agregar esta dirección?",
                 html: "Calle: " +NuevaDireccion.calle + '<br>'
                       +"Colonia: "+ NuevaDireccion.colonia + '<br>'
                       + "Código Postal: "+ NuevaDireccion.cp + '<br>'
                       + "Entre : "+NuevaDireccion.entreCalles,
                type: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, agregala!',
                cancelButtonText: 'No, cancelarl!',
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                buttonsStyling: false
            }).then(function () {
                    console.log("Direccion agregada");
                    Direc.push(NuevaDireccion);
                    localStorage.setItem("Dir", JSON.stringify(Direc));
                    swal(
                        'Listo!',
                        'Dirección agregada.',
                        'success'
                    )
                    flag = true;
                }, function (dismiss) {
                // dismiss can be 'cancel', 'overlay',
                // 'close', and 'timer'
                    if (dismiss === 'cancel') {
                        console.log("Direccion cancelada");
                        swal(
                        'Cancelado',
                        'No se ha guardado la direccion',
                        'error'
                        )
                        flag = true;
                    }
                })                        
        }else{// Ya existen 2 Direcciones por lo que se debera sobreescribir una.
            console.log("Existen 2 direeciones");
            flag = false;
        }
    }else{
        //No existe y se agrega por primera vez la direccion.
        console.log("Primera vez");
        swal({
                title: "Estas seguro de agregar esta dirección?",
                 html: "Calle: " +NuevaDireccion.calle + '<br>'
                       +"Colonia: "+ NuevaDireccion.colonia + '<br>'
                       + "Código Postal: "+ NuevaDireccion.cp + '<br>'
                       + "Entre : "+NuevaDireccion.entreCalles,
                type: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, agregala!',
                cancelButtonText: 'No, cancelarl!',
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                buttonsStyling: false
        }).then(function () {
                console.log("Direccion agregada");
                Direc[0] = NuevaDireccion;
                localStorage['Dir']=JSON.stringify(Direc);
                flag = true;
                swal(
                    'Listo!',
                    'Dirección agregada.',
                    'success'
                )
                flag = true;
        }, function (dismiss) {
                // dismiss can be 'cancel', 'overlay',
                // 'close', and 'timer'
            if (dismiss === 'cancel') {
                console.log("Direccion cancelada");
                swal(
                    'Cancelado',
                    'No se ha guardado la direccion',
                    'error'
                )
                flag = true;
            }
        })
    }
    return flag;
}


function Direccion(Apodo,calle, colonia, cp, entreCalles){
    this.Apodo = Apodo;
    this.calle = calle;
    this.colonia = colonia;
    this.cp = cp;
    this.entreCalles = entreCalles;
}
