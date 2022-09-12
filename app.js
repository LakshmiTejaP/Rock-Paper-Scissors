let userScore;
let compScore;

document.addEventListener('DOMContentLoaded',()=>{
   userScore=0;
   compScore=0;
   loadEventListeners();
})

const rockBtn=document.querySelector('.rock-btn');
const paperBtn=document.querySelector('.paper-btn');
const scissorsBtn=document.querySelector('.scissors-btn');

const playBtn=document.querySelector('.play-btn');
const exitBtn=document.querySelector('.exit-btn');
const header=document.querySelector('.index-container');
const playContainer=document.querySelector('.play-container');
const endContainer=document.querySelector('.end-container');

const hands=Array.from(document.querySelectorAll('.hands'));
const compImg=document.querySelector('.computerImg');
const playImg=document.querySelector('.playerImg');

const userScoreBoard=Array.from(document.querySelectorAll('.userScore'));
const compScoreBoard=Array.from(document.querySelectorAll('.compScore'));

const output=document.querySelectorAll('.choose');

function loadEventListeners(){
  rockBtn.addEventListener('click',start);
  paperBtn.addEventListener('click',start);
  scissorsBtn.addEventListener('click',start);
  
  playBtn.addEventListener('click',(e)=>{
    header.style.transform="all 7s ease-out"
    header.classList.add('no-display');
    playContainer.classList.add('play-visible');
    e.preventDefault();
   })

  exitBtn.addEventListener('click',(e)=>{
   playContainer.classList.add('no-display');
   endContainer.classList.add('end-visible');
   e.preventDefault();
  })
}

function start(e){
  e.preventDefault();

  initializeAnimation();
  initializeDisplay();
  hands.forEach((hand)=>{
    hand.style.animation="shake 2s ease";
  });

  setTimeout(()=>{
    const user=playerChoice(e);
    const comp=computerChoice(e);
    const win=findWinner(user,comp);
    trackScore(win);
  },2000);

}

function initializeAnimation(){
  hands.forEach(hand =>{
    hand.addEventListener('animationend',function(){
      this.style.animation='';
    });
  });
  initializeDisplay();
  output.innerHTML=`<h2 class="choose"></h2>`;
}
function initializeDisplay(){
  playImg.setAttribute("src","Assets/images/rockCopy.png");
  compImg.setAttribute("src","Assets/images/rock.png");
}
function playerChoice(e){
  let user=-1;
  if(e.target.classList.contains('rock-btn')){
    playImg.setAttribute("src","Assets/images/rockCopy.png");
    user=1;
  }else if(e.target.classList.contains('paper-btn')){
    playImg.setAttribute("src","Assets/images/paperCopy.JPG");
    user=2;
  }else if(e.target.classList.contains('scissors-btn')){
    playImg.setAttribute("src","Assets/images/scissorsCopy.png");
    user=3;
  }
  return user;
}

function computerChoice(e){
  const rand=Math.floor((Math.random() * 3)+1);
  if(rand==1){
    compImg.setAttribute("src","Assets/images/rock.png");
  }else if(rand==2){
    compImg.setAttribute("src","Assets/images/paper.JPG");
  }else if(rand==3){
    compImg.setAttribute("src","Assets/images/scissors.png");
  }
  return rand;
}

function findWinner(user,comp){
  //0-draw,1-computer,2-Player
  let win=-1;
  if(user==1){
   if(comp==1){
     win=0;
   }else if(comp==2){
     win=1;
   }else if(comp==3){
     win=2;
   }
  }else if(user==2){
    if(comp==1){
      win=2;
    }else if(comp==2){
      win=0;
    }else if(comp==3){
      win=1;
    }
  }else if(user==3){
    if(comp==1){
      win=1;
    }else if(comp==2){
      win=2;
    }else if(comp==3){
      win=0;
    }
  }
  if(win==0){
    output.forEach((result)=>{
      result.innerHTML=`<h2 class="choose">It's a Draw!</h2>`;
    });
  }else if(win==1){
    output.forEach((result)=>{
      result.innerHTML=`<h2 class="choose">Computer won</h2>`;
    });
  }else if(win==2){
    output.forEach((result)=>{
      result.innerHTML=`<h2 class="choose">You won</h2>`;
    });
  }
  return win;
}

function trackScore(win){
  if(win==1){
    compScore++;
    compScoreBoard.forEach((instance)=>{
      instance.innerHTML=`<span class="compScore">${compScore}</span>`;
    });
  }else  if(win==2){
    userScore++;
    userScoreBoard.forEach((instance)=>{
      instance.innerHTML=`<span class="userScore">${userScore}</span>`;
    });
  }
}