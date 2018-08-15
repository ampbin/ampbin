export function updateAmpStatus(status) {
    var ampStatusContainer = document.getElementById('amp_status');
    ampStatusContainer.classList.remove('pass');
    ampStatusContainer.classList.remove('fail');
    ampStatusContainer.classList.add(status.toLowerCase())
    
    var ampStatusIcon = document.getElementById('amp_status_icon');
    ampStatusIcon.classList.remove('fa-thumbs-up');
    ampStatusIcon.classList.remove('fa-thumbs-down');
    if(status === 'PASS') {
        ampStatusIcon.classList.add('fa-thumbs-up');
    } else {
        ampStatusIcon.classList.add('fa-thumbs-down');
    }
}
