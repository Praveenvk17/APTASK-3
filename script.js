// Cricket Quiz Questions
const quizData = [
  {
    question: "Which team won the 2019 Cricket World Cup?",
    options: ["England", "New Zealand", "Australia"],
    correct: "England"
  },
  {
    question: "Who is known as the 'God of Cricket'?",
    options: ["MS Dhoni", "Virat Kohli", "Sachin Tendulkar"],
    correct: "Sachin Tendulkar"
  },
  {
    question: "How many players are on a cricket team?",
    options: ["9", "10", "11"],
    correct: "11"
  },
  {
    question: "Which bowler has taken 800 Test wickets?",
    options: ["Muttiah Muralitharan", "Shane Warne", "Anil Kumble"],
    correct: "Muttiah Muralitharan"
  }
];

let currentQuestion = 0;
let score = 0;

// Load first question
function loadQuestion() {
  const q = quizData[currentQuestion];
  document.getElementById('question').textContent = q.question;

  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = "";
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt);
    optionsDiv.appendChild(btn);
  });

  document.getElementById('quiz-result').textContent = "";
  document.getElementById('next-btn').style.display = "none";
  updateProgress();
  document.getElementById('score').textContent = `Score: ${score}/${quizData.length}`;
}

function checkAnswer(answer) {
  const result = document.getElementById('quiz-result');
  if (answer === quizData[currentQuestion].correct) {
    result.textContent = "✅ Correct!";
    result.style.color = "green";
    score++;
  } else {
    result.textContent = "❌ Wrong!";
    result.style.color = "red";
  }
  document.getElementById('next-btn').style.display = "inline-block";
  document.getElementById('score').textContent = `Score: ${score}/${quizData.length}`;
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    document.getElementById('question').textContent = "🎉 Quiz Completed!";
    document.getElementById('options').innerHTML = "";
    document.getElementById('quiz-result').textContent = "";
    document.getElementById('score').textContent = `Final Score: ${score}/${quizData.length}`;
    document.getElementById('next-btn').style.display = "none";
    updateProgress(true);
  }
}

// Progress bar update
function updateProgress(finish = false) {
  const progress = document.getElementById('progress');
  let percent = ((currentQuestion) / quizData.length) * 100;
  if (finish) percent = 100;
  progress.style.width = percent + "%";
}

// Initialize quiz
window.onload = loadQuestion;

// Live score logic using CricketData API
async function fetchLiveScore() {
  const container = document.getElementById('scores');
  container.textContent = 'Loading live scores...';

  const apiKey = 'YOUR_API_KEY'; // Replace with your CricketData.org key
  const url = `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`;

  try {
    const resp = await fetch(url);
    const data = await resp.json();

    if (data && data.data && data.data.length > 0) {
      container.innerHTML = '';
      data.data.forEach(match => {
        const { name, status, score } = match;
        const matchCard = document.createElement('div');
        matchCard.textContent = `${name} — ${status}${score ? ': ' + score : ''}`;
        container.appendChild(matchCard);
      });
    } else {
      container.textContent = 'No live matches at the moment.';
    }
  } catch (err) {
    console.error(err);
    container.textContent = 'Error fetching live scores.';
  }
}
