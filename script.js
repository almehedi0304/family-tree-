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

/* ================= TREE LEVEL SYSTEM ================= */

function render(data = family) {
  tree.innerHTML = "";

  let levels = [];

  let root = family.filter(p => !p.father && !p.mother);
  levels.push(root);

  let current = root;

  // build levels step by step
  for (let i = 0; i < 5; i++) {
    let next = [];

    current.forEach(p => {
      let kids = getChildren(p.id);
      next.push(...kids);
    });

    if (next.length === 0) break;

    levels.push(next);
    current = next;
  }

  // render levels
  levels.forEach(level => {
    const div = document.createElement("div");
    div.className = "level";

    level.forEach(p => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<b>${p.name}</b>`;

      card.onclick = () => showProfile(p);

      div.appendChild(card);
    });

    tree.appendChild(div);
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

/* ================= SEARCH ================= */

search.addEventListener("input", (e) => {
  const val = e.target.value.toLowerCase().trim();

  suggestions.innerHTML = "";

  if (!val) {
    suggestions.style.display = "none";
    render(family);
    return;
  }

  const matches = family.filter(p =>
    p.name.toLowerCase().includes(val)
  );

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
