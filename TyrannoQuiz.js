import Root from "./src/Root.js";
import Page from "./src/Page.js";
import Quiz from "./src/Quiz.js";
import Question from "./src/Question.js";
import Choice from "./src/Choice.js";
import Choices from "./src/Choices.js";
import Button from "./src/Button.js";
import Image from "./src/Image.js";


let question = new Question();
question.setText("1형식에 대한 설명으로 옳지 <u>않은</u> 것을 고르시오.");

let choice1 = new Choice();
choice1.setText("주어자리에는 명사가 들어간다");
let choice2 = new Choice();
choice2.setText("S Vi의 모양을 가진다");
let choice3 = new Choice();
choice3.setText("동사 뒤에는 아무것도 나올 수 없다");
let choice4 = new Choice();
choice4.setText("1형식 문장에서 부사가 사용되어 문장이 길어질 수 있다");
let choice5 = new Choice();
choice5.setText("모르겠어요");

let choices = new Choices();
choices.appendChild('choice1', choice1);
choices.appendChild('choice2', choice2);
choices.appendChild('choice3', choice3);
choices.appendChild('choice4', choice4);
choices.appendChild('choice5', choice5);

let quiz = new Quiz();
quiz.appendChild('question', question);
quiz.appendChild('choices', choices);

let page = new Page();
page.appendChild('quiz', quiz);
page.setBackgroundImage('./img/craftpix-00711-free-beach-2d-game-backgrounds/PNG/game_background_1/game_background_1.png');


let correct = new Image();
correct.setSrc("./img/correct.png");
let wrong = new Image();
wrong.setSrc("./img/wrong.png");

let button = new Button();
button.setText("START");

let root = new Root(document.getElementById('root'));
root.appendChild('page', page);
root.appendChild('start', button);

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
            setTimeout(() => { root.deleteChild(id); }, 1000);
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
function clickStart() {
    searchBLE();
    root.deleteChild('start');
}
button.setAction("click", clickStart);
