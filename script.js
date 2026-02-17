const characters = {
  'Arthur Shelby': {
    desc: '战友与兄长，脾气暴烈但忠诚。',
    intro: 'Tommy，说句话，我这边的人都准备好了。',
    replies: [
      '我会按你的计划办，但要是有人挡路，我不会手软。',
      '酒馆里有动静，我已经安排人盯着了。',
      '你一句话，我就把兄弟们全带上。'
    ]
  },
  'Polly Gray': {
    desc: '家族的智囊与守护者，沉稳而敏锐。',
    intro: '汤米，做决定前先想想代价。',
    replies: [
      '你总在赌，但别把家人也押上。',
      '账我看过了，这单生意有陷阱。',
      '我可以替你稳住家里，但你得给我实话。'
    ]
  },
  'Ada Thorne': {
    desc: '独立而理性的妹妹，直言不讳。',
    intro: '你又要把城市搅成一锅粥了吗，汤米？',
    replies: [
      '你可以赢下街头，但别输掉你自己。',
      '工会那边我会去谈，不过我可不替你撒谎。',
      '有些战争不该打，你其实知道。'
    ]
  },
  'Alfie Solomons': {
    desc: '伦敦势力头目，狡黠、危险又幽默。',
    intro: 'Tommy boy，你总在最麻烦的时候想起我。',
    replies: [
      '合作可以，但每一口面包都得分清是谁烤的。',
      '你有你的枪，我有我的码头，大家都讲规矩。',
      '别绕弯子，直接告诉我你想要什么。'
    ]
  }
};

const characterList = document.getElementById('characterList');
const messagesEl = document.getElementById('messages');
const activeCharacterEl = document.getElementById('activeCharacter');
const characterDescEl = document.getElementById('characterDesc');
const form = document.getElementById('chatForm');
const input = document.getElementById('messageInput');

let activeCharacter = Object.keys(characters)[0];

function renderCharacterButtons() {
  characterList.innerHTML = '';

  Object.keys(characters).forEach((name) => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.className = `character-btn ${name === activeCharacter ? 'active' : ''}`;
    button.textContent = name;
    button.type = 'button';
    button.addEventListener('click', () => switchCharacter(name));

    item.appendChild(button);
    characterList.appendChild(item);
  });
}

function addMessage(sender, text, cls) {
  const msg = document.createElement('article');
  msg.className = `msg ${cls}`;
  msg.innerHTML = `<span class="meta">${sender}</span>${text}`;
  messagesEl.appendChild(msg);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function switchCharacter(name) {
  activeCharacter = name;
  renderCharacterButtons();
  activeCharacterEl.textContent = name;
  characterDescEl.textContent = characters[name].desc;
  messagesEl.innerHTML = '';
  addMessage(name, characters[name].intro, 'them');
}

function randomReply(name) {
  const pool = characters[name].replies;
  return pool[Math.floor(Math.random() * pool.length)];
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const content = input.value.trim();
  if (!content) return;

  addMessage('Thomas Shelby（你）', content, 'you');
  input.value = '';

  setTimeout(() => {
    addMessage(activeCharacter, randomReply(activeCharacter), 'them');
  }, 500);
});

renderCharacterButtons();
switchCharacter(activeCharacter);
