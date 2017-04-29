
var mongoose = require('mongoose');

  var dataSchema = mongoose.Schema({
    filename : String,
    data: [{
      leds : [{value: String, chave: String}],
      btn : [{value: String, chave: String}],
      outtaon : [{value: String, chave: String}],
      vin : [{value: String, chave: String}],
      vout : [{value: String, chave: String}],
      votaon : [{value: String, chave: String}],
      analog : [{value: String, chave: String}],
      analogV : [{value: String, chave: String}],
      xths : [{value: String, chave: String}],
      cpt : [{value: String, chave: String}],
      volet : [{value: String, chave: String}],
      pw : [{value: String, chave: String}],
      eno : [{value: String, chave: String}],
      x4fp : [{value: String, chave: String}],
      date : String,
      hour : String
    }]
  });

var Data = module.exports = mongoose.model('Data', dataSchema);

module.exports.getData = function(callback, limit){
  Data.find(callback).limit(limit);
};

module.exports.addData = function (data, callback) {
    Data.create(data, callback);
};

module.exports.getDataByName = function (data, callback) {
    Data.find({filename:data},callback);
};
