document.addEventListener("deviceready",onDeviceReady,false);

    function onDeviceReady(){
        console.log("listo");                
    }
    function getDatos(){
        navigator.geolocation.getCurrentPosition(onSuccess,onError,{maximunAge: 300000,timeout:10000, enableHighAccuracy:true});
    }
    
    function onSuccess(position){                
        var coords= new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        var opciones = {center: coords, zoom: 15, mapTypeId: google.maps.MapTypeId.ROADMAP};
        var mapa = new google.maps.Map(document.getElementById("map"),opciones);
        var marcador= new google.maps.Marker({
            position:coords,
            map: mapa,
            animation: google.maps.Animation.DROP
        });
        mapa.setZoom(18);
        localStorage.setItem("lat",position.coords.latitude);
        localStorage.setItem("long",position.coords.longitude);
    }

function onError(err){ 
    console.log("codigo de err:"+err.code+"  msj="+err.message);
}
