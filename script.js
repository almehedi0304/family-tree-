const tree = document.getElementById("tree");
const profile = document.getElementById("profile");
const search = document.getElementById("search");

function getPerson(id) {
  return family.find(p => p.id === id);
}

function render(data = family) {
  tree.innerHTML = "";

  const levels = {
    1: [],
    2: [],
    3: []
  };

  data.forEach(p => {
    if (!p.father && !p.mother) levels[1].push(p);
    else if (p.father && p.mother && p.id <= 4) levels[2].push(p);
    else levels[3].push(p);
  });

  Object.values(levels).forEach(level => {
    const div = document.createElement("div");
    div.className = "level";

    level.forEach(p => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${p.image}">
        <p>${p.name}</p>
      `;

      card.onclick = () => showProfile(p);

      div.appendChild(card);
    });

    tree.appendChild(div);
  });
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

search.addEventListener("input", e => {
  const val = e.target.value.toLowerCase();

  const filtered = family.filter(p =>
    p.name.toLowerCase().includes(val)
  );

  render(filtered);
});

render();
renderTree();
