import { Question } from "./questions.js";

let questionsArray = new Array();
let quizElement = document.getElementById("quiz-container");
let startButton = document.getElementById("quiz-start")
let questionIndex = 0;

fetch("./assets/questions.json")
.then(response => response.json())
.then(json => {
    let questions = json.questions;
    setupQuiz(questions);
})
.catch(err => console.log(err));

function setupQuiz(questions) {
    for (let i = 0; i < questions.length; i++)
    {
        questionsArray[i] = new Question(questions[i].question, questions[i].answers, questions[i].correct);
    }
    questionsArray.sort(() => Math.random() - 0.5);
}

startButton.onclick = () => {
    if (document.getElementsByClassName("question")[0]) {
        quizElement.removeChild(document.getElementsByClassName("question")[0]);
    }
    quizElement.appendChild(questionsArray[questionIndex].generateHTML());
    questionIndex++;
}