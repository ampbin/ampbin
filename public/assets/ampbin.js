"use strict";
var firebase = require("firebase");
var AmpBin = (function () {
    function AmpBin() {
        var config = {
            apiKey: "AIzaSyBYkQt6uTnx1WqCJRbFh-58u3IGF2OtEPc",
            authDomain: "levilol-9594e.firebaseapp.com",
            databaseURL: "https://levilol-9594e.firebaseio.com",
            storageBucket: "levilol-9594e.appspot.com",
            messagingSenderId: "331064834157"
        };
        var app = firebase.initializeApp(config);
        var storage = firebase.app().storage("gs://levilol-9594e.appspot.com/");
        this.storageRef = storage.ref();
    }
    AmpBin.prototype.upload = function (data) {
        var id = this.guid();
        window.history.pushState('', '', "/" + id);
        var ref = this.storageRef.child('ampbins/' + id);
        ref.putString(data).then(function (snapshot) {
            console.log('Uploaded a raw string!');
        });
    };
    AmpBin.prototype.getBin = function (id) {
        var _this = this;
        var ref = this.storageRef.child('ampbins/' + id);
        // todo: get bin from storage
        var promise = ref.getDownloadURL().then(function (url) {
            _this.createBin(url);
        });
    };
    AmpBin.prototype.createBin = function (url) {
        var jotted = new Jotted(document.querySelector('#editor'), {
            files: [{
                    type: 'html',
                    url: url
                }],
            pane: 'html',
            plugins: [
                'ace',
                'ampbin'
            ]
        });
    };
    AmpBin.prototype.guid = function () {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
            this.s4() + '-' + this.s4() + this.s4() + this.s4();
    };
    AmpBin.prototype.s4 = function () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };
    return AmpBin;
}());
var ab = new AmpBin;
var message = document.getElementById("message");
var save = document.getElementById("save");
save.addEventListener("click", function () {
    var copy = document.getElementById("copy");
    var data = copy.value;
    ab.upload(data);
    message.style.display = "block";
    setTimeout(function () { message.style.display = "none"; }, 1300);
});
var production = true;
if (production) {
    var bin = window.location.href.replace('https://ampb.in/', '');
}
else {
    var bin = window.location.href.replace('http://localhost:8080/', '');
}
if (bin.length > 0) {
    ab.getBin(bin);
}
else {
    ab.createBin('/start.html');
}
