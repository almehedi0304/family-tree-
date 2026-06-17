const tree = document.getElementById("tree");

function getPerson(id) {
  return family.find(person => person.id === id);
}

function renderTree() {
  let html = "";

  family.forEach(person => {

    let fatherName = "";
    let motherName = "";

    if (person.father) {
      fatherName = getPerson(person.father)?.name || "";
    }

    if (person.mother) {
      motherName = getPerson(person.mother)?.name || "";
    }

    html += `
      <div class="node">
        <h3>${person.name}</h3>

        <p>বাবা: ${fatherName || "অজানা"}</p>
        <p>মা: ${motherName || "অজানা"}</p>
      </div>
    `;
  });

  tree.innerHTML = html;
}

renderTree();
