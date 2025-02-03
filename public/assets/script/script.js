let holder;
let currentBalance = 20;
let balanceText;

function placeBet(){
    holder.innerHTML = "";
    let input = document.createElement("input")
    
    let btn = makeBtn("bet");
    btn.addEventListener("click", function(){
    let bet = Number(input.value);
        if(isNaN(bet)){
            return
        }else if(bet > currentBalance) {
            return
        }else {
            startGame(Number(input.value))
        }
    });

    holder.append(btn)
    holder.append(input)
}


function startGame(bet){
    currentBalance -= bet;
    balanceText.innerText = "Current balance: " + currentBalance;

    holder.innerHTML = "";
    let heads = makeBtn("heads");
    heads.addEventListener("click", function(){
        afterGame("heads", bet);
    });

    let tails = makeBtn("tails");
    tails.addEventListener("click", function(){
        afterGame("tails", bet);
    });


}

function makeBtn(string, bet){
    var btn = document.createElement("button");
    btn.innerText = string;
    holder.appendChild(btn);
    return btn;
}

function flip(choice){
    let win = true
    let output = choice
    if(Math.random() > 0.29){
        win = false;
        if(choice == "heads"){
            output = "tails";
        }else {
            output = "heads"
        }
    }
    return {
        status: win,
        side: output
    }

}


async function afterGame(choice, bet){
    let text;
    let results = await callGame(choice, bet);
    console.log(results)
    currentBalance = results.funds;

    balanceText.innerText = "Current balance: " + currentBalance;


    holder.innerHTML = "";
    let img = document.createElement("img");
    let btn = makeBtn("Play again")
    btn.addEventListener("click",function(){
        if(isNaN(bet)){
            return
        }else if(bet > currentBalance) {
            return
        }else {
            startGame(bet);
        }
        
    })

    let Betbtn = makeBtn("Place bet")
    Betbtn.addEventListener("click",function(){
    placeBet()
    })

    img.src = results.side + ".png";
    let textEl = document.createElement("h2");
    textEl.innerText = text;
    holder.append(textEl)
    holder.append(img)
}

async function callGame(choice, bet) {
    let info = {
        "choise": choice,
        "bet": bet
    };
    let res = await fetch('/games/Coinflip', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
    });

    let results = await res.json();  
    return results.game;
   
}


document.addEventListener("DOMContentLoaded", function(){
    holder = document.getElementById("game");
    balanceText = document.createElement("h2");
    balanceText.innerText = "Current balance: " + currentBalance;
    document.querySelector("body").prepend(balanceText)
    placeBet() 
})




