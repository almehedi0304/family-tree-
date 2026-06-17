const tree = document.getElementById("tree");
const profile = document.getElementById("profile");
const search = document.getElementById("search");

function getPerson(id) {
  return family.find(p => p.id === id);
}

function getChildren(id) {
  return family.filter(p => p.father === id || p.mother === id);
}

function render(list = family) {
  tree.innerHTML = "";

  const roots = list.filter(p => !p.father && !p.mother);

  function makeLevel(items) {
    const level = document.createElement("div");
    level.className = "level";

    items.forEach(p => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerText = p.name;

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

function showProfile(p) {
  profile.classList.remove("hidden");

  profile.innerHTML = `
    <h2>${p.name}</h2>
    <p>বাবা: ${getPerson(p.father)?.name || "অজানা"}</p>
    <p>মা: ${getPerson(p.mother)?.name || "অজানা"}</p>
    <button onclick="profile.classList.add('hidden')">Close</button>
  `;
}

/* 🔥 GUARANTEED WORKING SEARCH */
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

render();
