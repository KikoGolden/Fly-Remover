let kills = 0;

let root = document.getElementById('root');
root.addEventListener('click', () => {
    root.classList.add('slapped');
    setTimeout(() =>{
       root.classList.remove('slapped');
    }, 200)
})


//fly spawn
setInterval(() =>{
    const height = randomIntFromInterval(10, 90)// y
    const width = randomIntFromInterval(10, 90)// x
    let fly = document.createElement('img');

    fly.classList.add('fly');
    fly.src= 'images/fly.png';
    fly.style.left = width + 'vw';
    fly.style.top = height + 'vh';
    root.appendChild(fly);

    document.querySelectorAll('.fly').forEach(x => x.addEventListener('click', () =>{
        let path = x.src;
        if (!path.includes('blood')) {
            x.src= './images/blood-splash.png';
            kills++;
            console.log('kill');
            setTimeout(() =>{
                x.style.display="none";
            }, 1000)
        }
       
    }))
}, 2000)


//random number generator
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }