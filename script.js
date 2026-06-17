const tree = document.getElementById("tree");
const profile = document.getElementById("profile");
const search = document.getElementById("search");
const svg = document.getElementById("lines");

function getPerson(id) {
  return family.find(p => p.id === id);
}

function getChildren(id) {
  return family.filter(p => p.father === id || p.mother === id);
}

function render() {
  tree.innerHTML = "";
  svg.innerHTML = "";

  const roots = family.filter(p => !p.father && !p.mother);

  const allNodes = [];

  function createLevel(list) {
    const level = document.createElement("div");
    level.className = "level";

    list.forEach(p => {
      const card = document.createElement("div");
      card.className = "card";
      card.dataset.name = p.name.toLowerCase();
      card.dataset.id = p.id;

      card.innerHTML = `<h3>${p.name}</h3>`;

      card.onclick = () => showProfile(p);

      allNodes.push({ person: p, el: card });

      level.appendChild(card);
    });

    tree.appendChild(level);
  }

  createLevel(roots);

  let children = [];
  roots.forEach(r => {
    children = children.concat(getChildren(r.id));
  });

  createLevel(children);

  setTimeout(() => drawLines(allNodes), 200);
}

function drawLines(nodes) {
  svg.innerHTML = "";

  nodes.forEach(n => {
    if (!n.person.father) return;

    const parent = nodes.find(x => x.person.id === n.person.father);
    if (!parent) return;

    const r1 = parent.el.getBoundingClientRect();
    const r2 = n.el.getBoundingClientRect();

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

    line.setAttribute("x1", r1.left + r1.width / 2);
    line.setAttribute("y1", r1.top + r1.height);
    line.setAttribute("x2", r2.left + r2.width / 2);
    line.setAttribute("y2", r2.top);

    line.setAttribute("stroke", "white");
    line.setAttribute("stroke-width", "2");

    svg.appendChild(line);
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

/* 🔥 SIMPLE & GUARANTEED SEARCH */
search.addEventListener("input", (e) => {
  const val = e.target.value.trim().toLowerCase();

  document.querySelectorAll(".card").forEach(card => {
    const name = card.dataset.name || "";

    if (!val) {
      card.style.display = "block";
      return;
    }

    if (name.includes(val)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

  // hide empty levels (optional clean look)
  document.querySelectorAll(".level").forEach(level => {
    const visibleCards = [...level.children].some(c => c.style.display !== "none");
    level.style.display = visibleCards ? "flex" : "none";
  });
});

render();
