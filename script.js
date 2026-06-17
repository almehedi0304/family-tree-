const tree = document.getElementById("tree");
const profile = document.getElementById("profile");
const search = document.getElementById("search");
const suggestions = document.getElementById("suggestions");

function getPerson(id) {
  return family.find(p => p.id === id);
}

function getChildren(id) {
  return family.filter(p => p.father === id || p.mother === id);
}

/* ================= TREE ================= */

function render(list = family) {
  tree.innerHTML = "";

  const roots = family.filter(p => !p.father && !p.mother);

  function makeLevel(items) {
    const level = document.createElement("div");
    level.className = "level";

    items.forEach(p => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `<b>${p.name}</b>`;

      card.onclick = () => showProfile(p);

      level.appendChild(card);
    });

    tree.appendChild(level);
  }

  makeLevel(roots);

  let children = [];
  roots.forEach(r => {
    children = children.concat(getChildren(r.id));
  });

  if (children.length) makeLevel(children);
}

/* ================= PROFILE ================= */

function showProfile(p) {
  const father = getPerson(p.father);
  const mother = getPerson(p.mother);

  profile.classList.remove("hidden");

  profile.innerHTML = `
    <h2>${p.name}</h2>
    <p>👨 বাবা: ${father ? father.name : "অজানা"}</p>
    <p>👩 মা: ${mother ? mother.name : "অজানা"}</p>
    <button onclick="profile.classList.add('hidden')">বন্ধ করুন</button>
  `;
}

/* ================= SEARCH UPGRADE ================= */

let currentMatches = [];
let activeIndex = -1;

function renderSuggestions(matches) {
  suggestions.innerHTML = "";

  matches.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "suggestion-item";

    div.innerText = p.name;

    if (i === activeIndex) {
      div.style.background = "rgba(255,255,255,0.3)";
    }

    div.onclick = () => selectPerson(p);

    suggestions.appendChild(div);
  });
}

function selectPerson(p) {
  search.value = p.name;
  suggestions.style.display = "none";
  render([p]);
}

search.addEventListener("input", (e) => {
  const val = e.target.value.toLowerCase().trim();

  if (!val) {
    suggestions.style.display = "none";
    render(family);
    return;
  }

  currentMatches = family.filter(p =>
    p.name.toLowerCase().includes(val)
  );

  activeIndex = -1;
  suggestions.style.display = "block";

  renderSuggestions(currentMatches);
  render(currentMatches.length ? currentMatches : family);
});

search.addEventListener("keydown", (e) => {
  if (suggestions.style.display === "none") return;

  if (e.key === "ArrowDown") {
    activeIndex++;
    if (activeIndex >= currentMatches.length) activeIndex = 0;
    renderSuggestions(currentMatches);
  }

  if (e.key === "ArrowUp") {
    activeIndex--;
    if (activeIndex < 0) activeIndex = currentMatches.length - 1;
    renderSuggestions(currentMatches);
  }

  if (e.key === "Enter") {
    if (currentMatches[activeIndex]) {
      selectPerson(currentMatches[activeIndex]);
    }
  }
});

/* ================= INIT ================= */

render(family);
