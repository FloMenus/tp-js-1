import { startButton } from "./start.js";
import { questions } from "./questions.js";

const steps = ["start", "game", "end"];
let currentStep = steps[0];
let score = 0;
let questionIndex = 0;

function startStep() {
  currentStep = "start";
  const main = document.getElementById("main");
  main.innerHTML = startButton;
  removeProgressBar();

  document.getElementById("startButton").addEventListener("click", () => {
    score = 0;
    questionIndex = 0;
    currentStep = "game";
    gameStep();
  });
}

function gameStep() {
  showQuestion(questionIndex);
}

function showQuestion(index) {
  const question = questions[index];
  const main = document.getElementById("main");
  main.innerHTML = "";

  showProgressBar(index);

  const title = document.createElement("h2");
  title.textContent = question.question;
  main.appendChild(title);

  const typeInfo = document.createElement("p");
  typeInfo.textContent = `Type de question : ${
    question.type === "single"
      ? "Choix unique"
      : question.type === "multiple"
      ? "Choix multiple"
      : "Réponse texte"
  }`;
  main.appendChild(typeInfo);

  const answersContainer = document.createElement("div");
  answersContainer.classList.add("answersContainer");
  main.appendChild(answersContainer);

  let selectedAnswers = [];
  let selectedAnswer = null;
  let textInput = null;

  if (question.type === "text") {
    textInput = document.createElement("input");
    textInput.type = "text";
    textInput.placeholder = "Votre réponse...";
    textInput.classList.add("text-input");
    answersContainer.appendChild(textInput);
  } else {
    question.answers.forEach((answer, i) => {
      const btn = document.createElement("button");
      btn.innerText = answer.text;
      btn.classList.add("answer-button");

      btn.addEventListener("click", () => {
        if (question.type === "multiple") {
          if (selectedAnswers.includes(i)) {
            selectedAnswers = selectedAnswers.filter((idx) => idx !== i);
            btn.classList.remove("selected");
          } else {
            selectedAnswers.push(i);
            btn.classList.add("selected");
          }
          nextButton.disabled = selectedAnswers.length === 0;
        } else {
          selectedAnswer = i;
          document
            .querySelectorAll(".answer-button")
            .forEach((b) => b.classList.remove("selected"));
          btn.classList.add("selected");
          nextButton.disabled = false;
        }
      });

      answersContainer.appendChild(btn);
    });
  }

  const nextButton = document.createElement("button");
  nextButton.innerText = "Suivant";
  nextButton.disabled = question.type !== "text";
  nextButton.classList.add("next-button");

  if (question.type === "text") {
    textInput.addEventListener("input", () => {
      nextButton.disabled = textInput.value.trim() === "";
    });
  }

  nextButton.addEventListener("click", () => {
    if (question.type === "multiple") {
      const correctIndexs = question.answers
        .map((a, i) => (a.correct ? i : null))
        .filter((i) => i !== null);
      const correctlySelected = selectedAnswers.filter((i) =>
        correctIndexs.includes(i)
      );
      const incorrectlySelected = selectedAnswers.filter(
        (i) => !correctIndexs.includes(i)
      );
      if (
        correctlySelected.length === correctIndexs.length &&
        incorrectlySelected.length === 0
      ) {
        score += 1;
      } else if (
        correctlySelected.length > 0 &&
        incorrectlySelected.length === 0
      ) {
        score += 0.5;
      }
    } else if (question.type === "single") {
      if (question.answers[selectedAnswer].correct) {
        score += 1;
      }
    } else if (question.type === "text") {
      const userInput = textInput.value.trim().toLowerCase();
      const correct = question.correctAnswer.trim().toLowerCase();
      if (userInput === correct) {
        score += 1;
      }
    }

    questionIndex++;
    if (questionIndex < questions.length) {
      showQuestion(questionIndex);
    } else {
      showEndScreen();
    }
  });

  main.appendChild(nextButton);
}

function showEndScreen() {
  currentStep = "end";
  const main = document.getElementById("main");
  main.innerHTML = `<h2>Votre score est de ${score} sur ${questions.length}</h2>`;
  const restart = document.createElement("button");
  restart.innerText = "Recommencer";
  restart.addEventListener("click", startStep);
  main.appendChild(restart);
  removeProgressBar();
}

function showProgressBar(index) {
  let container = document.getElementById("progress-bar-container");
  let bar = document.getElementById("progress-bar");

  if (!container) {
    container = document.createElement("div");
    container.id = "progress-bar-container";
    bar = document.createElement("div");
    bar.id = "progress-bar";
    container.appendChild(bar);
    document.body.insertBefore(container, document.getElementById("main"));
  }

  const percent = ((index + 1) / questions.length) * 100;
  bar.style.width = `${percent}%`;
}

function removeProgressBar() {
  const container = document.getElementById("progress-bar-container");
  if (container) {
    container.remove();
  }
}

startStep();
