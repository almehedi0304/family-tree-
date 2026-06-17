const tree = document.getElementById("tree");
const profile = document.getElementById("profile");
const search = document.getElementById("search");

/* always use full dataset */
function getPerson(id) {
  return family.find(p => p.id === id);
}

function getChildren(id) {
  return family.filter(p => p.father === id || p.mother === id);
}

/* GLOBAL SAFE RENDER */
function render(data = family) {
  tree.innerHTML = "";

  const roots = family.filter(p => !p.father && !p.mother);

  let secondLevel = [];

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

  /* LEVEL 1 */
  makeLevel(roots);

  /* LEVEL 2 (children) */
  roots.forEach(r => {
    secondLevel = secondLevel.concat(getChildren(r.id));
  });

  if (secondLevel.length) makeLevel(secondLevel);
}

/* PROFILE */
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

/* 🔍 SEARCH (SAFE + STABLE) */
search.addEventListener("input", (e) => {
  const val = e.target.value.toLowerCase().trim();

  if (!val) {
    render(family);
    return;
  }

  const filtered = family.filter(p =>
    p.name.toLowerCase().includes(val)
  );

  render(filtered);
});

/* INIT */
render(family);
