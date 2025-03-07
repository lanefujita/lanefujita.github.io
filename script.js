let charArr = ["a","b","¾","¿","×","¸","$","2","§","™","¤","▒","┌","é","z","ü","º","¥","¬","π","æ","¹"]
let wordArr = ["dreaming","thinking","making","doing","researching","learning","seeking","writing","coding","inventing","drawing","running","visualizing","iterating","reading","designing","exploring","traveling","connecting"]
let running = true
let marqueeText = ""

const cursorElement = document.getElementById("cursor")
const prefixElement = document.getElementById("prefix")
const marqueeOutput = document.getElementById("marqueeOutput")

function updateCursor(s){
  cursorElement.textContent=s
}
function runCursor(){
  let randomChar = pickRandomFromArr(charArr)
  updateCursor(randomChar)
}

function shuffleArr(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements at index i and j
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function clearMarquee(){
    marqueeOutput.textContent = ""
//  while (marqueeText.length >0 && running){
//    marqueeText=marqueeText.slice(0,-1)
//    marqueeOutput.textContent = marqueeText
//    await delay(22)
//  }
  //prefixElement.classList.toggle("budge");
  //await delay(1000)
  //prefixElement.classList.toggle("budge");
  console.log("Cleared")
}

async function populateMarquee(word){
  for(const character of word){
    if(!running) return  
    const span = document.createElement("span")
    span.className="character"
    span.textContent=character
    marqueeOutput.appendChild(span)
    marqueeText += character
    let delayTime = Math.random()*750+100
    await delay(delayTime)
  }
}

function pickRandomFromArr(arr){
  return arr[Math.floor(Math.random()*arr.length)]
}

//Populate word letter by letter
async function startMarquee(){
  while(running){
    for(let i = 0; i < wordArr.length-1; i++){
      //1. Iterate on next word
      const currentWord = wordArr[i] + "..." 
      //2. Write to marquee 
      cursorElement.classList.toggle("active");
      await delay(400)
      await populateMarquee(currentWord)
      await delay(200)
      //3. Wait, then loop
      cursorElement.classList.toggle("active");
      await delay(6000)
      //4. Clear marquee
      await clearMarquee()
      await delay(500)
    }
  }
}

//Initialize
function init(){
  wordArr = shuffleArr(wordArr)
  console.clear()
  startMarquee()
  setInterval(runCursor,50)
}

init()
