import { Question } from './models/questions';
import './Style/style.css'

const startQuizBtn = document.querySelector('#startbtn') as HTMLButtonElement;

startQuizBtn?.addEventListener('click', hideFirstpage);

function hideFirstpage () {
  const firstpage = document.querySelector('#firstpage') as HTMLDivElement;
  console.log(firstpage);
  firstpage.classList.add('display-none');
  
  createQuestionHtml(currentQuestion);
};

/*------- Question page ------------*/

let questionList: Question[] = [
  {
    question: "Vilken hundras ser du på bilden?",
    image: '/Images/border-collie.jpg',
    buttons: ["Dalmatin", "Border colli", "Golden"],
    rightAnswer: 1
  },
  {
    question: "Vilken hundras ser du på bilden?",
    image: '/Images/german-shepherd.jpg',
    buttons: ["Labrador", "Fransk bulldog", "Schäfer"],
    rightAnswer: 2
  },
  {
    question: "Vilken hundras ser du på bilden?",
    image: '/Images/Collie.jpg',
    buttons: ["Collie", "Chodsky pes", "Pudel"],
    rightAnswer: 0
  }

];

let currentQuestion = questionList[0]

function createQuestionHtml (question: Question) {
  
  currentQuestion = question

  let container = document.querySelector('#questions') as HTMLDivElement;
  container.classList.remove("display-none");
  container.innerHTML = "";

  let questionContainer = createQuestionDivContainer();
  container?.appendChild(questionContainer);

  let questionText = createQuestionPTag(question.question);
  questionContainer.appendChild(questionText);

  let questionImg = createQuestionImg(question.image);
  questionContainer.appendChild(questionImg);

  let answerBtns = createAnswerBtns(question.buttons);
  for(let i = 0; i < 3; i++ ){
    questionContainer.appendChild(answerBtns[i]);
  }
}

function createQuestionDivContainer () {
  let questionContainer = document.createElement("div") as HTMLDivElement;
  questionContainer.classList.add('question-container');
  console.log(questionContainer);
  return questionContainer;
}

function createQuestionPTag (question: string){
  let questionText = document.createElement("p") as HTMLParagraphElement;
  questionText.innerHTML= question
  return questionText;
}

function createQuestionImg (image: string){
  let questionImg = document.createElement("img") as HTMLImageElement;
  questionImg.src = image
  return questionImg;
}

function createAnswerBtns (buttons: string[])  {
  let btnList: HTMLButtonElement[] = []
  for (let i = 0; i < 3; i++) {
   let answerBtn = document.createElement("button") as HTMLButtonElement;
   answerBtn.id = i.toString()
   answerBtn.innerHTML = buttons[i]
   btnList.push(answerBtn)
  }

  for (let i = 0; i < btnList.length; i++){
    btnList[i]?.addEventListener('click', showAnswer)
  }

  return btnList;
};

function showAnswer(e:any){

  let container = document.querySelector('#questions') as HTMLDivElement;
  container.classList.add("display-none")

  if(e.currentTarget.id == currentQuestion.rightAnswer){
    createHtmlRightAnswer();

  } else{
    createHtmlWrongAnswer();
  }
  createHtmlNextQuestionBtn();
}

/*-------- Right answer ---------*/

function createHtmlRightAnswer(){

  const answerContainer = document.querySelector('.right-or-wrong') as HTMLDivElement;
  answerContainer?.classList.remove('display-none');
  answerContainer?.classList.add("right-container");

  answerContainer.innerHTML = "";

  let text = document.createElement("p");
  text.innerHTML = "Rätt!";
  answerContainer?.appendChild(text);
}

function createHtmlWrongAnswer(){

  const answerContainer = document.querySelector('.right-or-wrong') as HTMLDivElement;
  answerContainer?.classList.remove('display-none');
  answerContainer?.classList.add("wrong-container");

  answerContainer.innerHTML = "";

  let text = document.createElement("p");
  text.innerHTML = "Fel!";
  answerContainer?.appendChild(text);
}

function createHtmlNextQuestionBtn(){
  const answerContainer = document.querySelector('.right-or-wrong') as HTMLDivElement;
  let nextQuestionBtn = document.createElement('button');
  nextQuestionBtn.innerHTML = "Nästa fråga";
  answerContainer?.appendChild(nextQuestionBtn);

  nextQuestionBtn.addEventListener('click', showNextQuestion);
  console.log(nextQuestionBtn)
}

function showNextQuestion(){
  const answerContainer = document.querySelector('.right-or-wrong') as HTMLDivElement;
  answerContainer?.classList.add("display-none")

  createQuestionHtml(questionList[1]);
};
