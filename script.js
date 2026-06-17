const tree = document.getElementById("tree");
const search = document.getElementById("search");
const suggestions = document.getElementById("suggestions");
const profile = document.getElementById("profile");

function getPerson(id) {
  return family.find(p => p.id === id);
}

function getChildren(id) {
  return family.filter(p => p.father === id);
}

/* TREE */
function render(data = family) {
  tree.innerHTML = "";

  const roots = family.filter(p => !p.father && !p.mother);

  let levels = [];
  levels.push(roots);

  let current = roots;

  for (let i = 0; i < 5; i++) {
    let next = [];

    current.forEach(p => {
      next.push(...getChildren(p.id));
    });

    if (next.length === 0) break;

    levels.push(next);
    current = next;
  }

  levels.forEach(level => {
    const div = document.createElement("div");
    div.className = "level";

    level.forEach(p => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerText = p.name;

      card.onclick = () => showProfile(p);

      div.appendChild(card);
    });

    tree.appendChild(div);
  });
}

/* PROFILE */
function showProfile(p) {
  profile.innerHTML = `
    <h2>${p.name}</h2>
    <p>👨 বাবা: ${getPerson(p.father)?.name || "অজানা"}</p>
    <p>👩 মা: ${getPerson(p.mother)?.name || "অজানা"}</p>
  `;
}

/* SEARCH */
search.addEventListener("input", (e) => {
  const val = e.target.value.toLowerCase();

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

render(family);
