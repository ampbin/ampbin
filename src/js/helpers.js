export function updateHash(hash) {
    window.location.hash = '#' + hash;
}

export function updateSaveStatus() {
    var savestatus = document.getElementById('savestatus');
    savestatus.innerHTML = 'saved!';
    setTimeout(function() {
        savestatus.classList.add('active');
    }, 200);
    setTimeout(function() {
        savestatus.classList.remove('active');
    }, 2000);
}
