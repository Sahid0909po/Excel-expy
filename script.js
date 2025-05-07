const data = [
  { name: "SUM", type: "Formula", level: "Basic", description: "Adds numbers", example: "=SUM(A1:A5)" },
  { name: "VLOOKUP", type: "Formula", level: "Intermediate", description: "Vertical lookup", example: "=VLOOKUP(1001, A2:B100, 2, FALSE)" },
  { name: "SUMIFS", type: "Formula", level: "Advanced", description: "Add with multiple conditions", example: "=SUMIFS(B2:B10, A2:A10, \">10\")" },
  { name: "Ctrl+Arrow", type: "Shortcut", level: "Basic", description: "Jump to data edge", example: "Navigate quickly" },
  { name: "Ctrl+T", type: "Shortcut", level: "Intermediate", description: "Create Table", example: "Turn range into table" },
];

const cardContainer = document.getElementById("card-container");
const search = document.getElementById("search");
const filter = document.getElementById("filter");

function renderCards() {
  const searchTerm = search.value.toLowerCase();
  const selectedLevel = filter.value;

  cardContainer.innerHTML = "";

  const filtered = data.filter(item => {
    const matchText = item.name.toLowerCase() + item.description.toLowerCase();
    return (selectedLevel === "All" || item.level === selectedLevel) && matchText.includes(searchTerm);
  });

  filtered.forEach(item => {
    const div = document.createElement("div");
    div.className = `card ${item.level.toLowerCase()}`;
    div.innerHTML = `
      <h3>${item.name}</h3>
      <div class="type">${item.type} - ${item.level}</div>
      <div class="desc">${item.description}</div>
      <div class="example">${item.example}</div>
    `;
    cardContainer.appendChild(div);
  });
}

search.addEventListener("input", renderCards);
filter.addEventListener("change", renderCards);

function exportPDF() {
  html2pdf().from(document.body).save("excel_guide.pdf");
}

renderCards();
