let kills = 0;

let root = document.getElementById('root');
root.addEventListener('click', () => {
    root.classList.add('slapped');
    setTimeout(() =>{
       root.classList.remove('slapped');
    }, 200)
})

let flies = document.querySelectorAll('.fly').forEach(x => x.addEventListener('click', () =>{
    if (x.src != './images/blood-splash.png') {
        x.src= './images/blood-splash.png';
        kills++;
        setTimeout(() =>{
            x.style.display="none";
        }, 700)
    }
   
}))