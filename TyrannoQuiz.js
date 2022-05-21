import Root from "./src/Root.js";
import Page from "./src/Page.js";
import Quiz from "./src/Quiz.js";
import Question from "./src/Question.js";
import Choice from "./src/Choice.js";
import Choices from "./src/Choices.js";


let question = new Question();
question.setText("1형식에 대한 설명으로 옳은 것을 고르시오.");

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

let root = new Root(document.getElementById('root'));
root.appendChild('page', page);
