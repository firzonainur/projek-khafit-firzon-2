const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-container"));
const choicess = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
let a;
let b = document.getElementById('model');
let c = document.getElementById('gmbr');
let questions = [
  {
    question: "Memegang Raket (Forehand)?",
    choice1: "1a.jpg",
    choice2: "1b.jpg",
    choice3: "1c.jpg",
    choice4: "1d.jpg",
    answer: 3
  },
  {
    question: "Memegang Raket (Backhand)?",
    choice1: "2a.jpg",
    choice2: "2b.jpg",
    choice3: "2c.jpg",
    choice4: "2d.jpg",
    answer: 1
  },
  {
    question: "Memegang Raket (Pukul Kasur)?",
    choice1: "3a.jpg",
    choice2: "3b.jpg",
    choice3: "3c.jpg",
    choice4: "3d.jpg",
    answer: 2
  },
  {
    question: "Servis Pendek?",
    choice1: "4a.jpg",
    choice2: "4b.jpg",
    choice3: "4c.jpg",
    choice4: "4d.jpg",
    answer: 4
  },
  {
    question: "Servis Panjang?",
    choice1: "5a.jpg",
    choice2: "5b.jpg",
    choice3: "5c.jpg",
    choice4: "5d.jpg",
    answer: 1
  },
  {
    question: "Pukulan di Atas Kepala (Forehand)?",
    choice1: "6a.jpg",
    choice2: "6b.jpg",
    choice3: "6c.jpg",
    choice4: "6d.jpg",
    answer: 4
  },
  {
    question: "Pukulan di Atas Kepala (Backhand)?",
    choice1: "7a.jpg",
    choice2: "7b.jpg",
    choice3: "7c.jpg",
    choice4: "7d.jpg",
    answer: 3
  },
  {
    question: "Posisi Siap dalam Melakukan Pukulan (Drive)?",
    choice1: "8a.jpg",
    choice2: "8b.jpg",
    choice3: "8c.jpg",
    choice4: "8d.jpg",
    answer: 2
  },
  {
    question: "Posisi Tangan Pukulan di Atas Kepala (Forehand)?",
    choice1: "9a.jpg",
    choice2: "9b.jpg",
    choice3: "9c.jpg",
    choice4: "9d.jpg",
    answer: 1
  },
  {
    question: "Pukulan (Netting)?",
    choice1: "10a.jpg",
    choice2: "10b.jpg",
    choice3: "10c.jpg",
    choice4: "10d.jpg",
    answer: 4
  }

];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  a = new Array();
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choicess.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerHTML = "<img class='gambar' src='gambar/"+currentQuestion['choice' + number]+"' style='border:1px solid black'>" ;
  });
  
  a = Array.from(document.getElementsByClassName('gambar'));
  console.log(a);
  a.forEach(gambar => {
    gambar.addEventListener("mouseover", p =>{
      b.classList.remove('hoper1');
      b.classList.add('hoper');
      let q = p.target;
      c.innerHTML = "<img src='"+q.src+"'>" ;
    }); 
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

function hapus() {
  b.classList.remove('hoper');
  b.classList.add('hoper1');
}


startGame();
