class Note {
    constructor(title) {
      this.title = title;
      
      this.element = this.createElement(title);
    }
  
    createElement() {
      let newNote = document.createElement("li");
  
      newNote.addEventListener("click", this.remove.bind(newNote));
  
      return newNote;
    }
  
    add(title) {

      let taskList = document.querySelector("#taskList");
      let node = document.createTextNode(title);

      let newNote = this.element;

      taskList.appendChild(newNote);
      newNote.appendChild(node);
    }
  
    saveToStorage() {

      if(localStorage.getItem("notes") === null) {
        let arrayNotes = [];
        arrayNotes.push(this.title);
        localStorage.setItem("notes", JSON.stringify(arrayNotes));
      } else {
        let arrayNotes = JSON.parse(localStorage.getItem("notes"));
        arrayNotes.push(this.title);
        let jsonNotes = JSON.stringify(arrayNotes);
        localStorage.setItem("notes", jsonNotes);
      }

    }
  
    remove() {
      // HINT🤩 the meaning of 'this' was set by bind() in the createElement function
      // in this function, 'this' will refer to the current note element
      // .removeChild(this)
      // remove the item from screen and from localstorage

      let taskList = document.querySelector("#taskList");
      taskList.removeChild(this);

      let arrayNotes = JSON.parse(localStorage.getItem("notes"));
      let title = this.innerHTML;
      let indexTitle = arrayNotes.indexOf(title);
      arrayNotes.splice(indexTitle, 1);

      let jsonNotes = JSON.stringify(arrayNotes);
      localStorage.setItem("notes", jsonNotes);
    }
  }
  
  class App {
    constructor() {
      //console.log("👊🏼 The Constructor!");
  
      this.txtTodo = document.querySelector("#taskInput");
      this.txtTodo.addEventListener("keypress", this.createNote.bind(this));

      // when the app loads, we can show previously saved noted from localstorage
      this.loadNotesFromStorage();
    }
  
    loadNotesFromStorage() {
      
      if(localStorage.getItem("notes") != null) {
        let arrayNotes = JSON.parse(localStorage.getItem("notes"));
        for(let i = 0; i<arrayNotes.length; i++) {
          let newNote = new Note(arrayNotes[i]);
          newNote.add(newNote.title);
        }
      }
    }
  
    createNote(e) {
        if(e.key === "Enter") {
            e.preventDefault();
            console.log(this.txtTodo.value);
            
            let note = new Note(this.txtTodo.value);
            
            this.reset();
            note.add(note.title);
            note.saveToStorage();
        }
    }
  
    reset() {
      this.txtTodo.value = "";
    }
  }
  
  let app = new App();
  