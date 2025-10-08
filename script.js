// Dark/Light Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
    const modeToggle = document.getElementById('modeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the saved theme
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.classList.remove('dark-mode');
        modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Toggle theme on button click
    modeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
    
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.add('d-none');
            });
            
            // Show target section
            document.getElementById(targetId).classList.remove('d-none');
            
            // Update active nav link
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Phishing Demo Form
    const phishingForm = document.getElementById('phishingForm');
    if (phishingForm) {
        phishingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple validation for demonstration
            let hasError = false;
            
            if (!username) {
                document.getElementById('usernameError').classList.remove('d-none');
                hasError = true;
            } else {
                document.getElementById('usernameError').classList.add('d-none');
            }
            
            if (!password) {
                document.getElementById('passwordError').classList.remove('d-none');
                hasError = true;
            } else {
                document.getElementById('passwordError').classList.add('d-none');
            }
            
            if (!hasError) {
                // In a real educational demo, you would show what happens in a phishing attack
                alert('This is a demonstration. In a real phishing attack, your credentials would now be stolen. Always verify the legitimacy of login pages before entering information.');
                
                // Reset form
                phishingForm.reset();
            }
        });
    }
    
    // Quiz Functionality
// SIMPLE, ROBUST QUIZ IMPLEMENTATION
class Quiz {
    constructor() {
        this.currentQuestion = 0;
        this.totalQuestions = document.querySelectorAll('.quiz-question').length;
        this.userAnswers = new Array(this.totalQuestions).fill(null);
        this.score = 0;
        
        this.initializeQuiz();
    }
    
    initializeQuiz() {
        console.log('🔄 Initializing quiz...');
        
        // Get all elements
        this.elements = {
            progressBar: document.getElementById('quizProgressBar'),
            currentQuestion: document.getElementById('currentQuestion'),
            currentScore: document.getElementById('currentScore'),
            prevBtn: document.getElementById('prevQuestion'),
            nextBtn: document.getElementById('nextQuestion'),
            checkBtn: document.getElementById('checkAnswers'),
            resetBtn: document.getElementById('resetQuiz'),
            quizScore: document.getElementById('quizScore'),
            scoreValue: document.getElementById('scoreValue'),
            scoreFeedback: document.getElementById('scoreFeedback')
        };
        
        // Verify all elements exist
        for (const [key, element] of Object.entries(this.elements)) {
            if (!element) {
                console.error(`❌ Missing element: ${key}`);
                return;
            }
        }
        
        console.log('✅ All quiz elements found');
        
        this.setupEventListeners();
        this.showQuestion(this.currentQuestion);
        this.updateNavigation();
    }
    
    setupEventListeners() {
        console.log('🔗 Setting up event listeners...');
        
        // Answer selection using event delegation
        document.addEventListener('click', (e) => {
            const option = e.target.closest('.quiz-option');
            if (option && !this.elements.quizScore.style.display !== 'none') {
                this.selectAnswer(option);
            }
        });
        
        // Navigation buttons
        this.elements.prevBtn.addEventListener('click', () => this.previousQuestion());
        this.elements.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.elements.checkBtn.addEventListener('click', () => this.checkAnswers());
        this.elements.resetBtn.addEventListener('click', () => this.resetQuiz());
        
        console.log('✅ Event listeners setup complete');
    }
    
    selectAnswer(selectedOption) {
        const question = selectedOption.closest('.quiz-question');
        const questionIndex = parseInt(question.dataset.question) - 1;
        
        console.log(`📝 Selecting answer for question ${questionIndex + 1}`);
        
        // Remove selection from all options in this question
        question.querySelectorAll('.quiz-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        // Add selection to clicked option
        selectedOption.classList.add('selected');
        
        // Store the answer
        this.userAnswers[questionIndex] = selectedOption.dataset.correct === 'true';
        
        // Update navigation
        this.updateNavigation();
    }
    
    showQuestion(index) {
        console.log(`📖 Showing question ${index + 1}`);
        
        // Hide all questions
        document.querySelectorAll('.quiz-question').forEach(q => {
            q.classList.remove('active');
        });
        
        // Show current question
        const questions = document.querySelectorAll('.quiz-question');
        if (questions[index]) {
            questions[index].classList.add('active');
        }
        
        this.updateProgress();
    }
    
    updateProgress() {
        const progress = ((this.currentQuestion + 1) / this.totalQuestions) * 100;
        this.elements.progressBar.style.width = `${progress}%`;
        this.elements.currentQuestion.textContent = this.currentQuestion + 1;
        this.elements.currentScore.textContent = this.score;
    }
    
    updateNavigation() {
        const currentQuestionElement = document.querySelector('.quiz-question.active');
        const hasAnswer = currentQuestionElement?.querySelector('.quiz-option.selected');
        
        // Previous button
        this.elements.prevBtn.disabled = this.currentQuestion === 0;
        
        // Next button
        this.elements.nextBtn.style.display = this.currentQuestion < this.totalQuestions - 1 ? 'block' : 'none';
        this.elements.nextBtn.disabled = !hasAnswer;
        
        // Check answers button
        this.elements.checkBtn.style.display = this.currentQuestion === this.totalQuestions - 1 ? 'block' : 'none';
        this.elements.checkBtn.disabled = !hasAnswer;
        
        console.log(`🔄 Navigation updated - Has answer: ${hasAnswer ? 'Yes' : 'No'}`);
    }
    
    nextQuestion() {
        if (this.currentQuestion < this.totalQuestions - 1) {
            this.currentQuestion++;
            this.showQuestion(this.currentQuestion);
            this.updateNavigation();
        }
    }
    
    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.showQuestion(this.currentQuestion);
            this.updateNavigation();
        }
    }
    
    checkAnswers() {
        console.log('🔍 Checking answers...');
        
        this.score = 0;
        
        document.querySelectorAll('.quiz-question').forEach((question, index) => {
            const selectedOption = question.querySelector('.quiz-option.selected');
            const feedback = question.querySelector('.quiz-feedback');
            
            // Show feedback
            feedback.classList.remove('d-none');
            
            if (selectedOption) {
                const isCorrect = selectedOption.dataset.correct === 'true';
                
                if (isCorrect) {
                    selectedOption.classList.add('correct');
                    feedback.querySelector('.alert-success').classList.remove('d-none');
                    feedback.querySelector('.alert-danger').classList.add('d-none');
                    this.score++;
                } else {
                    selectedOption.classList.add('incorrect');
                    feedback.querySelector('.alert-success').classList.add('d-none');
                    feedback.querySelector('.alert-danger').classList.remove('d-none');
                    
                    // Show correct answer
                    const correctOption = question.querySelector('.quiz-option[data-correct="true"]');
                    correctOption.classList.add('correct');
                }
            } else {
                // No answer selected
                feedback.querySelector('.alert-success').classList.add('d-none');
                feedback.querySelector('.alert-danger').classList.remove('d-none');
                feedback.querySelector('.alert-danger').innerHTML = 
                    '<i class="fas fa-times-circle me-2"></i><strong>No answer selected.</strong>';
                
                // Show correct answer
                const correctOption = question.querySelector('.quiz-option[data-correct="true"]');
                correctOption.classList.add('correct');
            }
        });
        
        // Show results
        this.showResults();
    }
    
    showResults() {
        this.elements.scoreValue.textContent = this.score;
        this.elements.quizScore.style.display = 'block';
        
        // Feedback based on score
        if (this.score >= 9) {
            this.elements.scoreFeedback.textContent = "Excellent! You have strong awareness of social engineering tactics.";
            this.elements.scoreFeedback.className = "text-success";
        } else if (this.score >= 7) {
            this.elements.scoreFeedback.textContent = "Good job! You have a solid understanding but there's room for improvement.";
            this.elements.scoreFeedback.className = "text-warning";
        } else if (this.score >= 5) {
            this.elements.scoreFeedback.textContent = "Fair. Consider reviewing social engineering prevention tips.";
            this.elements.scoreFeedback.className = "text-info";
        } else {
            this.elements.scoreFeedback.textContent = "You may be vulnerable to social engineering attacks. Please review the prevention tips.";
            this.elements.scoreFeedback.className = "text-danger";
        }
        
        // Scroll to results
        this.elements.quizScore.scrollIntoView({ behavior: 'smooth' });
    }
    
    resetQuiz() {
        console.log('🔄 Resetting quiz...');
        
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers.fill(null);
        
        // Reset all questions
        document.querySelectorAll('.quiz-question').forEach(question => {
            question.querySelectorAll('.quiz-option').forEach(option => {
                option.classList.remove('selected', 'correct', 'incorrect');
            });
            question.querySelector('.quiz-feedback').classList.add('d-none');
        });
        
        // Hide results
        this.elements.quizScore.style.display = 'none';
        
        // Show first question
        this.showQuestion(this.currentQuestion);
        this.updateNavigation();
        
        // Scroll to top
        document.querySelector('.quiz-container').scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize quiz when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM loaded, starting quiz...');
    
    // Check if quiz section exists
    const quizSection = document.getElementById('quiz');
    if (quizSection) {
        console.log('✅ Quiz section found, initializing...');
        new Quiz();
    } else {
        console.log('❌ Quiz section not found!');
    }
});

// Fallback initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        if (document.getElementById('quiz')) {
            new Quiz();
        }
    });
} else {
    if (document.getElementById('quiz')) {
        new Quiz();
    }
}
        });
    