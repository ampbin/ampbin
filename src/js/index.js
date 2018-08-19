import {loadEditor} from './editor';
import {updateAmpStatus} from './validate';
import {firebaseinit} from './firebase';
import {login} from './auth';
import {connect, save, getBin} from './db';
import {updateHash, updateActionStatus} from './helpers';
import {toast} from './toast';

var editor = loadEditor();

editor.on("change", function() {
    var result = amp.validator.validateString(editor.getValue());
    updateAmpStatus(result.status);
});

var firebase = firebaseinit();
var userid = login(firebase);
var db = connect(firebase);

var savebutton = document.getElementById('savebutton');
firebase.auth().onAuthStateChanged(function(user) {
    savebutton.disabled = false;

    savebutton.onclick = function() {
        save(db, user.uid, editor);
    }
});

if(window.location.hash.length > 0) {
    getBin(db, window.location.hash, editor);
}

var newbinbutton = document.getElementById('newbin');
newbin.onclick = function() {
    updateHash('');
    editor.setValue(document.getElementById('editor').value);
}

var copyurlbutton = document.getElementById('copyurl');
copyurlbutton.onclick = function() {

    var dummy = document.createElement('input'),
    text = window.location.href;
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    toast('Copied edit URL', 'success');
}

var copytextbutton = document.getElementById('copytext');
copytextbutton.onclick = function() {
    var dummy = document.createElement('textarea'),
    amphtml = editor.getValue();
    document.body.appendChild(dummy);
    dummy.value = amphtml;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    toast('Copied AMP HTML', 'success');
}

var copystaticbutton = document.getElementById('copystatic');
copystaticbutton.onclick = function() {
    var dummy = document.createElement('input');
    var text;
    if(window.location.hash) {
        text = window.location.hash;
        text = "https://static.ampb.in/" + text.replace("#", "") + ".html";
    } else {
        toast('Please save a bin first', 'info');
        
        return;
    }
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    toast('Copied rendered bin URL', 'success');
}
