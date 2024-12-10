export class Question {

    /**
     * Class for a single question of a quiz
     * @param {string} question - The question
     * @param {string[]} answers - Array of answers
     * @param {int} correct - Index of the correct answer
     */
    constructor(question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;

        this.randomizeAnswers();
    }

    /**
     * Randomizes the index of the answers array
     */
    randomizeAnswers() {
        this.randomAnswers = this.answers.slice();
        this.randomAnswers.sort(() => Math.random() - 0.5);
        this.correct = this.randomAnswers.indexOf(this.answers[this.correct]);
    }

    /**
     * Generates the HTML to display the question and answers
     * @returns {string} - Returns generated HTML including the question and answer with radio buttons
     */
    generateHTML() {
        let questionForm = document.createElement("form");
        questionForm.classList.add("qForm");
        questionForm.classList.add("container");
        
        let questionText = document.createElement("p");
        questionText.innerHTML = this.question;
        questionText.classList.add("question");
        questionForm.appendChild(questionText);

        for(let i = 0; i < this.answers.length; i++) {
            let answer = this.randomAnswers[i];
            let answerLabel = document.createElement("label");
            let answerInput = document.createElement("input");

            answerInput.type = "radio";
            answerInput.name = "answer";
            answerInput.value = answer;
            answerInput.dataset.index = i;
            answerInput.required = true;

            answerLabel.classList.add("answer");

            answerLabel.appendChild(answerInput);
            answerLabel.appendChild(document.createTextNode(answer))

            questionForm.appendChild(answerLabel);
            questionForm.appendChild(document.createElement("br"));
        }

        return questionForm;
    }

    /**
     * Checks to see if the selected index is the correct index
     * @param {string} answer - String of the selected answer
     * @returns {boolean} - Returns true if answer is correct, false if not
     */
    checkAnswer(answer) {
        if (this.randomAnswers[this.correct] === this.randomAnswers[this.randomAnswers.indexOf(answer)])
        {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 
     * @returns the correct answer
     */
    getCorrect() {
        return this.randomAnswers[this.correct];
    }
}