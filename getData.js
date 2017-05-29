$(document).ready(function(){

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

  var data={};

  function clear(){
    arrayLeds = 0;
    arrayLeds2 = 0;
    arrayBtn = 0;
    arrayBtn2 = 0;
    arrayOuttaon = 0;
    arrayOuttaon2 = 0;
    arrayVin = 0;
    arrayVin2 = 0;
    arrayVout = 0;
    arrayVout2 = 0;
    arrayVotaon = 0;
    arrayVotaon2 = 0;
    arrayAnalog = 0;
    arrayAnalog2 = 0;
    arrayAnalogV = 0;
    arrayAnalogV2 = 0;
    arrayXths = 0;
    arrayXths2 = 0;
    arrayCpt = 0;
    arrayCpt2 = 0;
    arrayVolet = 0;
    arrayVolet2 = 0;
    arrayPw = 0;
    arrayPw2 = 0;
    arrayEno = 0;
    arrayEno2 = 0;
    arrayX4fp = 0;
    arrayX4fp2 = 0;
    arrayEnoA = 0;
    arrayEnoA2 = 0;
  };

  $.ajax({
    url: "http://localhost:5000/api/data",
    dataType: "json",
    success: function(data){

      console.log(data);

      for(var i = 0; i < data.data.length ; i++){

      }

      var objLeds = {
        "name" : "ola"
      }

      console.log(objLeds);


    }
  });

  function getJsonWS(path){

    $.ajax({
      url: "http://localhost:5000/byName/" + path,
      dataType: "json",
      success: function(data){
        numLedsUm = 0;
        numLedsZero = 0;
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

  };

function getFilenameWS(){
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
}

function getFilesByYearWS(){
  $.ajax({
    url: "http://localhost:5000/api/data/year",
    dataType: "json",
    success: function(data){
      var selYear = $('#selectorYear');
      for(var x = 0; x < data.result.length; x++){
        var op = document.createElement("option");
        op.text = data.result[x];
        op.value = data.result[x];
        selYear.append(op);
      }
    }
  });
}


function getFilesByMonthWS(){
  $.ajax({
    url: "http://localhost:5000/api/data/month",
    dataType: "json",
    success: function(data){
      var selMonth = $('#selectorMonth');
      for(var x = 0; x < data.result.length; x++){
        var op = document.createElement("option");
        op.text = data.result[x];
        op.value = data.result[x];
        selMonth.append(op);
      }
    }
  });
}

function getFilesByDaysWS(){
  $.ajax({
    url: "http://localhost:5000/api/data/day",
    dataType: "json",
    success: function(data){
      var selDay = $('#selectorDay');

      for(var x = 0; x < data.result.length; x++){
        var op = document.createElement("option");
        op.text = data.result[x];
        op.value = data.result[x];
        selDay.append(op);
      }
    }
  });
}

getFilesByYearWS();
getFilesByMonthWS();
getFilesByDaysWS();

$('.selectpickerDay').on('change', function(){
    var selected = $(this).find("option:selected").val();
    if(selected != ""){
      $.ajax({
        url: "http://localhost:5000/api/data/day/"+ selected,
        dataType: "json",
        success: function(data){
          var array = Object.keys(data.result[0]);
          for(var x = 0; x < array.length ; x++){
            switch(array[x]){
              case "leds":
              for(var i = 0; i < data.result[0].leds.length ; i++){
                if(data.result[0].leds[i].value == 1){
                  arrayLeds++;
                }else{
                  arrayLeds2++;
                }
              }
              break;
              case "btn":
              for(var i = 0; i < data.result[0].btn.length ; i++){
                if(data.result[0].btn[i].value == 1){
                  arrayBtn++;
                }else{
                  arrayBtn2++;
                }
              }
              break;
              case "outtaon":
              for(var i = 0; i < data.result[0].outtaon.length ; i++){
                if(data.result[0].outtaon[i].value == 1){
                  arrayOuttaon++;
                }else{
                  arrayOuttaon2++;
                }
              }
              break;
              case "vin":
              for(var i = 0; i < data.result[0].vin.length ; i++){
                if(data.result[0].vin[i].value == 1){
                  arrayVin++;
                }else{
                  arrayVin2++;
                }
              }
              break;
              case "vout":
              for(var i = 0; i < data.result[0].vout.length ; i++){
                if(data.result[0].vout[i].value == 1){
                  arrayVout++;
                }else{
                  arrayVout2++;
                }
              }
              break;
              case "analog":
              for(var i = 0; i < data.result[0].analog.length ; i++){
                if(data.result[0].analog[i].value == 1){
                  arrayAnalog++;
                }else{
                  arrayAnalog2++;
                }
              }
              break;
              case "analogv":
              for(var i = 0; i < data.result[0].analogv.length ; i++){
                if(data.result[0].analogv[i].value == 1){
                  arrayAnalogV++;
                }else{
                  arrayAnalogV2++;
                }
              }
              break;
              case "xths":
              for(var i = 0; i < data.result[0].xths.length ; i++){
                if(data.result[0].xths[i].value == 1){
                  arrayXths++;
                }else{
                  arrayXths2++;
                }
              }
              break;
              case "cpt":
              for(var i = 0; i < data.result[0].cpt.length ; i++){
                if(data.result[0].cpt[i].value == 1){
                  arrayCpt++;
                }else{
                  arrayCpt2++;
                }
              }
              break;
              case "volet":
              for(var i = 0; i < data.result[0].volet.length ; i++){
                if(data.result[0].volet[i].value == 1){
                  arrayVolet++;
                }else{
                  arrayVolet2++;
                }
              }
              break;
              case "pw":
              for(var i = 0; i < data.result[0].pw.length ; i++){
                if(data.result[0].pw[i].value == 1){
                  arrayPw++;
                }else{
                  arrayPw2++;
                }
              }
              break;
              case "eno":
              for(var i = 0; i < data.result[0].eno.length ; i++){
                if(data.result[0].eno[i].value == 1){
                  arrayEno++;
                }else{
                  arrayEno2++;
                }
              }
              break;
              case "x4fp":
              for(var i = 0; i < data.result[0].x4fp.length ; i++){
                if(data.result[0].x4fp[i].value == 1){
                  arrayXths++;
                }else{
                  arrayXths2++;
                }
              }
              break;
              case "enoa":
              for(var i = 0; i < data.result[0].enoa.length ; i++){
                if(data.result[0].enoa[i].value == 1){
                  arrayEnoA++;
                }else{
                  arrayEnoA2++;
                }
              }
              break;
            }
          }
          leds();
        }
      });

    }

  });
  $('.selectpickerMonth').on('change', function(){
      var selected2 = $(this).find("option:selected").val();
      if(selected2 != ""){
        $.ajax({
          url: "http://localhost:5000/api/data/month/"+ selected2,
          dataType: "json",
          success: function(data){
            var array = Object.keys(data.result[0]);
            for(var x = 0; x < array.length ; x++){
              switch(array[x]){
                case "leds":
                for(var i = 0; i < data.result[0].leds.length ; i++){
                  if(data.result[0].leds[i].value == 1){
                    arrayLeds++;
                  }else{
                    arrayLeds2++;
                  }
                }
                break;
                case "btn":
                for(var i = 0; i < data.result[0].btn.length ; i++){
                  if(data.result[0].btn[i].value == 1){
                    arrayBtn++;
                  }else{
                    arrayBtn2++;
                  }
                }
                break;
                case "outtaon":
                for(var i = 0; i < data.result[0].outtaon.length ; i++){
                  if(data.result[0].outtaon[i].value == 1){
                    arrayOuttaon++;
                  }else{
                    arrayOuttaon2++;
                  }
                }
                break;
                case "vin":
                for(var i = 0; i < data.result[0].vin.length ; i++){
                  if(data.result[0].vin[i].value == 1){
                    arrayVin++;
                  }else{
                    arrayVin2++;
                  }
                }
                break;
                case "vout":
                for(var i = 0; i < data.result[0].vout.length ; i++){
                  if(data.result[0].vout[i].value == 1){
                    arrayVout++;
                  }else{
                    arrayVout2++;
                  }
                }
                break;
                case "analog":
                for(var i = 0; i < data.result[0].analog.length ; i++){
                  if(data.result[0].analog[i].value == 1){
                    arrayAnalog++;
                  }else{
                    arrayAnalog2++;
                  }
                }
                break;
                case "analogv":
                for(var i = 0; i < data.result[0].analogv.length ; i++){
                  if(data.result[0].analogv[i].value == 1){
                    arrayAnalogV++;
                  }else{
                    arrayAnalogV2++;
                  }
                }
                break;
                case "xths":
                for(var i = 0; i < data.result[0].xths.length ; i++){
                  if(data.result[0].xths[i].value == 1){
                    arrayXths++;
                  }else{
                    arrayXths2++;
                  }
                }
                break;
                case "cpt":
                for(var i = 0; i < data.result[0].cpt.length ; i++){
                  if(data.result[0].cpt[i].value == 1){
                    arrayCpt++;
                  }else{
                    arrayCpt2++;
                  }
                }
                break;
                case "volet":
                for(var i = 0; i < data.result[0].volet.length ; i++){
                  if(data.result[0].volet[i].value == 1){
                    arrayVolet++;
                  }else{
                    arrayVolet2++;
                  }
                }
                break;
                case "pw":
                for(var i = 0; i < data.result[0].pw.length ; i++){
                  if(data.result[0].pw[i].value == 1){
                    arrayPw++;
                  }else{
                    arrayPw2++;
                  }
                }
                break;
                case "eno":
                for(var i = 0; i < data.result[0].eno.length ; i++){
                  if(data.result[0].eno[i].value == 1){
                    arrayEno++;
                  }else{
                    arrayEno2++;
                  }
                }
                break;
                case "x4fp":
                for(var i = 0; i < data.result[0].x4fp.length ; i++){
                  if(data.result[0].x4fp[i].value == 1){
                    arrayXths++;
                  }else{
                    arrayXths2++;
                  }
                }
                break;
                case "enoa":
                for(var i = 0; i < data.result[0].enoa.length ; i++){
                  if(data.result[0].enoa[i].value == 1){
                    arrayEnoA++;
                  }else{
                    arrayEnoA2++;
                  }
                }
                break;
              }
            }
            leds();
          }
        });

      }
    });
  $('.selectpickerYear').on('change', function(){
      var selected3 = $(this).find("option:selected").val();
      if(selected3 != ""){
        $.ajax({
          url: "http://localhost:5000/api/data/year/"+ selected3,
          dataType: "json",
          success: function(data){
            var array = Object.keys(data.result[0]);
            for(var x = 0; x < array.length ; x++){
              switch(array[x]){
                case "leds":
                for(var i = 0; i < data.result[0].leds.length ; i++){
                  if(data.result[0].leds[i].value == 1){
                    arrayLeds++;
                  }else{
                    arrayLeds2++;
                  }
                }
                break;
                case "btn":
                for(var i = 0; i < data.result[0].btn.length ; i++){
                  if(data.result[0].btn[i].value == 1){
                    arrayBtn++;
                  }else{
                    arrayBtn2++;
                  }
                }
                break;
                case "outtaon":
                for(var i = 0; i < data.result[0].outtaon.length ; i++){
                  if(data.result[0].outtaon[i].value == 1){
                    arrayOuttaon++;
                  }else{
                    arrayOuttaon2++;
                  }
                }
                break;
                case "vin":
                for(var i = 0; i < data.result[0].vin.length ; i++){
                  if(data.result[0].vin[i].value == 1){
                    arrayVin++;
                  }else{
                    arrayVin2++;
                  }
                }
                break;
                case "vout":
                for(var i = 0; i < data.result[0].vout.length ; i++){
                  if(data.result[0].vout[i].value == 1){
                    arrayVout++;
                  }else{
                    arrayVout2++;
                  }
                }
                break;
                case "analog":
                for(var i = 0; i < data.result[0].analog.length ; i++){
                  if(data.result[0].analog[i].value == 1){
                    arrayAnalog++;
                  }else{
                    arrayAnalog2++;
                  }
                }
                break;
                case "analogv":
                for(var i = 0; i < data.result[0].analogv.length ; i++){
                  if(data.result[0].analogv[i].value == 1){
                    arrayAnalogV++;
                  }else{
                    arrayAnalogV2++;
                  }
                }
                break;
                case "xths":
                for(var i = 0; i < data.result[0].xths.length ; i++){
                  if(data.result[0].xths[i].value == 1){
                    arrayXths++;
                  }else{
                    arrayXths2++;
                  }
                }
                break;
                case "cpt":
                for(var i = 0; i < data.result[0].cpt.length ; i++){
                  if(data.result[0].cpt[i].value == 1){
                    arrayCpt++;
                  }else{
                    arrayCpt2++;
                  }
                }
                break;
                case "volet":
                for(var i = 0; i < data.result[0].volet.length ; i++){
                  if(data.result[0].volet[i].value == 1){
                    arrayVolet++;
                  }else{
                    arrayVolet2++;
                  }
                }
                break;
                case "pw":
                for(var i = 0; i < data.result[0].pw.length ; i++){
                  if(data.result[0].pw[i].value == 1){
                    arrayPw++;
                  }else{
                    arrayPw2++;
                  }
                }
                break;
                case "eno":
                for(var i = 0; i < data.result[0].eno.length ; i++){
                  if(data.result[0].eno[i].value == 1){
                    arrayEno++;
                  }else{
                    arrayEno2++;
                  }
                }
                break;
                case "x4fp":
                for(var i = 0; i < data.result[0].x4fp.length ; i++){
                  if(data.result[0].x4fp[i].value == 1){
                    arrayXths++;
                  }else{
                    arrayXths2++;
                  }
                }
                break;
                case "enoa":
                for(var i = 0; i < data.result[0].enoa.length ; i++){
                  if(data.result[0].enoa[i].value == 1){
                    arrayEnoA++;
                  }else{
                    arrayEnoA2++;
                  }
                }
                break;
              }
            }
            leds();
          }
        });

      }
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
    //var ctx = document.getElementById("myChart");
    //var ctx = document.getElementById("myChart").getContext("2d");
    //$("#myChart").html("");
    var grafico = $(".grafico").empty();
    var char = '<center><canvas id="myChart" width="400" height="200"></canvas></center>';
    grafico.append(char);
    var ctx = $("#myChart").empty();

    //var ctx = "myChart";

    var myChart = new Chart(ctx,data);
  };

  function buttons(){
    var grafico = $('.grafico').empty();
    var char = '<center><canvas id="myChart" width="400" height="200"></canvas></center>';
    grafico.append(char);
    var ctx = $("#myChart").empty();

    var myChart = new Chart(ctx, data);
  }


    $('#myform').append('<label class="checkbox-inline"><input type="checkbox" value="Leds">Leds</label>');
    $('#myform').append('<label class="checkbox-inline"><input type="checkbox" value="Buttoes">Botoes</label>');
    $('#myform').append('<label class="checkbox-inline"><input type="checkbox" value="Outtaon">Outtaon</label>');
    $('#myform').append('<label class="checkbox-inline"><input type="checkbox" value="Vin">Vin</label>');
    $('#myform').append('<label class="checkbox-inline"><input type="checkbox" value="Vout">Vout</label>');
    $('#myform').append('<label class="checkbox-inline"><input type="checkbox" value="Votaon">Votaon</label>');
    $('#myform').append('<label class="checkbox-inline"><input type="checkbox" value="Analog">Analog</label>');
    $('#myform').append('<label class="checkbox-inline"><input type="checkbox" value="Xths">Xths</label>');
    $('#myform').append('<label class="checkbox-inline"><input type="checkbox" value="Cpt">Cpt</label>');
    $('#myform').append('<label class="checkbox-inline"><input type="checkbox" value="Volet">Volet</label>');
    $('#myform').append('<label class="checkbox-inline"><input type="checkbox" value="Pw">Pw</label>');
    $('#myform').append('<label class="checkbox-inline"><input type="checkbox" value="Eno">Eno</label>');
    $('#myform').append('<label class="checkbox-inline"><input type="checkbox" value="X4fp">X4fp</label>');
    $('#myform').append('<label class="checkbox-inline"><input type="checkbox" value="EnoA">EnoA</label>');


  $('#myform :checkbox').change(function() {
      // this will contain a reference to the checkbox
      if ($(this).is(':checked')) {

        switch($(this).val()){
          case 'Leds':
          data.data.datasets.push({
              label: $(this).val(),
              data: [arrayLeds, arrayLeds2],
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
          });
          break;
          case 'Buttoes':
          data.data.datasets.push({
              label: $(this).val(),
              data: [arrayBtn, arrayBtn2],
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
          });
          break;
          case 'Outtaon':
          data.data.datasets.push({
              label: $(this).val(),
              data: [arrayOuttaon, arrayOuttaon2],
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
          });
          break;
          case 'Vin':
          data.data.datasets.push({
              label: $(this).val(),
              data: [arrayVin, arrayVin2],
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
          });
          break;
          case 'Vout':
          data.data.datasets.push({
              label: $(this).val(),
              data: [arrayVout, arrayVout2],
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
          });
          break;
          case 'Analog':
          data.data.datasets.push({
              label: $(this).val(),
              data: [arrayAnalog, arrayAnalog2],
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
          });
          break;
          case 'analogV':
          data.data.datasets.push({
              label: $(this).val(),
              data: [arrayAnalogV, arrayAnalogV2],
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
          });
          break;
          case 'Xths':
          data.data.datasets.push({
              label: $(this).val(),
              data: [arrayXths, arrayXths2],
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
          });
          break;
          case 'Cpt':
          data.data.datasets.push({
              label: $(this).val(),
              data: [arrayCpt, arrayCpt2],
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
          });
          break;
          case 'Volet':
          data.data.datasets.push({
              label: $(this).val(),
              data: [arrayVolet, arrayVolet2],
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
          });
          break;
          case 'Pw':
          data.data.datasets.push({
              label: $(this).val(),
              data: [arrayPw, arrayPw2],
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
          });
          break;
          case 'Eno':
          data.data.datasets.push({
              label: $(this).val(),
              data: [arrayEno, arrayEno2],
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
          });
          break;
          case 'X4fp':
          data.data.datasets.push({
              label: $(this).val(),
              data: [arrayX4fp, arrayX4fp2],
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
          });
          break;
          case 'EnoA':
          data.data.datasets.push({
              label: $(this).val(),
              data: [arrayEnoA, arrayEnoA2],
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
          });
          break;

        }




        leds();
    } else {
        console.log($(this).val() + ' is now unchecked');
        for(var w = 0; w < data.data.datasets.length ; w++){
          if(data.data.datasets[w].label == $(this).val()){
            data.data.datasets.splice(w,1);
          }
        }
        leds();
    }
  });

  data = {
    type: 'bar',
    data: {
        labels: ["1", "0"],
        datasets: []
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
    }};


      $('.addcharts').append('<li><a id="1" "href="#">Chart</a></li>');
      $('.addcharts').append('<li><a id="2" "href="#">Line</a></li>');
      $('.addcharts').append('<li><a id="3" "href="#">Radar</a></li>');
      $('.addcharts').append('<li><a id="4" "href="#">Polar Area</a></li>');

      $('.dropdown-menu #1').click(function(){
          data.type = "bar";
          leds();
      });
      $('.dropdown-menu #2').click(function(){
        data.type = "bubble";
        leds();
      });

      $('.dropdown-menu #3').click(function(){
          data.type = "pie";
          leds();
      });
      $('.dropdown-menu #4').click(function(){
        data.type = "polarArea";
        leds();
      });

});
