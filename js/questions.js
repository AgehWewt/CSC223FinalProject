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
        let questionDiv = document.createElement("div");
        questionDiv.className = "question";

        let questionText = document.createElement("p");
        questionText.innerHTML = this.question;
        questionDiv.appendChild(questionText);

        for(let i = 0; i < this.answers.length; i++) {
            let answer = this.randomAnswers[i];
            let answerLabel = document.createElement("label");
            let answerInput = document.createElement("input");

            answerInput.type = "radio";
            answerInput.name = "answer";
            answerInput.value = answer;
            answerInput.dataset.index = i;
            if (i === 0) {
                answerInput.required = true;
            }

            answerLabel.appendChild(answerInput);
            answerLabel.appendChild(document.createTextNode(answer))

            questionDiv.appendChild(answerLabel);
            questionDiv.appendChild(document.createElement("br"));
        }

        let submitButton = document.createElement("input");
        submitButton.type = "button";
        submitButton.name = "submit";
        submitButton.value = "Submit";
        questionDiv.appendChild(submitButton);

        return questionDiv;
    }

    /**
     * Checks to see if the selected index is the correct index
     * @param {int} index - Index of the selected answer
     * @returns {boolean} - Returns true if answer is correct, false if not
     */
    checkAnswer(index) {
        if (this.randomAnswers[this.correct] === this.randomAnswers[index])
        {
            return true;
        } else {
            return false;
        }
    }
}