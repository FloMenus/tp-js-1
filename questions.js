const questions = [
  {
    question: "Quel est le nom de la capitale de la France ?",
    type: "single",
    answers: [
      { text: "Paris", correct: true },
      { text: "Londres", correct: false },
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Qui a écrit 'L'Origine des espèces' ?",
    type: "text",
    correctAnswer: "Charles Darwin",
  },
  {
    question:
      "Quels joueurs ont monopolisé le Ballon d'Or entre 2008 et 2017 ?",
    type: "multiple",
    answers: [
      { text: "Cristiano Ronaldo", correct: true },
      { text: "Lionel Messi", correct: true },
      { text: "Zinedine Zidane", correct: false },
      { text: "Andrés Iniesta", correct: false },
    ],
  },
  {
    question:
      "Qui est le directeur de la succursale de Dunder Mifflin dans la série 'The Office' ?",
    type: "single",
    answers: [
      { text: "Michael Scott", correct: true },
      { text: "Jim Halpert", correct: false },
      { text: "Dwight Schrute", correct: false },
      { text: "Ryan Howard", correct: false },
    ],
  },
  {
    question: "Quel est le plus grand océan du monde ?",
    type: "single",
    answers: [
      { text: "Atlantique", correct: false },
      { text: "Indien", correct: false },
      { text: "Arctique", correct: false },
      { text: "Pacifique", correct: true },
    ],
  },
  {
    question: "Qui a écrit 'Les Misérables' ?",
    type: "single",
    answers: [
      { text: "Victor Hugo", correct: true },
      { text: "Gustave Flaubert", correct: false },
      { text: "Émile Zola", correct: false },
      { text: "Marcel Proust", correct: false },
    ],
  },
];

export { questions };
