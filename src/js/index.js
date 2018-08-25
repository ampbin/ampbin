import {loadEditor} from './editor';
import {updateAmpStatus} from './validate';
import {firebaseinit} from './firebase';
import {login} from './auth';
import {connect, save, getBin} from './db';
import {updateHash, updateActionStatus, authlistener, show, hide, isAnonymous, notAnonymous} from './helpers';
import {toast} from './toast';

// Load the CodeMirror editor. It returns the CodeMirror Editor object.
var editor = loadEditor();

// Whenever the code is updated, we need to make sure the AMP HTML is valid. Then
// we will update the status icon at the top right of the screen. Green is good
// and red is bad. Thumbs up is good, and thumbs down is bad. I assume that it
// is universally known and that people will understand.
editor.on("change", function() {
    // As long as we include the AMP Validator script before this loads, we can
    // call the AMP Validator validateString method on the contents of the editor.
    var result = amp.validator.validateString(editor.getValue());
    // Then we take the result and update the UI.
    updateAmpStatus(result.status);
});

// Initialize Firebase, then login, then connect to the database. More information
// on these function calls can be found with their code.
var firebase = firebaseinit();
var userid = login(firebase);
var db = connect(firebase);

// Setup a listener for when someone authenticates
authlistener(firebase);

// Save button is disabled until they're authenticated
var savebutton = document.getElementById('savebutton');
firebase.auth().onAuthStateChanged(function(user) {
    savebutton.disabled = false; // Now that they're authenticated, we enable the button

    // And now we can create an event listener on the save button.
    savebutton.onclick = function() {
        // When save is clicked, we need to save the content
        save(db, user.uid, editor);
    }
});

// If there is a hash string in the URL, it *should* be a bin ID
if(window.location.hash.length > 0) {
    // We will try and load that bin
    getBin(db, window.location.hash, editor);
}

// Create a new bin, it just reloads the page.
var newbinbutton = document.getElementById('newbin');
newbin.onclick = function() {
    updateHash('');
    editor.setValue(document.getElementById('editor').value);
}

// Copy AMP HTML event listener
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

// Copy static URL event listener
var copystaticbutton = document.getElementById('copystatic');
copystaticbutton.onclick = function() {
    var dummy = document.createElement('input');
    var text;
    // If they've saved the bin, we'll create and copy a link.
    if(window.location.hash) {
        text = window.location.hash;
        text = "https://static.ampb.in/" + text.replace("#", "") + ".html";
    } else {
        // They have to save a bin before they can share it.
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

// Signin button listener
var signinbutton = document.getElementById('signin');
signinbutton.onclick = function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        notAnonymous();
    });
}

// Signout button listener
var signoutbutton = document.getElementById('signout');
signoutbutton.onclick = function() {
    firebase.auth().signOut();
    isAnonymous();
}
