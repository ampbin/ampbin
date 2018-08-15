export function updateAmpStatus(status) {
    var ampStatus = document.getElementById('amp_status');
    ampStatus.innerHTML = status;
    ampStatus.classList.remove('pass');
    ampStatus.classList.remove('fail');
    ampStatus.classList.add(status.toLowerCase());
}
