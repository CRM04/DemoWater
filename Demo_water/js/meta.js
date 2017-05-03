 $(document).ready(function(){
     console.log("listo");
    
    $("#BtnPeso").click(function(){        
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
            if (inputValue === false) 
                return false;
            if (inputValue === "") {
                swal.showInputError("You need to write something!");
                return false
            }                
            swal("Nice!", "You wrote: " + inputValue, "success");
        });
    });
//Graficos 

    var ctx = document.getElementById("myChart");

    var data = {
        labels: [
            "Red",
            "Blue",
            "Yellow"
        ],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ]
            }]
    };

    var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,        
    });





// Efecto de agua dentro del body.
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