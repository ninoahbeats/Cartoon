// Game State Tracker
const party = {
  rick: { name: "Pickle Rick", hp: 28, maxHp: 28, smarts: 22 },
  batman: { name: "Batman", hp: 32, maxHp: 32, smarts: 18 },
  runner: { name: "Road Runner", hp: 16, maxHp: 16, agility: 20 }
};

function logEvent(message) {
  const logBox = document.getElementById("game-log");
  const entry = document.createElement("p");
  entry.textContent = "• " + message;
  logBox.prepend(entry);
}

function rollD20() {
  return Math.floor(Math.random() * 20) + 1;
}

function takeAction(actionType) {
  const storyText = document.getElementById("story-text");
  
  if (actionType === 'attack') {
    const roll = rollD20();
    const total = roll + 6; // Pickle Rick Smarts modifier
    storyText.textContent = `Pickle Rick used Rat-Slayer Rush! Rolled d20 (${roll}) + 6 = ${total} Total Damage!`;
    logEvent(`Pickle Rick attacked for ${total} damage.`);
  } 
  else if (actionType === 'special') {
    storyText.textContent = "Road Runner used Wall Paint Trick! The enemy lost their next turn!";
    logEvent("Road Runner used Wall Paint Trick.");
  } 
  else if (actionType === 'rest') {
    party.rick.hp = party.rick.maxHp;
    document.getElementById("rick-hp").style.width = "100%";
    document.getElementById("rick-hp-text").textContent = `${party.rick.hp} / ${party.rick.maxHp}`;
    storyText.textContent = "The party rested on the Simpson couch. HP completely restored!";
    logEvent("Party rested at Simpson House.");
  } 
  else if (actionType === 'travel') {
    storyText.textContent = "Where do you want to head next? (Desert Highway, Whispering Woods, Robot Hell, or Galactic Federation Ship)";
    logEvent("Opened travel menu.");
  }
}
let playerUsername = "Guest";
let selectedLeaderKey = "rick";

const leaders = {
  rick: { name: "Pickle Rick", hp: 28, maxHp: 28, stat: "Smarts: 22", seed: "PickleRick" },
  batman: { name: "Batman", hp: 32, maxHp: 32, stat: "Smarts: 18", seed: "Batman" },
  runner: { name: "Road Runner", hp: 16, maxHp: 16, stat: "Agility: 20", seed: "RoadRunner" }
};

function handleLogin(event) {
  event.preventDefault();
  const input = document.getElementById("username-input").value;
  if (input.trim() !== "") {
    playerUsername = input;
    alert(`Welcome back, ${playerUsername}! Select your hero to begin.`);
  }
}

function selectLeader(key) {
  selectedLeaderKey = key;
  document.querySelectorAll(".select-card").forEach(card => card.classList.remove("active"));
  document.getElementById(`card-${key}`).classList.add("active");
}

function startGame() {
  document.getElementById("start-overlay").style.display = "none";
  document.getElementById("player-banner").textContent = `Player: ${playerUsername} | Leader: ${leaders[selectedLeaderKey].name}`;
  
  renderPartySidebar();
  logEvent(`${playerUsername} started the game leading ${leaders[selectedLeaderKey].name}!`);
}

function renderPartySidebar() {
  const partyContainer = document.getElementById("party-list");
  const hero = leaders[selectedLeaderKey];

  partyContainer.innerHTML = `
    <div class="character-card">
      <div class="char-header">
        <img class="avatar" src="https://api.dicebear.com/7.x/bottts/svg?seed=${hero.seed}" alt="${hero.name}" />
        <div class="char-info">
          <strong>${hero.name}</strong>
          <span class="stat-tag">${hero.stat}</span>
        </div>
      </div>
      <div class="hp-bar-container">
        <div class="hp-bar" id="hero-hp" style="width: 100%;"></div>
      </div>
      <small>HP: <span id="hero-hp-text">${hero.hp} / ${hero.maxHp}</span></small>
    </div>
  `;
}
