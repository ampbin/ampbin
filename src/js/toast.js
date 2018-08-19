export function toast(message, level) {
    let toast = document.getElementById('toast');
    toast.classList.add(level);
    toast.classList.add('visible');
    
    let txt = document.createTextNode(message);
    
    toast.appendChild(txt);
    
    setTimeout(function(){ 
        toast.classList.remove(level);
        toast.classList.remove('visible');
        toast.removeChild(txt);
    }, 3000);
}
