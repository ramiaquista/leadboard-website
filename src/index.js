import './style.css';
import leadboardData from './leadboardAPI';

const gameID = 'JxURczUS4w2xJdOpfmIm';

const leadboard = [];

async function displayList(leadboard, ul) {
  while (ul.hasChildNodes()) ul.removeChild(ul.firstChild);
  await leadboardData.refreshData(gameID).then((data) => {
    leadboard = data.result;
  });
  leadboard.forEach((player, index) => {
    const li = document.createElement('li');
    const h3 = document.createElement('h3');

    if (index % 2 === 0) {
      li.classList.add('white-row');
    } else {
      li.classList.add('grey-row');
    }

    h3.innerText = `${player.user}: ${player.score}`;

    li.appendChild(h3);

    ul.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const listContainer = document.querySelector('.list-container');

  const leadboardList = document.createElement('ul');

  const listTitleContainer = document.createElement('div');
  const listTitle = document.createElement('h2');
  const refreshBtn = document.createElement('button');

  leadboardList.classList.add('dflex');
  leadboardList.classList.add('leadbord-list');
  listTitleContainer.classList.add('dflex');
  listTitleContainer.classList.add('list-header');
  refreshBtn.classList.add('refresh-btn');

  listTitle.innerText = 'Recent Scores';
  refreshBtn.innerText = 'Refresh';

  refreshBtn.addEventListener('click', () => {
    leadboardData.refreshData(gameID);
    displayList(leadboard, leadboardList);
  });

  listTitleContainer.appendChild(listTitle);
  listTitleContainer.appendChild(refreshBtn);

  listContainer.appendChild(listTitleContainer);
  listContainer.appendChild(leadboardList);

  const addContainer = document.querySelector('.add-container');

  const addForm = document.createElement('form');
  const addTitle = document.createElement('h2');
  const nameInput = document.createElement('input');
  const scoreInput = document.createElement('input');
  const submitBtn = document.createElement('button');

  addTitle.innerText = 'Add your score';
  nameInput.placeholder = 'Your name';
  scoreInput.placeholder = 'Your score';
  submitBtn.innerText = 'Submit';
  submitBtn.type = 'button';
  addForm.classList.add('dflex');
  addForm.classList.add('add-form');
  addTitle.classList.add('add-title');

  submitBtn.addEventListener('click', () => {
    leadboardData.submitNewPlayer(gameID, nameInput.value, scoreInput.value);
    nameInput.value = '';
    scoreInput.value = '';
  });

  addForm.append(addTitle, nameInput, scoreInput, submitBtn);
  addContainer.appendChild(addForm);

  displayList(leadboard, leadboardList);
});
