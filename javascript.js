const myLibrary = [];

function Book(title, author, releaseDate, pages, isRead) {

    this.title = title;
    this.author = author;
    this.releaseDate = releaseDate;
    this.pages = pages;
    this.isRead = isRead;
    this.id = crypto.randomUUID();
}

Book.prototype.changeReadStatus = function() {
    if (this.isRead === "yes") {
        this.isRead = "no";
    }

    else {
        this.isRead = "yes";
    }

}


function addBookToLibrary(title, author, releaseDate, pages, isRead) {
    let book = new Book(title, author, releaseDate, pages, isRead);
    myLibrary.push(book);
    display(myLibrary);
}

const main = document.querySelector(".main");


function display(array) {

    main.innerHTML = "";

    for (item in array) {
        const div = document.createElement("div");
        div.classList.add("card");
        div.setAttribute("data-id", array[item].id)
        
        const title = document.createElement("p");
        title.textContent = array[item].title;

        const author = document.createElement("p");
        author.textContent = array[item].author;

        const releaseDate = document.createElement("p");
        releaseDate.textContent = array[item].releaseDate;

        const pages = document.createElement("p");
        pages.textContent = array[item].pages;

        const buttonsRow = document.createElement("div");
        buttonsRow.classList.add("buttons-row");

        const removeButton = document.createElement("button");
        removeButton.classList.add("remove");
        removeButton.textContent = "Remove";

        const readButton = document.createElement("Button");

        const read = document.createElement("p");

        if (array[item].isRead === "yes") {
            readButton.classList.add("read");
            read.textContent = "Read"
        }

        else {
            readButton.classList.add("not-read");
            read.textContent = "Didn't read"
        }
        
        buttonsRow.appendChild(removeButton);
        buttonsRow.appendChild(readButton);


        div.appendChild(title);
        div.appendChild(author);
        div.appendChild(releaseDate);
        div.appendChild(pages);
        div.appendChild(read);
        div.appendChild(buttonsRow);

        main.appendChild(div);
    }
}

const dialog = document.querySelector("dialog");
const addBookButton = document.querySelector(".add-book-button");

addBookButton.addEventListener("click", () => {
    dialog.showModal();
})

const closeButton = document.querySelector(".close");
const form = document.querySelector("form")

closeButton.addEventListener("click", () => {
    form.reset();
    dialog.close();
})

form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);

    let title = formData.get("title");
    let author = formData.get("author");
    let releaseDate = formData.get("releaseDate");
    if (!releaseDate) {
        releaseDate = "N/A";
    }

    let pages = formData.get("pages")
    if (!pages) {
        pages = "N/A";
    }

    let isRead = formData.get("isRead");

    addBookToLibrary(title, author, releaseDate, pages, isRead);

    form.reset();
    dialog.close();
})


    
main.addEventListener("click", function(event) {
    
    if (!event.target.matches(".remove, .read, .not-read")) return;

    const removedDiv = event.target.parentElement.parentElement;
          
    const id = removedDiv.getAttribute("data-id");
    
    index = myLibrary.findIndex((item) => item.id === id);

    if (index === -1) return;

    if (event.target.matches(".remove")) {
        
        myLibrary.splice(index, 1);
    
        display(myLibrary);
    }

    else if (event.target.matches(".read") || event.target.matches(".not-read")) {
        myLibrary[index].changeReadStatus();
        display(myLibrary);

    }
})

