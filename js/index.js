import { Question } from "./questions.js";

let questionsArray = new Array();
let quizElement = document.getElementById("quiz-container");
let startButton = document.getElementById("quiz-start")
let nextButton = document.getElementById("answer-submit");
let questionIndex = 0;

/**
 * Gets the questions from questions.json and sets up the quiz
 */
fetch("./assets/questions.json")
.then(response => response.json())
.then(json => {
    let questions = json.questions;
    setupQuiz(questions);
})
.catch(err => console.log(err));

/**
 * Builds an array of Question objects with all the data passed as the arg
 * @param {string[]} questions - Array of questions, answers, and index of the correct answer
 */
function setupQuiz(questions) {
    for (let i = 0; i < questions.length; i++)
    {
        questionsArray[i] = new Question(questions[i].question, questions[i].answers, questions[i].correct);
        questionsArray.sort(() => Math.random() - 0.5);
    }
    questionsArray.sort(() => Math.random() - 0.5);
}

/**
 * Initializes the quiz by putting the first question and answers in the DOM
 */
startButton.onclick = () => {
    startButton.hidden = true;
    nextButton.hidden = false;
    quizElement.appendChild(questionsArray[questionIndex].generateHTML());
}

/**
 * Checks the answer and then replaces the current question with the next question
 */
nextButton.onclick = () => {
    // TODO: check if current selected answer is correct
    let answers = document.querySelectorAll('input[name="answer"]');
    for (let answer of answers) {
        if (answer.checked) {
            if (questionsArray[questionIndex].checkAnswer(answer.value)) {
                // If the answer is correct
                quizElement.removeChild(document.getElementsByClassName("question")[0]);
                console.log("correct");
                questionIndex++;
                quizElement.appendChild(questionsArray[questionIndex].generateHTML());
            } else {
                // If the answer is incorrect
                console.log("incorrect");
            }
        }
    }   
}
