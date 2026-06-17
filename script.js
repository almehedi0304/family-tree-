const tree = document.getElementById("tree");
const profile = document.getElementById("profile");
const search = document.getElementById("search");

function getPerson(id) {
  return family.find(p => p.id === id);
}

function getChildren(id) {
  return family.filter(p => p.father === id || p.mother === id);
}

function render(data = family) {
  tree.innerHTML = "";

  const roots = data.filter(p => !p.father && !p.mother);

  let used = new Set();

  function makeLevel(list) {
    const level = document.createElement("div");
    level.className = "level";

    list.forEach(p => {
      if (used.has(p.id)) return;
      used.add(p.id);

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `<h3>${p.name}</h3>`;

      card.onclick = () => showProfile(p);

      level.appendChild(card);
    });

    tree.appendChild(level);
  }

  // root generation
  makeLevel(roots);

  // children generation
  let children = [];
  roots.forEach(r => {
    children = children.concat(getChildren(r.id));
  });

  if (children.length) makeLevel(children);
}

function showProfile(p) {
  const father = getPerson(p.father)?.name || "অজানা";
  const mother = getPerson(p.mother)?.name || "অজানা";

  profile.classList.remove("hidden");

  profile.innerHTML = `
    <h2>${p.name}</h2>
    <p>বাবা: ${father}</p>
    <p>মা: ${mother}</p>
    <button onclick="profile.classList.add('hidden')">বন্ধ করুন</button>
  `;
}

search.addEventListener("input", (e) => {
  const val = e.target.value.toLowerCase();

  const filtered = family.filter(p =>
    p.name.toLowerCase().includes(val)
  );

  render(filtered);
});

render();
