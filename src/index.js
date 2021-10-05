import './style.css';

const user1 = {
  name: 'Rami',
  score: 100,
};

const user2 = {
  name: 'Lucas',
  score: 31,
};

const user3 = {
  name: 'Marcos',
  score: 20,
};

const user4 = {
  name: 'Frank',
  score: 13,
};

const leadboard = [user1, user2, user3, user4];

const displayList = (leadboard, ul) => {
  leadboard.forEach((user, index) => {
    const li = document.createElement('li');
    const h3 = document.createElement('h3');

    if (index % 2 === 0) {
      li.classList.add('white-row');
    } else {
      li.classList.add('grey-row');
    }

    h3.innerText = `${user.name}: ${user.score}`;

    li.appendChild(h3);

    ul.appendChild(li);
  });
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

  listTitle.innerText = 'Recent Scores';
  refreshBtn.innerText = 'Refresh';

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
  addForm.classList.add('dflex');
  addForm.classList.add('add-form');
  addTitle.classList.add('add-title');

  addForm.append(addTitle, nameInput, scoreInput, submitBtn);
  addContainer.appendChild(addForm);

  displayList(leadboard, leadboardList);
});
