let kills = 0;
let gameStarted = false;
let killCount = document.querySelector('#kill-count span');

let root = document.getElementById('root');
root.addEventListener('click', () => {
    root.classList.add('slapped');
    setTimeout(() =>{
       root.classList.remove('slapped');
    }, 200)
})

let startText = document.createElement('img');
startText.src = 'images/start-text.png';
startText.classList.add('start-text');
root.appendChild(startText); 

setTimeout(() =>{
    startText.classList.add('fadeOut')
    setTimeout(() =>{
        root.removeChild(startText);
        gameStarted = true;
    },2000)
},2500)

//fly spawn
setInterval(() =>{
    if(gameStarted){
    const height = randomIntFromInterval(10, 90)// y
    const width = randomIntFromInterval(10, 90)// x
    let fly = document.createElement('img');

    fly.classList.add('fly');
    fly.src= 'images/fly.png';
    fly.style.left = width + 'vw';
    fly.style.top = height + 'vh';
    root.appendChild(fly);

   fly.addEventListener('click', () =>{
        let path = fly.src;
        if (!path.includes('blood')) {
            fly.src= './images/blood-splash.png';
            kills++;
            killCount.textContent = kills;
            setTimeout(() =>{
                fly.classList.add('fadeOut');
                setTimeout(() =>{
                    root.removeChild(fly);
                },2000)
            }, 1000)
        }
    })
}
    
}, 2000)


//random number generator
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }