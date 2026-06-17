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

/* ================= TREE LAYOUT ================= */

function render(list = family) {
  tree.innerHTML = "";

  const roots = family.filter(p => !p.father && !p.mother);

  const levelMap = new Map();

  function addToLevel(level, person) {
    if (!levelMap.has(level)) levelMap.set(level, []);
    levelMap.get(level).push(person);
  }

  /* LEVEL 0 = ROOTS */
  roots.forEach(p => addToLevel(0, p));

  /* LEVEL 1+ = CHILDREN (simple hierarchy) */
  let currentLevel = 0;
  let queue = [...roots];

  while (queue.length > 0 && currentLevel < 5) {
    let nextQueue = [];

    queue.forEach(parent => {
      const children = getChildren(parent.id);

      children.forEach(c => {
        addToLevel(currentLevel + 1, c);
        nextQueue.push(c);
      });
    });

    queue = nextQueue;
    currentLevel++;
  }

  /* RENDER LEVELS */
  [...levelMap.keys()]
    .sort((a, b) => a - b)
    .forEach(level => {
      const levelDiv = document.createElement("div");
      levelDiv.className = "level";

      levelMap.get(level).forEach(p => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerText = p.name;

        card.onclick = () => showProfile(p);

        levelDiv.appendChild(card);
      });

      tree.appendChild(levelDiv);
    });
}

/* ================= PROFILE ================= */

function showProfile(p) {
  profile.classList.remove("hidden");

  profile.innerHTML = `
    <h2>${p.name}</h2>
    <p>👨 বাবা: ${getPerson(p.father)?.name || "অজানা"}</p>
    <p>👩 মা: ${getPerson(p.mother)?.name || "অজানা"}</p>
    <button onclick="profile.classList.add('hidden')">বন্ধ করুন</button>
  `;
}

/* ================= SEARCH (UNCHANGED, SAFE) ================= */

search.addEventListener("input", (e) => {
  const val = e.target.value.toLowerCase().trim();

  if (!val) {
    suggestions.style.display = "none";
    render(family);
    return;
  }

  const matches = family.filter(p =>
    p.name.toLowerCase().includes(val)
  );

  suggestions.innerHTML = "";
  suggestions.style.display = "block";

  matches.forEach(p => {
    const div = document.createElement("div");
    div.className = "suggestion-item";
    div.innerText = p.name;

    div.onclick = () => {
      search.value = p.name;
      suggestions.style.display = "none";
      render([p]);
    };

    suggestions.appendChild(div);
  });

  render(matches.length ? matches : family);
});

/* INIT */
render(family);
