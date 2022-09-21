let kills = 0;
let gameStarted = false;
let dead = false;
let fliesCount = 0;
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
    },1999)
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
                                died('trap');
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
    fliesCount++;
    console.log(fliesCount);

    if (fliesCount >= 10) {
        died('killed');
    }

   fly.addEventListener('click', () =>{
    if (killed) {
        return;
    }
    killed = true;
    fliesCount--;
    console.log(fliesCount);
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
    
}, 1000)

//died
function died(reason){
    gameStarted = false;
    root.innerHTML = `<div id="kill-count">Kills: <span>${kills}</span></div>`;

    let diedtext = document.createElement('img');

    if (reason == 'trap') {
        diedtext.src = 'images/died-text.png';
    }else if ( reason == 'killed'){
        diedtext.src = 'images/killed-text.png';
    }

    diedtext.classList.add('animate-text');
    root.appendChild(diedtext); 

    let btn = document.createElement('button');
    btn.innerText="Restart";
    btn.addEventListener('click', ()=>{reset()});
    root.appendChild(btn); 

        //restart game
        function reset(){
          fliesCount = 0;
          kills = 0;
          dead= false;
          diedtext.classList.add('fadeOut');
          btn.classList.add('fadeOut');
          setTimeout(() =>{
             gameStarted = true;
             root.innerHTML = `<div id="kill-count">Kills: <span>${kills}</span></div>`;
          },1999)
}

}


//random number generator
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }