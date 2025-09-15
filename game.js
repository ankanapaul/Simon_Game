var gamePattern=[]
var userClickedPattern=[]
var buttonColours=["red", "blue", "green", "yellow"]
var level=0
let firstKeyPressDetected = false; 
function nextSequence(){
    $("h1").text("Level "+(level+1))
   var randomNumber=Math.floor(Math.random()*4)
   var randomChosenColour=buttonColours[randomNumber]
   gamePattern.push(randomChosenColour)
    level+=1
   $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour)
   console.log(randomChosenColour)
}
$(".btn").click(function() {
    var userChosenColour=$(this).attr('id')
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1)
});
function playSound(name){
var audio = new Audio("./sounds/"+name+".mp3");
    audio.play()
}
function animatePress(currentColour){
$("#"+currentColour).addClass("pressed")
setTimeout(function() {
       $("#"+currentColour).removeClass("pressed");
   }, 100);
}
$(document).on('keypress', function(event) {
if (!firstKeyPressDetected) {
nextSequence()      
firstKeyPressDetected = true; 
}
})
function checkAnswer(currentLevel){
if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
    console.log("success")
}
else{
   var audio = new Audio("./sounds/wrong.mp3");
    audio.play() 
    $("body").addClass("game-over")
setTimeout(function() {
       $("body").removeClass("game-over");
   }, 200);
$("h1").text("Game Over, Press Any Key to Restart")
startOver()
}
if(level-1 ===currentLevel){
    userClickedPattern=[]
    setTimeout(function() {
    nextSequence()}, 1000);
}
}
function startOver(){
level=0
firstKeyPressDetected=false
gamePattern=[]
userClickedPattern=[]
}