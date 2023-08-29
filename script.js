const addBtn = document.querySelector(".add");
const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => {
    addNewNote(note);
  });
}

addBtn.addEventListener("click", () => {
  addNewNote();
});

const headerTags = document.querySelectorAll(".main h2");
headerTags.forEach((header) => {
  header.addEventListener("click", () => {
    const sibling = header;
    if (sibling.classList.contains("completed")) {
      sibling.classList.remove("completed");
    } else {
      sibling.classList.add("completed");
    }
  });
});

function addNewNote(text = "") {
  const note = document.createElement("div");
  note.innerHTML = `
  <div class="note">
  <div class="notes">
    <div class="tools">
      <button class="complete"><i class="fa-solid fa-check"></i></button>
      <button class="edit"><i class="fas fa-edit"></i></button>
      <button class="delete"><i class="fas fa-trash"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
  </div>
</div>

  `;
  document.body.appendChild(note);

  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");
  const main = note.querySelector(".main");
  const textArea = note.querySelector("textarea");
  const note_container = note.querySelector(".note");
  textArea.value = text;
  main.innerHTML = marked(text);

  const completeButton = note.querySelector(".complete");

  completeButton.addEventListener("click", () => {
    note_container.classList.toggle("completed");
    main.classList.toggle("completed");
  });

  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  deleteBtn.addEventListener("click", () => {
    note.remove();
    updateLS();
  });

  const headerTags = note.querySelectorAll("h2, p, h3, h4");

  headerTags.forEach((header) => {
    header.addEventListener("click", () => {
      header.classList.toggle("completed");
    });
  });

  textArea.addEventListener("input", (e) => {
    const { value } = e.target;
    main.innerHTML = marked(value);
    updateLS();
  });

  document.body.appendChild(note);
}

function updateLS() {
  const notesText = document.querySelectorAll("textarea");

  const notes = [];

  notesText.forEach((note) => {
    notes.push(note.value);
  });

  localStorage.setItem("notes", JSON.stringify(notes));
}
