var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var mv = require('mv');

mongoose.connect('mongodb://localhost/baseDados');
var db = mongoose.connection;

Data = require('./datatoDB');

app.listen(5000);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended:true
}));


app.get('/', function(req, res){
   res.sendFile('index.html', { root: __dirname} );
});

app.get('/getData.js', function(req, res){
  res.sendFile('getData.js', {root: __dirname});
});

app.get('/api/data/filename', function(req, res){
  Data.getData(function(err, data){
    if(err){
      throw err;
    }
    var result = [];
    data.forEach(function(u) {
      result.push(u.filename);
    });
    res.json({result});
  });
});

app.get('/api/data/day', function(req, res){
  Data.getData(function(err, data){
    if(err){
      throw err;
    }
    var result = [];
    data.forEach(function(u){
      result.push(u.dateDay);
    });
    res.json({result});
  });
});

app.get('/api/data/month', function(req, res){
  Data.getData(function(err, data){
    if(err){
      throw err;
    }
    var result = [];
    data.forEach(function(u){
      result.push(u.dateMonth);
    });
    res.json({result});
  });
});

app.get('/api/data/year', function(req, res){
  Data.getData(function(err, data){
    if(err){
      throw err;
    }
    var result = [];
    data.forEach(function(u){
      result.push(u.dateYear);
    });
    res.json({result});
  });
});

app.get('/api/data/fields', function(req, res){
  Data.getData(function(err, data){
    if(err){
      throw err;
    }

    for(var i in data){
      console.log(i); // alerts key
      console.log(data[i]); //alerts key's value
    }

    var result = [];
    data.forEach(function(u){
      result.push(u);


    });
    res.json({result});
  });
});

app.get('/api/data/leds/:dia', function(req, res){
  Data.getData(function(err, data){
    if(err){
      throw err;
    }

    var result = [];
    data.forEach(function(u){
      if(u.dateDay == req.params.dia){
          result.push(u.data[0].leds);
      }
    });
    res.json({result});
  });
});


app.get('/api/data',function (req, res) {
    Data.getData(function (err, data) {
        if (err) {
            throw err;
        }
        res.json({data});
    });
});

app.get('/byName/:name',function(req, res){
  Data.getDataByName(req.params.name, function(err, data){
    if(err){
      throw err;
    }
    res.json({data});
    console.log({data});
  });
});

var fs = require('fs');
xml2js = require('xml2js');
var parser = new xml2js.Parser();

var object;

readDirectory();

function readDirectory(){
  var pathHome = "./DadosMonitorizacao-Eletric-IPVC/DadosAProcessar/";
  var pathTo = "./DadosMonitorizacao-Eletric-IPVC/DadosProcessados/"
  fs.readdir(pathHome, (err, files) => {
    files.forEach(file => {

      Data.getDataByName(file, function(err, data){
        if(err){
          throw err;
        }

        if(!data.length){
          console.log("Nao Existe! e foi Adicionado!");
          // nao existe
          fs.readFile(pathHome+file, function(err, data){
            parser.parseString(data, function(err, result){
              var arrayLed = [];
              var arrayBtn = [];
              var arrayOuttaon = [];
              var arrayVin = [];
              var arrayVout = [];
              var arrayVotaon = [];
              var arrayAnalog = [];
              var arrayAnalogV = [];
              var arrayXths = [];
              var arrayCpt = [];
              var arrayVolet = [];
              var arrayPw = [];
              var arrayEno = [];
              var arrayX4fp = [];
              var data;
              var dataDay;
              var dataMonth;
              var dataYeah;
              var hora;
              for(var key in result.response) {

                //console.log(key);
                var chave = key;
                //console.log(result.response[key]);
                if(key.startsWith('led')){
                  arrayLed.push({value : result.response[key], chave: key});
                }else if(key.startsWith('btn')){
                  arrayBtn.push({value : result.response[key], chave: key});
                }else if(key.startsWith('outtaon')){
                  arrayOuttaon.push({value : result.response[key], chave: key});
                }else if(key.startsWith('vin')){
                  arrayVin.push({value : result.response[key], chave: key});
                }else if(key.startsWith('vout')){
                  arrayVout.push({value : result.response[key], chave: key});
                }else if(key.startsWith('votaon')){
                  arrayVotaon.push({value : result.response[key], chave: key});
                }else if(key.startsWith('analog')){
                  arrayAnalog.push({value : result.response[key], chave: key});
                }else if(key.startsWith('analogV')){
                  array.analogV.push({value : result.response[key], chave: key});
                }else if(key.startsWith('xths')){
                  arrayXths.push({value : result.response[key], chave: key});
                }else if(key.startsWith('cpt')){
                  arrayCpt.push(
                    {value : result.response[key],
                      chave: chave}
                  );
                }else if(key.startsWith('volet')){
                  arrayVolet.push({value : result.response[key], chave: key});
                }else if(key.startsWith('pw')){
                  arrayPw.push({value : result.response[key], chave: key});
                }else if(key.startsWith('eno')){
                  arrayEno.push({value : result.response[key], chave: key});
                }else if(key.startsWith('x4fp')){
                  arrayX4fp.push({value : result.response[key], chave: key});
                }else if(key.startsWith('date')){
                  dataDay = result.response[key].toString().slice(0,2);
                  dataMonth = result.response[key].toString().slice(3,5);
                  dataYear = result.response[key].toString().slice(6,10);
                }else if(key.startsWith('heure')){
                  hora = result.response[key];
                }
              }
              object = {
                filename : file,
                dateDay : dataDay,
                dateMonth : dataMonth,
                dateYear : dataYear,
                hour : hora,
                data: [{
                  leds : arrayLed,
                  btn : arrayBtn,
                  outtaon : arrayOuttaon,
                  vin : arrayVin,
                  vout : arrayVout,
                  votaon : arrayVotaon,
                  analog : arrayAnalog,
                  analogV : arrayAnalogV,
                  xths : arrayXths,
                  cpt : arrayCpt,
                  volet : arrayVolet,
                  pw : arrayPw,
                  eno : arrayEno,
                  x4fp : arrayX4fp,
                }]
              }

              Data.create(object,function() {
                console.log("Adicionado!");

              });
              /*mv(pathHome+file, pathTo+file, function(err) {
                  // handle the error
                  console.log("Ficheiros Movidos!")
              });

*/
            })
          });
        }else{
          //existe!
          //console.log("Este Ficheiro já existe!");
        }
      });


    })
  });

}
