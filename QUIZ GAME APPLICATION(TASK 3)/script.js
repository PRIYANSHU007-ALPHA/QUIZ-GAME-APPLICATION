const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Paris", "Berlin", "Madrid"],
        correctAnswer: 1,
        type: "single"
    },
    {
        question: "Which programming languages are object-oriented? (Select all that apply)",
        options: ["Java", "Python", "C++", "JavaScript"],
        correctAnswer: [0, 1, 2, 3],
        type: "multiple"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Mars", "Jupiter", "Saturn", "Neptune"],
        correctAnswer: 1,
        type: "single"
    },
    {
        question: "Which of these are primary colors? (Select all that apply)",
        options: ["Red", "Green", "Blue", "Yellow", "Purple"],
        correctAnswer: [0, 2, 3],
        type: "multiple"
    },
    {
        question: "What is the chemical symbol for Gold?",
        options: ["Ag", "Au", "Fe", "Cu"],
        correctAnswer: 1,
        type: "single"
    },
    {
        question: "Which of these animals are mammals? (Select all that apply)",
        options: ["Dolphin", "Shark", "Whale", "Octopus"],
        correctAnswer: [0, 2],
        type: "multiple"
    },
    {
        question: "What is the square root of 144?",
        options: ["10", "12", "14", "16"],
        correctAnswer: 1,
        type: "single"
    },
    {
        question: "Select all even numbers:",
        options: ["2", "3", "4", "6", "7", "8"],
        correctAnswer: [0, 2, 3, 5],
        type: "multiple"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctAnswer: 1,
        type: "single"
    },
    {
        question: "Which continents are in the Southern Hemisphere? (Select all that apply)",
        options: ["Africa", "South America", "Australia", "Europe"],
        correctAnswer: [0, 1, 2],
        type: "multiple"
    }
];

class QuizGame {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.timeLeft = 60;
        this.timer = null;
        this.selectedAnswers = new Set();

        this.initializeElements();
        this.addEventListeners();
    }

    initializeElements() {
        this.startScreen = document.getElementById('start-screen');
        this.quizScreen = document.getElementById('quiz-screen');
        this.resultScreen = document.getElementById('result-screen');
        this.questionText = document.getElementById('question-text');
        this.optionsContainer = document.getElementById('options-container');
        this.timeDisplay = document.getElementById('time');
        this.currentQuestionDisplay = document.getElementById('current');
        this.totalQuestionsDisplay = document.getElementById('total');
        this.scoreDisplay = document.getElementById('score-display');
        this.percentageDisplay = document.getElementById('percentage-display');

        this.totalQuestionsDisplay.textContent = questions.length;
    }

    addEventListeners() {
        document.getElementById('start-btn').addEventListener('click', () => this.startQuiz());
        document.getElementById('submit-btn').addEventListener('click', () => this.submitAnswer());
        document.getElementById('restart-btn').addEventListener('click', () => this.restartQuiz());
    }

    startQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.startScreen.classList.add('hidden');
        this.quizScreen.classList.remove('hidden');
        this.loadQuestion();
        this.startTimer();
    }

    loadQuestion() {
        const question = questions[this.currentQuestion];
        this.questionText.textContent = question.question;
        this.currentQuestionDisplay.textContent = this.currentQuestion + 1;
        this.selectedAnswers.clear();
        
        this.optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            optionDiv.textContent = option;
            optionDiv.addEventListener('click', () => this.selectOption(index, question.type));
            this.optionsContainer.appendChild(optionDiv);
        });
    }

    selectOption(index, type) {
        const options = this.optionsContainer.children;
        
        if (type === 'single') {
            this.selectedAnswers.clear();
            Array.from(options).forEach(option => option.classList.remove('selected'));
            options[index].classList.add('selected');
            this.selectedAnswers.add(index);
        } else {
            options[index].classList.toggle('selected');
            if (this.selectedAnswers.has(index)) {
                this.selectedAnswers.delete(index);
            } else {
                this.selectedAnswers.add(index);
            }
        }
    }

    submitAnswer() {
        const question = questions[this.currentQuestion];
        let correct = false;

        if (question.type === 'single') {
            correct = this.selectedAnswers.has(question.correctAnswer);
        } else {
            const correctSet = new Set(question.correctAnswer);
            correct = this.selectedAnswers.size === correctSet.size && 
                     [...this.selectedAnswers].every(answer => correctSet.has(answer));
        }

        if (correct) this.score++;

        if (this.currentQuestion < questions.length - 1) {
            this.currentQuestion++;
            this.loadQuestion();
        } else {
            this.endQuiz();
        }
    }

    startTimer() {
        this.timeLeft = 60;
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.timeDisplay.textContent = this.timeLeft;
            if (this.timeLeft <= 0) {
                this.endQuiz();
            }
        }, 1000);
    }

    endQuiz() {
        clearInterval(this.timer);
        this.quizScreen.classList.add('hidden');
        this.resultScreen.classList.remove('hidden');
        
        const percentage = (this.score / questions.length) * 100;
        this.scoreDisplay.textContent = `Score: ${this.score}/${questions.length}`;
        this.percentageDisplay.textContent = `Percentage: ${percentage.toFixed(2)}%`;
    }

    restartQuiz() {
        this.resultScreen.classList.add('hidden');
        this.startQuiz();
    }
}

// Initialize the quiz when the page loads
window.addEventListener('load', () => {
    new QuizGame();
});