import Root from "./src/Root.js";
import Page from "./src/Page.js";
import Quiz from "./src/Quiz.js";
import Question from "./src/Question.js";
import Choice from "./src/Choice.js";
import Choices from "./src/Choices.js";
import Button from "./src/Button.js";
import Image from "./src/Image.js";
import Progress from "./src/Progress.js";
import ImageLoader from "./src/ImageLoader.js";
import RealtimeScore from "./src/RealtimeScore.js";
import FinalScore from "./src/FinalScore.js";


let final_score = new FinalScore();
final_score.setZero();
final_score.adjustFontSize();

let realtime_score = new RealtimeScore();
realtime_score.setZero();

let progress = new Progress();
progress.setZero();

let question = new Question();
question.setText("다음 중 a에 해당하는 글자를 고르시오");


let choice0 = new Image();
let choice1 = new Image();

let correct = new Image();
correct.setSrc("./img/correct.png");
correct.setInvisible();

let wrong = new Image();
wrong.setSrc("./img/wrong.png");
wrong.setInvisible();

let quiz = new Quiz();
quiz.appendChild('realtime_score', realtime_score);
quiz.appendChild('progress', progress);
quiz.appendChild('question', question);


let page = new Page();
page.setBackgroundImage('./img/craftpix-00711-free-beach-2d-game-backgrounds/PNG/game_background_1/game_background_1.png');


let button = new Button();
button.setText("START");


let root = new Root(document.getElementById('root'));
root.appendChild('page', page);
root.appendChild('start', button);
root.appendChild('correct', correct);
root.appendChild('wrong', wrong);


let answerCnt = 0;

function handleCharacteristicValueChanged(event) {
    let value = event.target.value.getUint8(0);
    console.log(value);
    switch (value) {
        case 49:
            let correct = new Image();
            correct.setSrc("./img/correct.png");
            let id = 'answer' + answerCnt;
            root.appendChild(id, correct);
            setTimeout(() => { root.deleteChild(id); }, 500);
            break;
        case 50:
            //root.appendChild('answer', wrong);
            break;
        case 48:
            //root.deleteChild('answer');
            break;
    }
    answerCnt++;
}


function searchBLE() {
    navigator.bluetooth.requestDevice({acceptAllDevices:true})
    .then(device => {
        return device.gatt.connect();
    }).then(server => {
        return server.getPrimaryService(0xFFE0);
    }).then(service => {
        return service.getCharacteristic(0xFFE1);
    }).then(characteristic => {
        return characteristic.startNotifications();
    }).then(characteristic => {
        characteristic.addEventListener('characteristicvaluechanged', handleCharacteristicValueChanged);
        console.log('Notifications have been started.');
    }).catch(error => { console.error(error); });
}


function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}


let correctChoices = [0, 1, 2];
let wrongChoices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const cartesian = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));
let cases = cartesian(correctChoices, wrongChoices);
shuffle(cases);
let total = cases.length;

let imageLoader = new ImageLoader();
imageLoader.addCases(cases);

//imageLoader.popCase();
//setTimeout(() => { imageLoader.popCase(); }, 1000);


let caseIdx = 0;
let answerIdx = 0;

let temp_size = 30;

let correctCount = 0;

function nextCase() {
    let choices = imageLoader.popCase();
    if (choices == null)
        return false;
 
    //console.log(choices.correct.m_objImage.img.src);
    //console.log(choices.wrong.m_objImage.img.src);
    //console.log(imageLoader.m_imageQueue);
    
    quiz.deleteChild("choice0");
    quiz.deleteChild("choice1");
    
    choice0 = choices.correct;
    choice1 = choices.wrong;
    
    quiz.appendChild("choice0", choice0);
    quiz.appendChild("choice1", choice1);

    //choice0.setSrc("./img/choices/1.correct." + cases[caseIdx][0] + ".png");
    //choice1.setSrc("./img/choices/1.wrong." + cases[caseIdx][1] + ".png");

    answerIdx = Math.round(Math.random());
    if(answerIdx == 0) {
        choice0.setHeight(temp_size);
        choice0.setPosition(-15, 0);
        choice1.setHeight(temp_size);
        choice1.setPosition(15, 0);
    } else {
        choice0.setHeight(temp_size);
        choice0.setPosition(15, 0);
        choice1.setHeight(temp_size);
        choice1.setPosition(-15, 0);
    }

    caseIdx++;
    return true;
}


function waitKeyDown() {
    choice0.setVisible();
    choice1.setVisible();
    window.addEventListener("keydown", chooseAnswer);
}


let stateKeyUp = true;

function setKeyUp() {
    stateKeyUp = true;
}

let timeStart = 0;

function waitKeyUp() {
    let timeElapsed = new Date();
    timeElapsed -= timeStart;
    if (stateKeyUp) // || timeElapsed > 1000)
        waitKeyDown();
    else
        setTimeout(waitKeyUp, 100); 
}

function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

let currentScore = 0;
let targetScore = 0;
function animateScore() {
    final_score.setScore(currentScore);
    if (currentScore == targetScore) return;
    currentScore += 1;
    setTimeout(animateScore, 10);
}

function chooseAnswer(e) {
    if (e.keyCode != 48 && e.keyCode != 49) return;
    //console.log(e.keyCode);
    //console.log(answerIdx);
    window.removeEventListener("keydown", chooseAnswer);
    stateKeyUp = false;
    window.addEventListener("keyup", setKeyUp);

    if((e.keyCode == 49 && answerIdx == 0) || (e.keyCode == 48 && answerIdx == 1)) {
        correct.setVisible();
        realtime_score.addScore(10);
    }
    else {
        wrong.setVisible();
    }
    setTimeout(() => {
        correct.setInvisible();
        wrong.setInvisible();
        choice0.setInvisible();
        choice1.setInvisible();
        
        progress.setProgress(caseIdx, total);
        if (caseIdx == total) {
            //alert('끝.. 다음 문제 또는 스코어 표시');
            quiz.appendChild('final_score', final_score);
            //final_score.setScore(realtime_score.m_nScore);
            //console.log(realtime_score.m_nScore);
            
            currentScore = 0;
            targetScore = realtime_score.m_nScore;
            animateScore();
            
            return;
        }  

        while (!nextCase());
        //nextCase();
        
        timeStart = new Date();
        waitKeyUp();
    }, 500);
}


function removeQuestion() {
    quiz.deleteChild('question');

    quiz.appendChild('choice0', choice0);
    quiz.appendChild('choice1', choice1);

    while (!nextCase());
    setTimeout(waitKeyDown, 300);
}


function clickStart() {
    //searchBLE();

    progress.setProgress(0, total);
    realtime_score.setScore(0);
    root.deleteChild('start');
    page.appendChild('quiz', quiz);
    question.adjustFontSize();
    progress.adjustFontSize();
    realtime_score.adjustFontSize();
    
    window.removeEventListener("keyup", clickStart);

    setTimeout(() => {
        removeQuestion();
    }, 2000);
}

// 스토리 좀 짜보자.
button.setAction("click", clickStart);
window.addEventListener("keyup", clickStart);
