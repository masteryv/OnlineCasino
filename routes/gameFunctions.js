const flip = async function flip(){
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


module.exports = {
flip: flip
}