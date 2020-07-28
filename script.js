var optionA= document.querySelector("#a");
var optionB= document.querySelector("#b");
var optionC= document.querySelector("#c");
var optionD= document.querySelector("#d");
var choices=document.querySelector("#hide");
var startButton= document.querySelector("#startButton");
var questionBox= document.querySelector("#question");
var answerBox= document.querySelector("#answer");
var timer= document.querySelector("#timeLeft");
var secondsLeft=parseInt(timer.textContent);
var quiz=document.querySelector("#quiz");
//start questionNum as -1 so answer buttons won't do anything
var questionNum=-1;
var numCorrect=0;
var score=0;

var highScoreArray=JSON.parse(localStorage.getItem("highScore"));
if (highScoreArray=== null){
    highScoreArray =[];
}
//putting all the questions into an array of objects
var questions=[{"qType":"multi","q": "How many championships did Michael Jordan win?", "a":"4", "b":"5", "c":"6", "d":"7", "correct":"c"}]
questions.push({"qType":"tf","q":"True/False: A shot from further than half court counts for 4 points?", "a": "True", "b":"False", "correct":"b"})
questions.push({"qType":"multi","q":"Who holds the NBA record for most points in a game with 100?", "a": "Wilt Chamberlain", "b":"Magic Johnson", "c": "Kobe Bryant", "d": "Larry Bird", "correct":"a"})
questions.push({"qType":"multi","q":"Which of these players was drafted #1 overall?", "a": "Kevin Durant", "b":"Giannis Antetokuonmpo", "c": "Steph Curry", "d": "LeBron James", "correct":"d"})
questions.push({"qType":"multi","q":"Which of these teams plays in the Western conference?", "a": "Milwaukee Bucks", "b":"Oklahoma City Thunder", "c": "Chicago Bulls", "d": "Indiana Pacers", "correct":"b"})
questions.push({"qType":"multi","q":"Where did the Lakers originally play?", "a": "Salt Lake City", "b":"San Diego", "c": "Minneapolis", "d": "Chicago", "correct":"c"})
questions.push({"qType":"multi","q":"What team won the first March madness?", "a": "Oregon", "b":"Kansas", "c": "Princeton", "d": "UCLA", "correct":"a"})
questions.push({"qType":"multi","q":"What player won the most MVP awards?", "a": "Michael Jordan", "b":"LeBron James", "c": "Kareem Abdul-Jabbar", "d": "Bill Russell", "correct":"c"})
questions.push({"qType":"tf","q":"True/False: The Golden State Warriors lost the 2016 NBA finals despite leading 3 games to 1?", "a": "True", "b":"False", "correct":"a"})
questions.push({"qType":"multi","q":"Which of these teams has not won a championship in the 21st century?", "a": "Dallas Mavericks", "b":"Houston Rockets", "c": "Detroit Pistons", "d": "Boston Celtics", "correct":"b"})
//loads the first question
startButton.addEventListener("click", function(){
    choices.setAttribute("style","visibility:visble");
    timer.textContent="60"
    // questionBox.textContent=questions[questionNum].q;
    // optionA.textContent=questions[questionNum].a;
    // optionB.textContent=questions[questionNum].b;
    // optionC.textContent=questions[questionNum].c;
    // optionD.textContent=questions[questionNum].d;
    startButton.setAttribute("style","visibility:hidden");
    //need to add this here to set it to 60 if someone answers wrong in the first second.
    secondsLeft=parseInt(timer.textContent);
    countdown();
    nextQuestion();
})
function countdown(){
var timeInterval =setInterval(() => {
    
    if(secondsLeft <= 0){
        clearInterval(timeInterval);
        testDone();
    }
    else{
        secondsLeft=parseInt(timer.textContent)-1;
        timer.innerText=(secondsLeft);
    }
}, 1000);}

function nextQuestion(answer){
    if(answer==="correct"){
        numCorrect++;
    }
    else if(answer==="incorrect"){
        secondsLeft-=6;
        if(secondsLeft<0){
            secondsLeft=0;
        }
        timer.innerText=(secondsLeft);
    }
    if (questionNum === questions.length -1){
        score=secondsLeft;
        questionBox.textContent=(numCorrect + " correct out of "+questions.length);
        testDone();
        return;
    }
    questionNum++;
    questionBox.textContent=questions[questionNum].q;
    optionA.textContent=questions[questionNum].a;
    optionB.textContent=questions[questionNum].b;
    if(questions[questionNum].qType==="multi"){
        optionC.style.visibility="visible";
        optionD.style.visibility="visible";
        optionC.textContent=questions[questionNum].c;
        optionD.textContent=questions[questionNum].d;    

    }
    else{
        optionC.style.visibility="hidden";
        optionD.style.visibility="hidden";
    }
    answerBox.textContent=answer;
}

optionA.addEventListener("click", function(){
    if (questionNum >=0){
    if(questions[questionNum].correct === this.id){
        nextQuestion("correct");
    }
    else{
    nextQuestion("incorrect");}}
})
optionB.addEventListener("click", function(){
    if (questionNum >=0){
        if(questions[questionNum].correct === this.id){
            nextQuestion("correct");
        }
        else{
        nextQuestion("incorrect");}}
})
optionC.addEventListener("click", function(){
    if (questionNum >=0){
        if(questions[questionNum].correct === this.id){
            nextQuestion("correct");
        }
        else{
        nextQuestion("incorrect");}}
})
optionD.addEventListener("click", function(){
    if (questionNum >=0){
        if(questions[questionNum].correct === this.id){
            nextQuestion("correct");
        }
        else{
        nextQuestion("incorrect");}}
})

//when test is finished, this removes the question items 
function testDone(){
    quiz.innerHTML="";
    questionBox.textContent=(numCorrect + " correct out of "+questions.length +". Final score:"+ score);
    //creates input box
    var newDiv=document.createElement("div");
    newDiv.setAttribute("type","text");
    newDiv.className="input-group mb-3";
    newDiv.id="submitHigh";
    quiz.appendChild(newDiv);
    var highScoreInput=document.createElement("input");
    highScoreInput.className=("form-control")
    newDiv.appendChild(highScoreInput);
    var buttonDiv=document.createElement("div");
    buttonDiv.setAttribute("type","text");
    buttonDiv.className="input-group-prepend";
    newDiv.appendChild(buttonDiv);
    //creates submit button
    var submitInitials=document.createElement("button");
    submitInitials.className=("btn btn-outline-secondary")
    submitInitials.id="button-addon2";
    submitInitials.setAttribute("type","button");
    submitInitials.innerText="Submit Initials";
    buttonDiv.appendChild(submitInitials);
    
    submitInitials.addEventListener("click", function(event){
        event.preventDefault();
        let userInitials=highScoreInput.value;
        addHigh(userInitials, score);
    })

}

function addHigh(init, userScore){
    console.log(init + " " + userScore);
    quiz.innerHTML="<h2>High Scores:</h2>";
    if(highScoreArray===[]){
        highScoreArray.push({"initials":init,"score":userScore});}
    else{
        //insert into high score array so that array stays in order
        let arrayPos=highScoreArray.length;
        for (let i = 0; i < highScoreArray.length; i++) {
            let nextScore = highScoreArray[i].score;
            if(nextScore<userScore){
                arrayPos=i;
                break;
            }
        }
        highScoreArray.splice(arrayPos, 0,{"initials":init,"score":userScore})
    }
    for (let i = 0; i < highScoreArray.length; i++) {
        const nextScore = highScoreArray[i];
        let newDiv=document.createElement("div")
        newDiv.className="highScores";
        newDiv.innerHTML=("Rank: #"+(i+1) +"<br>Initials: "+nextScore.initials+"<br>" +" Score: "+nextScore.score);
        quiz.appendChild(newDiv);
        
    }
    
    localStorage.setItem("highScore",JSON.stringify(highScoreArray));
}
