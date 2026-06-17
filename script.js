const tree = document.getElementById("tree");
const profile = document.getElementById("profile");
const search = document.getElementById("search");
const suggestions = document.getElementById("suggestions");

function getPerson(id) {
  return family.find(p => p.id === id);
}

function getChildren(id) {
  return family.filter(p => p.father === id);
}

/* ================= GROUPED TREE ================= */

function render(data = family) {
  tree.innerHTML = "";

  const parents = family.filter(p => !p.father && !p.mother);

  parents.forEach(parent => {
    const parentBlock = document.createElement("div");
    parentBlock.className = "parent-block";

    const parentCard = document.createElement("div");
    parentCard.className = "card parent";
    parentCard.innerHTML = `👨‍👩‍👧 ${parent.name}`;

    parentCard.onclick = () => showProfile(parent);

    parentBlock.appendChild(parentCard);

    const children = getChildren(parent.id);

    if (children.length > 0) {
      const arrow = document.createElement("div");
      arrow.innerText = "⬇";
      arrow.style.fontSize = "20px";
      arrow.style.margin = "5px";

      parentBlock.appendChild(arrow);

      const childRow = document.createElement("div");
      childRow.className = "level";

      children.forEach(child => {
        const card = document.createElement("div");
        card.className = "card child";
        card.innerHTML = child.name;

        card.onclick = () => showProfile(child);

        childRow.appendChild(card);
      });

      parentBlock.appendChild(childRow);
    }

    tree.appendChild(parentBlock);
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

/* ================= SEARCH (SIMPLE SAFE) ================= */

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
