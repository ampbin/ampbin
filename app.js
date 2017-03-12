var http = require("http");
var gcloud = require("google-cloud");
var fs = require('fs');

var config = {
    apiKey: "AIzaSyBYkQt6uTnx1WqCJRbFh-58u3IGF2OtEPc",
    authDomain: "levilol-9594e.firebaseapp.com",
    databaseURL: "https://levilol-9594e.firebaseio.com",
    storageBucket: "levilol-9594e.appspot.com",
    messagingSenderId: "331064834157"
};

var gs = "gs://levilol-9594e.appspot.com/";

var AmpBinServer = (function () {
    function AmpBinServer(config, gs) {
        var gcs = gcloud.storage({
          projectId: 'levilol-9594e',
          keyFilename: 'creds.json'
        });
        this.bins = gcs.bucket("levilol-9594e.appspot.com");
    }

    AmpBinServer.prototype.getBin = function (id, response) {
        console.log("Getting bin: " + id);
        var remoteReadStream = this.bins.file("ampbins/" + id).createReadStream();
        var r = '';
        var data = remoteReadStream.on("data", function(chunk) {
            r += chunk;
        })
        .on("end", function() {
            response.write(r);
            response.end();
        });
    };
    return AmpBinServer;
}());

var abs = new AmpBinServer(config, gs);
var binData = '';
http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    var url = request.url.replace("/", "");
    if(url != "favicon.ico") {
        abs.getBin(url, response);
    }
}).listen(8081);
// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
