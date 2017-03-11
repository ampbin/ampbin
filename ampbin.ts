import * as firebase from 'firebase';

declare var Jotted: any;

class AmpBin {
    storageRef;
    constructor() {
        var config = {
            apiKey: "AIzaSyBYkQt6uTnx1WqCJRbFh-58u3IGF2OtEPc",
            authDomain: "levilol-9594e.firebaseapp.com",
            databaseURL: "https://levilol-9594e.firebaseio.com",
            storageBucket: "levilol-9594e.appspot.com",
            messagingSenderId: "331064834157"
        };

        var app = firebase.initializeApp( config );
        var storage = firebase.app().storage("gs://levilol-9594e.appspot.com/");
        this.storageRef = storage.ref();
    }

    upload(data) {
        var id = this.guid();
        window.history.pushState('', '', "/" + id);
        var ref = this.storageRef.child('ampbins/' + id);
        ref.putString(data).then(function(snapshot) {
            console.log('Uploaded a raw string!');
        });
    }

    getBin(id) {
        var ref = this.storageRef.child('ampbins/' + id);
        // todo: get bin from storage
        var promise = ref.getDownloadURL().then( url => {
            this.createBin(url);
        });
    }

    createBin(url) {
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
    }

    guid() {
      return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
        this.s4() + '-' + this.s4() + this.s4() + this.s4();
    }

    s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
}

let ab = new AmpBin;

let message = document.getElementById("message") as HTMLObjectElement;
let save = document.getElementById("save");
save.addEventListener("click", function() {
    let copy = document.getElementById("copy") as HTMLInputElement;
    let data = copy.value;
   
    ab.upload(data);

    message.style.display = "block";
    setTimeout(function(){ message.style.display = "none"; }, 1300);
});

var production = true;

if(production) {
    var bin = window.location.href.replace('https://ampb.in/', '');
} else {
    var bin = window.location.href.replace('http://localhost:8080/', '');
}

if(bin.length > 0) {
    ab.getBin(bin);
} else {
    ab.createBin('/start.html');
}
