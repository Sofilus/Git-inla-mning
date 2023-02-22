import { Question } from './models/questions';
import './Style/style.css'



const startQuizBtn = document.querySelector('#startbtn') as HTMLButtonElement;

startQuizBtn?.addEventListener('click', hideFirstpage);

function hideFirstpage () {
  const firstpage = document.querySelector('#firstpage') as HTMLDivElement;
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
  }
];

let currentQuestion = questionList[0]

function createQuestionHtml (question: Question) {
  currentQuestion = question
  let container = document.querySelector('#questions') as HTMLDivElement;

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
    
  }
  createHtmlNextQuestionBtn();
}

/*------ Right or wrong answer ------*/

function createHtmlRightAnswer(){

  const answerContainer = document.querySelector('.right-or-wrong');
  answerContainer?.classList.add("right-or-wrong-container");
  let text = document.createElement("p");
  text.innerHTML = "Rätt!";
  answerContainer?.appendChild(text);
}

function createHtmlNextQuestionBtn(){
  const answerContainer = document.querySelector('.right-or-wrong');
  let nextQuestionBtn = document.createElement('button');
  nextQuestionBtn.innerHTML = "Nästa fråga";
  answerContainer?.appendChild(nextQuestionBtn);
}