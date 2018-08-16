export function updateHash(hash) {
    window.location.hash = '#' + hash;
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
