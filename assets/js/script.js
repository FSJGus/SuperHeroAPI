$(document).ready(function () {
  $("form").submit(function (event) {
    event.preventDefault();
    // Captura ID input
    var heroID = $("#entrada").val();
    // Validación números
    var validatePattern = /[0-9]/gim;
    let validateID = validatePattern.test(heroID);

    if (!validateID) {
      alert("Ingresa un número del 1 al 732.");
    }
    //Consulta a API
    $.ajax({
      type: "GET",
      url: `https://www.superheroapi.com/api.php/4905856019427443/${heroID}`,
      dataType: "json",
      success: function (data) {
        //Envía imágen de API a DOM
        $("#imagenHERO").html(
          `<img src="${data.image.url}" alt="" width=100% height=auto></img>`
        );

        // Envía datos de la API al DOM
        $("#heroeData").html(`
                <h3 class="py-3">${data.name}</h3>
                <p><b> Conexiones: </b>${data.connections["group-affiliation"]}. <br> ${data.connections.relatives}.</p>
                <p><b> Publicado por: </b>${data.biography.publisher} </p>
                <p><b> Primera aparición: </b>${data.biography["first-appearance"]} </p>    
                <p><b> Altura: </b>${data.appearance.height[0]} / ${data.appearance.height[1]} </p>
                <p><b> Peso: </b>${data.appearance.weight[0]} / ${data.appearance.weight[1]} </p>
                <p><b> Alias: </b>${data.biography.aliases} </p>
                `);

        // Variables chart
        let dataStats = [
          { y: data.powerstats.intelligence, label: "Inteligencia" },
          { y: data.powerstats.strength, label: "Fuerza" },
          { y: data.powerstats.speed, label: "Velocidad" },
          { y: data.powerstats.durability, label: "Durabilidad" },
          { y: data.powerstats.power, label: "Poder" },
          { y: data.powerstats.combat, label: "Combate" },
        ];

        // Pinta la Grafica
        var chart = new CanvasJS.Chart("estadisticas", {
          theme: null,
          backgroundColor: "#F1F1F1",
          animationEnabled: true,
          title: {
            text: `Estadísticas del SuperHero ${data.name}`,
            fontWeight: "bold",
            fontSize: 30,
          },
          data: [
            {
              type: "pie",
              startAngle: 25,
              toolTipContent: "<b>{label}</b>: {y}%",
              // showInLegend: "true",
              // legendText: "{label}",
              indexLabelFontSize: 16,
              indexLabel: "{label} - {y}",
              dataPoints: dataStats,
            },
          ],
        });
        chart.render();
      }, //fin success
      error: function (error) {
        console.log("API Error " + error);
      },
    }); //fin ajax
  }); //fin button
});
