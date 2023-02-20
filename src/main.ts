import './Style/style.css'

const startQuizBtn = document.querySelector('#startbtn') as HTMLButtonElement;

startQuizBtn?.addEventListener('click', hideFirstpage);

function hideFirstpage () {
  const firstpage = document.querySelector('#firstpage') as HTMLDivElement;
  firstpage.classList.add('display-none');
};