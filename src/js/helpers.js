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
    });
}
