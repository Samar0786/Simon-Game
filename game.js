
var gamePattern = [];
var userClickedPattern = [];
var gameStarted=true;
var level=0;
function playSound(name) {
    var audio =new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

$(".btn").on("click",function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length) {
           setTimeout(function(){
              nextSequence()
           },1000);
        }
    }
    else {
       setTimeout(function() {playSound("wrong")},300);
       $("body").addClass("game-over");
       $("#level-title").text("Game Over, Press Any Key to Restart");
       setTimeout(function() { 
       $("body").removeClass("game-over");
       },300);
       startOver();   
    }
  }

function nextSequence () {
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var buttonColour = ["red","blue","green","yellow"];
    var randomVar = Math.floor(Math.random()*4);;
    var randcolour = buttonColour[randomVar];
    gamePattern.push(randcolour);
    $("#"+randcolour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randcolour);
    
}

$(document).on("keydown",function(){
    if(gameStarted===true){
    nextSequence();}
    gameStarted=false;
});

function startOver(){
    gamePattern=[];
    userClickedPattern=[];
    gameStarted=true;
    level = 0;
}

// $(".btn").on("click",function(){
//     var btnn = this.id;
//     $("#"+btnn).fadeIn(100).fadeOut(100).fadeIn(100);
//     var audio =new Audio("sounds/"+btnn+".mp3");
//     audio.play();
// });
