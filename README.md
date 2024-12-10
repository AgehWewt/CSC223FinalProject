# CSC223 Final Project
### Kendall Daniels

## Process
I started off with the logic, you can't start building a house with the roof.\
I figured it would be best to have a Question class that held a question and the answers, and had methods related to that. The class has a method to generate the HTML and a method to check if the given answer is correct.\
I moved onto actually creating basic functionality with the quiz, like hitting a button to load the next question. (looking at the commits, I definitely implemented quiz functionality)\
One of the last things I added was cookies, the quiz needed to work fully before that mattered, and of course the styling wasn't very important until the end.\
I think the style is simple but not too dull.

## Snippets
#### Questions and answers are shuffled in the same way to vary the quiz every time
```
randomizeAnswers() {
        this.randomAnswers = this.answers.slice();
        this.randomAnswers.sort(() => Math.random() - 0.5);
        this.correct = this.randomAnswers.indexOf(this.answers[this.correct]);
}
```

#### Removing the current HTML object holding the question and answers and replacing with a new one
```
    quizElement.removeChild(document.getElementsByClassName("qForm")[0]);
    quizElement.appendChild(questionsArray[questionIndex].generateHTML());
```

## Key functionalities
* The quiz will remember your personal best for 10 days (I think that's how long I set it for)
* The questions can very easily be added to and the quiz would scale to that dynamically
* Questions and answers are shuffled everytime the user goes through it, making it feel new
