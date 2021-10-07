import './style.css';
import leadboardData from './leadboardAPI';

const gameID = 'gu59d6P3oXbQx2t8pVbz';

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

const timeoutClose = () => {
  const alert = document.querySelector('.alert');
  alert.classList.remove('d-none');
  window.setTimeout(() => {
    alert.classList.add('d-none');
  }, 2000);
};

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
  refreshBtn.classList.add('btn');
  refreshBtn.classList.add('btn-secondary');

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
  submitBtn.classList.add('btn');
  submitBtn.classList.add('btn-primary');
  addForm.classList.add('dflex');
  addForm.classList.add('add-form');
  addTitle.classList.add('add-title');

  submitBtn.addEventListener('click', () => {
    leadboardData.submitNewPlayer(gameID, nameInput.value, scoreInput.value);
    nameInput.value = '';
    scoreInput.value = '';
    timeoutClose();
  });

  const divAlert = document.createElement('div');

  divAlert.classList.add('alert');
  divAlert.classList.add('alert-success');
  divAlert.classList.add('d-none');
  divAlert.role = 'alert';
  divAlert.innerHTML = '<strong>Success!</strong> You have been added successfully!';
  addForm.append(addTitle, nameInput, scoreInput, submitBtn, divAlert);
  addContainer.appendChild(addForm);

  displayList(leadboard, leadboardList);
});
