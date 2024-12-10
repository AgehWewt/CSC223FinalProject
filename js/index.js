import { Question } from "./questions.js";

let questionsArray = new Array();
let quizElement = document.getElementById("quiz-container");
let startButton = document.getElementById("quiz-start")
let submitButton = document.getElementById("answer-submit");
let nextButton = document.getElementById("next-button");
let retryButton = document.getElementById("retry");

let progress = document.getElementById("progress");

let questionIndex = 0;
let numCorrect = 0;
let personalBest = 0;
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

    if (document.cookie) {
        let fields = {};
        let cookieList = document.cookie.split("; ");
        for (let items of cookieList) {
            let cookie = items.split("=");
            let name = cookie[0];
            let value = cookie[1];
            fields[name] = value;
        }
        personalBest = fields.pb;

        progress.innerHTML = "Personal best: " + personalBest + "/" + questionsArray.length;
    }
}

/**
 * Initializes the quiz by putting the first question and answers in the DOM
*/
startButton.onclick = () => {
    questionIndex = 0;
    numCorrect = 0;
    progress.hidden = false;

    startButton.hidden = true;
    submitButton.hidden = false;
    quizElement.appendChild(questionsArray[questionIndex].generateHTML());
    progress.innerHTML = (questionIndex + 1) + "/" + questionsArray.length;

}

/**
 * Checks the answer and then replaces the current question with the next question
 */
submitButton.onclick = () => {
    if (!document.querySelector('input[name="answer"]:checked')) {
        alert("Please select an option.");
        return;
    }

    let answers = document.querySelectorAll('input[name="answer"]');
    let correct = questionsArray[questionIndex].getCorrect();

    answers.forEach((answer) => {
        if (answer.value === correct) {
            answer.parentElement.classList.add("correct");
            if (answer.checked) {
                numCorrect++;
            }
        } else {
            answer.parentElement.classList.add("incorrect");
        }

    });

    submitButton.hidden = true;
    nextButton.hidden = false;

    
}

nextButton.onclick = () => {
    
    questionIndex++;
    
    
    progress.innerHTML = (questionIndex + 1) + "/" + questionsArray.length;
    
    quizElement.removeChild(document.getElementsByClassName("qForm")[0]);

    if (questionIndex >= questionsArray.length) {
        generateResults();
        return;
    }
    quizElement.appendChild(questionsArray[questionIndex].generateHTML());

    nextButton.hidden = true;
    submitButton.hidden = false;
}

retryButton.onclick = () => {
    for (let ele of quizElement.children) {
        quizElement.removeChild(ele);
    }

    retryButton.hidden = true;
    startButton.click();
}

function generateResults() {
    nextButton.hidden = true;
    progress.hidden = true;

    
    let results = document.createElement("div");
    results.className = "results";
    
    let numCorrectText = document.createElement("h3");
    numCorrectText.innerHTML = "You got " + numCorrect + "/" + questionsArray.length + " correct!";
    
    
    if (document.cookie) {
        let fields = {};
        let cookieList = document.cookie.split("; ");
        for (let items of cookieList) {
            let cookie = items.split("=");
            let name = cookie[0];
            let value = cookie[1];
            fields[name] = value;
        }

        if (fields.pb > numCorrect) {
            // if previous best is higher than current
            numCorrectText.innerHTML += "\nPrevious best: " + fields.pb;
        } else {
            let maxAge = 60 * 60 * 24 * 10;

            numCorrectText.innerHTML += "\nNew personal best!";
            document.cookie = `pb=${numCorrect}` + `;max-age=${maxAge}`;
            // save correct in cookie
        }
    } else {
        // else generate cookie
        numCorrectText.innerHTML += "\nNew personal best!";

        let maxAge = 60 * 60 * 24 * 10;

        document.cookie = `pb=${numCorrect}` + `;max-age=${maxAge}`;
    }
    
    
    results.appendChild(numCorrectText);
    quizElement.appendChild(results);

    retryButton.hidden = false;
}