$(document).ready(function(){
  console.log("dadada");
  var arrayNomes = [];
  var arrayNumeros = [];
  var arrayLeds = [];
  var arrayLeds2 = [];
  var arrayBtn = [];
  var arrayBtn2 = [];
  var arrayOuttaon = [];
  var arrayOuttaon2 = [];
  var arrayVin = [];
  var arrayVin2 = [];
  var arrayVout = [];
  var arrayVout2 = [];
  var arrayVotaon = [];
  var arrayVotaon2 = [];
  var arrayAnalog = [];
  var arrayAnalog2 = [];
  var arrayAnalogV = [];
  var arrayAnalogV2 = [];
  var arrayXths = [];
  var arrayXths2 = [];
  var arrayCpt = [];
  var arrayCpt2 = [];
  var arrayVolet = [];
  var arrayVolet2 = [];
  var arrayPw = [];
  var arrayPw2 = [];
  var arrayEno = [];
  var arrayEno2 = [];
  var arrayX4fp = [];
  var arrayX4fp2 = [];
  var arrayEnoA = [];
  var arrayEnoA2 = [];
  var arrayData = [];
  var arrayHora = [];

  var current = 0;

  var filesName = [];

  var numLedsZero = 0;
  var numLedsUm = 0;

  function getJsonWS(path){

    $.ajax({
      url: "http://localhost:5000/byName/" + path,
      dataType: "json",
      success: function(data){
        var arrayLeds1 = data.data[0].data[0].leds;
        for(var i = 0; i < arrayLeds1.length; i++){
          arrayLeds2.push(arrayLeds1[i].value);
          arrayLeds.push(arrayLeds1[i].chave);
          if(arrayLeds1[i].value == 1){
            numLedsUm++;
          }else{
            numLedsZero++;
          }
        }
        leds();
      }
    });

  }

  $.ajax({
    url: "http://localhost:5000/api/data/filename",
    dataType: "json",
    success: function(data){
      for(i = 0; i < data.result.length; i++){
        filesName.push(data.result[i]);
        getJsonWS(data.result[i]);
      }
    }
  });

$.ajax({
  url: "http://localhost:5000/api/data/year",
  dataType: "json",
  success: function(data){
    var x = document.getElementById("selectorYear");
    var option = document.createElement("option");
    option.text = data.result[0];
    option.value = data.result[0];
    x.add(option);
  }
})

$.ajax({
  url: "http://localhost:5000/api/data/month",
  dataType: "json",
  success: function(data){
    var x = document.getElementById("selectorMonth");
    var option = document.createElement("option");
    option.text = data.result[0];
    option.value = data.result[0];
    x.add(option);
  }
})
$.ajax({
  url: "http://localhost:5000/api/data/day",
  dataType: "json",
  success: function(data){
    var x = document.getElementById("selectorDay");
    var option = document.createElement("option");
    option.text = data.result[0];
    option.value = data.result[0];
    x.add(option);
    var option2 = document.createElement("option");
    option2.text = data.result[1];
    option2.value = data.result[1];
    x.add(option2);
  }
})

$('.selectpickerDay').on('change', function(){
    var selected = $(this).find("option:selected").val();
    if(selected != ""){
      $.ajax({
        url: "http://localhost:5000/api/data/leds/"+ selected,
        dataType: "json",
        success: function(data){
          arrayLeds2 = [];
          arrayLeds = [];

          var arrayLeds1 = data.result[0];
          console.log(arrayLeds1);
          for(var i = 0; i < arrayLeds1.length; i++){
            arrayLeds2.push(arrayLeds1[i].value);
            arrayLeds.push(arrayLeds1[i].chave);
            if(arrayLeds1[i].value == 1){
              numLedsUm++;
            }else{
              numLedsZero++;
            }
          }
          leds();
        }
      });

    }

  });
  $('.selectpickerMonth').on('change', function(){
      var selected = $(this).find("option:selected").val();
      console.log(selected);
    });
    $('.selectpickerYear').on('change', function(){
        var selected = $(this).find("option:selected").val();
        console.log(selected);
      });

  function xml(dataxml){
    if(dataxml.length == 0) return;
    $(dataxml).each(function(){
      //console.log(this.nodeName.toLowerCase());
      //console.log($(this).text());
      var numero = $(this).text();

      if((this.nodeName.toLowerCase() != "response") ){
        if((this.nodeName.toLowerCase() != "#document")){
          arrayNomes.push(this.nodeName.toLowerCase());
          arrayNumeros.push($(this).text());
        }
      }
    });
    xml($(dataxml).children());
  };


  function leds(){
    var ctx = document.getElementById("myChart");
    var ctx = document.getElementById("myChart").getContext("2d");
    var ctx = $("#myChart");
    var ctx = "myChart";

    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ["1", "0"],
          datasets: [{
              label: 'leds',
              data: [numLedsUm, numLedsZero],
              responsive: true,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          },
          responsive: true
      }
    });
  };

  function buttons(){
    var ctx = document.getElementById("myChart2");
    var ctx = document.getElementById("myChart2").getContext("2d");
    var ctx = $("#myChart2");
    var ctx = "myChart2";

    var myChart2 = new Chart(ctx, {
      type: 'line',
      data: {
          labels: arrayBtn2,
          datasets: [{
              label: 'leds',
              data: arrayBtn,
              responsive: true,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          },
          responsive: true
        }
      });
  };

});
