// Some helper functions

export function updateHash(hash) {
    if(hash.length > 0) {
        return window.location.hash = '#' + hash;
    }

    return window.location = '';
}

export function updateActionStatus(text) {
    var savestatus = document.getElementById('savestatus');
    savestatus.innerHTML = text + '!';
    setTimeout(function() {
        savestatus.classList.add('active');
    }, 200);
    setTimeout(function() {
        savestatus.classList.remove('active');
    }, 2000);
}

export function authlistener(firebase) {
    firebase.auth().onAuthStateChanged(function(user) {
        console.log('User: ' + user.uid);
        if(!user.isAnonymous) {
            notAnonymous();
            addUserImage(user);
        }

    });
}

export function hide(id) {
    let el = document.getElementById(id);
    el.classList.add('hide');
}

export function show(id) {
    let el = document.getElementById(id);
    el.classList.remove('hide');
}

export function notAnonymous() {
    show('signout');
    hide('signin');
}

export function isAnonymous() {
    show('signin');
    hide('signout');
}

function addUserImage(user) {
    let el = document.getElementById('userphoto');
    let img = document.createElement('img');
    img.src = user.providerData[0].photoURL;
    el.appendChild(img);
}
