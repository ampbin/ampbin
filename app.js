http = require('http');
gcloud = require('google-cloud');
fs = require('fs');

/**
 * Config options for firebase
 * @type {Object}
 */
config = {
    apiKey: 'AIzaSyBYkQt6uTnx1WqCJRbFh-58u3IGF2OtEPc',
    authDomain: 'levilol-9594e.firebaseapp.com',
    databaseURL: 'https://levilol-9594e.firebaseio.com',
    storageBucket: 'levilol-9594e.appspot.com',
    messagingSenderId: '331064834157',
};

/**
 * bucket
 * @type {String}
 */
gs = 'gs://levilol-9594e.appspot.com/';

AmpBinServer = (function() {
    /**
     * @param {config} config
     * @param {gs} gs
     */
    function AmpBinServer(config, gs) {
        gcs = gcloud.storage({
          projectId: 'levilol-9594e',
          keyFilename: 'creds.json',
        });
        this.bins = gcs.bucket('levilol-9594e.appspot.com');
    }

    AmpBinServer.prototype.getBin = function(id, response) {
        console.log('[' + new Date() + '] Getting bin: ' + id);
        remoteReadStream = this.bins.file('ampbins/' + id).createReadStream();
        r = '';
        data = remoteReadStream.on('data', function(chunk) {
            r += chunk;
        })
        .on('end', function() {
            response.write(r);
            response.end();
        });
    };
    return AmpBinServer;
}());

abs = new AmpBinServer(config, gs);
binData = '';
http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    url = request.url.replace('/', '');
    if(url != 'favicon.ico') {
        abs.getBin(url, response);
    }
}).listen(8081);
// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
