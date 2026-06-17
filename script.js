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

/* ================= SIMPLE TREE ================= */

function render(list = family) {
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

  makeLevel(roots);

  roots.forEach(r => {
    secondLevel = secondLevel.concat(getChildren(r.id));
  });

  if (secondLevel.length) makeLevel(secondLevel);
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

/* ================= BASIC SEARCH ================= */

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
