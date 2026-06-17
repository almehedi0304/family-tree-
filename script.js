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

function render() {
  tree.innerHTML = "";

  const parents = family.filter(p => !p.father && !p.mother);

  parents.forEach(parent => {

    // children collect
    let children = family.filter(c => c.father === parent.id);

    // 👉 sorting (old → young assumption via id reverse)
    children = children.sort((a, b) => b.id - a.id);

    const block = document.createElement("div");
    block.className = "family-block";

    // 👨‍👩‍👧 PARENT BOX (father - mother)
    const parentBox = document.createElement("div");
    parentBox.className = "parent-box";

    const mother = family.find(p => p.id === 2); // static mother (as per your data)

    parentBox.innerHTML = `
      <b>${parent.name} - ${mother?.name || "মা নেই"}</b>
    `;

    parentBox.onclick = () => showProfile(parent);

    block.appendChild(parentBox);

    // ⬇ arrow
    if (children.length > 0) {
      const arrow = document.createElement("div");
      arrow.innerText = "⬇";
      arrow.style.margin = "6px";
      block.appendChild(arrow);
    }

    // 👶 CHILDREN ROW (left → right)
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
function showProfile(p) {
  profile.innerHTML = `
    <h2>${p.name}</h2>
    <p>👨 বাবা: ${getPerson(p.father)?.name || "অজানা"}</p>
    <p>👩 মা: ${getPerson(p.mother)?.name || "অজানা"}</p>
  `;
}

render();
