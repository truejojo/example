// Testdaten
const data = {
    name: "Meine Notizen",
    maxNotes: 30,
    notes: [
        {
            date: "20.03.2024",
            dateTS: "20240320",
            createTS: "20240320160000",
            changeTS: null,
            title: "Joggen gehen",
            text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
            date: "20.03.2024",
            dateTS: "20240320",
            createTS: "20240320163000",
            changeTS: "20240321163000",
            title: "Programmieren üben",
            text: "Eaque deserunt nam facere veniam cumque quisquam",
        }
    ],
};

// Datenbank öffnen
const dbRequest = window.indexedDB.open("dataDB", 1);
let db = null;

// Datenbank EventHandling
dbRequest.addEventListener("upgradeneeded", (event) => {
	console.log("Upgrade from version", event.oldVersion, "to", event.newVersion);
	db = event.target.result;

	console.log(db.objectStoreNames);
	if (!db.objectStoreNames.contains("notesData")) {
		let objectStore = db.createObjectStore("notesData", {
			keyPath: "id",
			autoIncrement: true,
		});

		objectStore.createIndex("titleIDX", "title", { unique: false });
		objectStore.createIndex("dateIDX", "date", { unique: false });
		objectStore.createIndex("dateTSIDX", "dateTS", { unique: false });
		objectStore.createIndex("changeTSIDX", "changeTS", { unique: false });
	}
});

dbRequest.addEventListener("success", (event) => {
	console.log("Success");
	db = event.target.result;

	if (typeof data !== "undefined") {
		let notesData = makeTransaction("notesData", "readwrite", () => {
			viewNoteList();
		});

		let request = notesData.getAll();
		request.addEventListener("success", (event) => {
			if (event.target.result.length === 0) {
				data.notes.forEach((note) => {
                    //TODO hier neue TS vergeben die nötig sind!
					let addRequest = data.notes.add(note);
					addRequest.addEventListener("success", (event) => {
						console.log("added note");
					});
					addRequest.addEventListener("error", (event) => {
						console.log(event.target.error);
					});
				});
			}
		});
	} else {
		viewNoteList();
	}
});

dbRequest.addEventListener("error", (event) => {
	console.log(event.target.error);
});

// Transaction
function makeTransaction(storeName, mode, callback = null) {
	let transaction = db.transaction(storeName, mode);
	transaction.addEventListener("error", (event) => {
		console.log(event.target.error);
	});
	transaction.addEventListener("complete", (event) => {
		console.log("Transaction Complete");
		if (typeof callback === "function") callback();
	});

	return transaction.objectStore(storeName);
}

// Alle Datensätze anzeigen (für Liste)
function viewNoteList() {
	let notesData = makeTransaction("notesData", "readonly");
	document.querySelector("#allNotes").innerHTML = "";

	//let cursorRequest = notes.openCursor(null, "prev");
	// let range = IDBKeyRange.only("Anna");
	let index = notesData.index("personIDX");
	let cursorRequest = index.openCursor(null, "next");

	cursorRequest.addEventListener("success", (event) => {
		let cursor = event.target.result;
		if (cursor) {
			document.querySelector("#allNotes").insertAdjacentHTML(
				"beforeend",
				`<div data-key="${cursor.value.id}" onclick="showNote(${cursor.value.id})" style="border: 1px solid black; margin-bottom: 16px;">
          <div>${cursor.value.title}</div>
        </div>`
			);
			cursor.continue();
		}
	});
}

// Einen Datensatz anzeigen (für Formular)
function showNote(noteID) {
	let notesData = makeTransaction("notesData", "readonly");
	let request = notesData.notes.get(noteID);
	request.addEventListener("success", (event) => {
		let data = event.target.result;
		document.querySelector("#myForm").setAttribute("data-key", data.id);
		document.querySelector("#noteTitle").value = data.title;
		document.querySelector("#notePerson").value = data.person;
		document.querySelector("#noteMessage").value = data.message;
	});
	request.addEventListener("error", (event) => {
		console.log(event.target.error);
	});
}

// Neuen Datensatz anlegen
document.querySelector("#addNote").addEventListener("click", (event) => {
	event.preventDefault();

	let newNote = {
		title: document.querySelector("#noteTitle").value.trim(),
		person: document.querySelector("#notePerson").value.trim(),
		message: document.querySelector("#noteMessage").value.trim(),
		date: Date.now(),
	};

	let notes = makeTransaction("notes", "readwrite");

	let request = notes.add(newNote);
	request.addEventListener("success", (event) => {
		console.log(event.target.result);
		document.querySelector("#myForm").reset();
		viewNoteList();
	});
	request.addEventListener("error", (event) => {
		console.log(event.target.error);
	});
});

// Datensatz löschen
document.querySelector("#deleteNote").addEventListener("click", (event) => {
	event.preventDefault();
	let form = document.querySelector("#myForm");

	if (form.hasAttribute("data-key")) {
		let noteID = form.getAttribute("data-key");

		let notes = makeTransaction("notes", "readwrite");
		let request = notes.delete(parseInt(noteID));

		request.addEventListener("success", (event) => {
			document.querySelector(`div[data-key="${noteID}"]`).remove();
			form.reset();
			form.removeAttribute("data-key");
		});
		request.addEventListener("error", (event) => {
			console.log(event.target.error);
		});
	}
});

// Datensatz aktualisieren
document.querySelector("#updateNote").addEventListener("click", (event) => {
	event.preventDefault();
	let form = document.querySelector("#myForm");

	if (form.hasAttribute("data-key")) {
		let noteID = form.getAttribute("data-key");

		let note = {
			id: parseInt(noteID),
			title: document.querySelector("#noteTitle").value.trim(),
			person: document.querySelector("#notePerson").value.trim(),
			message: document.querySelector("#noteMessage").value.trim(),
			date: Date.now(),
		};

		let notes = makeTransaction("notes", "readwrite");
		let request = notes.put(note);
		request.addEventListener("success", (event) => {
			document.querySelector(
				`div[data-key="${noteID}"]`
			).innerHTML = `<div>${note.title}</div>`;
		});
		request.addEventListener("error", (event) => {
			console.log(event.target.error);
		});
	}
});