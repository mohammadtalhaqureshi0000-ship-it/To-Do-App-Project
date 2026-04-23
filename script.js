const button = document.getElementById("btn");
const show = document.getElementById("showtext");
const inputField = document.getElementById("taskInput");

let notes;
try {
    notes = JSON.parse(localStorage.getItem("notes")) || [];
} catch (e) {
    notes = [];
}
function displayNotes() {
    show.innerHTML = "";
    notes.forEach((note, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            ${note}
            <div>
                <button class="btn btn-sm btn-warning edit">Edit</button>
                <button class="btn btn-sm btn-danger delete">Delete</button>
            </div>
        `;
        li.querySelector(".delete").addEventListener("click", () => {
            notes.splice(index, 1);
            localStorage.setItem("notes", JSON.stringify(notes));
            displayNotes();
        });
        li.querySelector(".edit").addEventListener("click", () => {
            let updated = prompt("Edit your task:", note);
            if (updated) {
                notes[index] = updated;
                localStorage.setItem("notes", JSON.stringify(notes));
                displayNotes();
            }
        });

        show.appendChild(li);
    });
}
    button.addEventListener("click", () => {
        const note = inputField.value.trim();
        if (note) {
            notes.push(note);
            localStorage.setItem("notes", JSON.stringify(notes));
            displayNotes();
            inputField.value = "";
        }
    });
inputField.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        button.click();
    }
});

displayNotes();