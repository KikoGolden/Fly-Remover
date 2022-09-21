let kills = 0;
let gameStarted = false;
let dead = false;
let root = document.getElementById('root');

root.addEventListener('click', () => {
    root.classList.add('slapped');
    setTimeout(() =>{
       root.classList.remove('slapped');
    }, 200)
})

let startText = document.createElement('img');
startText.src = 'images/start-text.png';
startText.classList.add('animate-text');
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
    if(gameStarted && !dead){
        
    let killCount = document.querySelector('#kill-count span');
    const height = randomIntFromInterval(10, 90)// y
    const width = randomIntFromInterval(10, 90)// x
    let killed = false;
    
    if (randomIntFromInterval(1, 6) == 1) {
        let butterfly = document.createElement('img');
        butterfly.classList.add('butterfly');
        butterfly.src= 'images/butterfly.png';
        butterfly.style.left = width + 'vw';
        butterfly.style.top = height + 'vh';
        root.appendChild(butterfly);

        setTimeout(()=>{
           if (killed) {
             return;
           }

           butterfly.classList.add('despawn');
            setTimeout(()=>{
                root.removeChild(butterfly);
            },1700);
        },5000);

        butterfly.addEventListener('click', () =>{
            if (killed) {
                return;
            }
            killed = true;
            dead = true;
                let path = butterfly.src;
                if (!path.includes('blood')) {
                    butterfly.src= './images/blood-splash.png';

                    setTimeout(() =>{
                        butterfly.classList.add('fadeOut');
                        setTimeout(() =>{
                                root.removeChild(butterfly);
                                died();
                        },2000)
                    }, 1000)
                }
            })
    }else{
    let fly = document.createElement('img');
    fly.classList.add('fly');
    fly.src= 'images/fly.png';
    fly.style.left = width + 'vw';
    fly.style.top = height + 'vh';
    root.appendChild(fly);

   fly.addEventListener('click', () =>{
    if (killed) {
        return;
    }
    killed = true;
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
}
    
}, 2000)

//died
function died(){
    gameStarted = false;
    root.innerHTML = `<div id="kill-count">Kills: <span>${kills}</span></div>`;

    let diedtext = document.createElement('img');
    diedtext.src = 'images/died-text.png';
    diedtext.classList.add('animate-text');
    root.appendChild(diedtext); 

    let btn = document.createElement('button');
    btn.innerText="Restart";
    btn.addEventListener('click', ()=>{reset()});
    root.appendChild(btn); 

        //restart game
        function reset(){
          kills = 0;
          dead= false;
          diedtext.classList.add('fadeOut')
          root.innerHTML = `<div id="kill-count">Kills: <span>${kills}</span></div>`;
          setTimeout(() =>{
             gameStarted = true;
          },2000)
}

}


//random number generator
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }