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

/* ================= TREE RENDER ================= */

function render() {
  tree.innerHTML = "";

  const roots = family.filter(p => p.father === null || p.id === 1);

  roots.forEach(root => {

    const block = document.createElement("div");
    block.className = "family-block";

    // 👨 PARENT BOX
    const parentBox = document.createElement("div");
    parentBox.className = "parent-box";
    parentBox.innerHTML = `<b>${root.name}</b>`;

    parentBox.onclick = () => showProfile(root);

    block.appendChild(parentBox);

    const children = getChildren(root.id).sort((a, b) => a.id - b.id);

    // ⬇ arrow
    if (children.length > 0) {
      const arrow = document.createElement("div");
      arrow.innerText = "⬇";
      arrow.style.margin = "6px";
      block.appendChild(arrow);
    }

    // 👶 CHILD ROW
    const childRow = document.createElement("div");
    childRow.className = "level";

    children.forEach(child => {
      const card = document.createElement("div");
      card.className = "card child-card";
      card.innerText = child.name;

      card.onclick = () => showProfile(child);

      childRow.appendChild(card);
    });

    block.appendChild(childRow);
    tree.appendChild(block);
  });
}

/* ================= PROFILE ================= */

function showProfile(p) {
  profile.innerHTML = `
    <h2>${p.name}</h2>
    <p>👨 বাবা: ${getPerson(p.father)?.name || "অজানা"}</p>
  `;
}

/* ================= SEARCH ================= */

search.addEventListener("input", function () {
  const val = this.value.toLowerCase();
  suggestions.innerHTML = "";

  if (!val) return;

  const matches = family.filter(p =>
    p.name.toLowerCase().includes(val)
  );

  matches.forEach(m => {
    const div = document.createElement("div");
    div.innerText = m.name;
    div.style.cursor = "pointer";
    div.style.padding = "5px";

    div.onclick = () => {
      showProfile(m);
      suggestions.innerHTML = "";
      search.value = m.name;
    };

    suggestions.appendChild(div);
  });
});

/* ================= INIT ================= */

render();
render();
