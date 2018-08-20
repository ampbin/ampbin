export function toast(message, level) {
    let toast = document.getElementById('toast');
    toast.classList.add(level);
    toast.classList.add('visible');
    toast.innerHTML = message;
    
    setTimeout(() => { 
        toast.classList.remove(level);
        toast.classList.remove('visible');
        toast.innerHTML = '';
    }, 3000);
}
