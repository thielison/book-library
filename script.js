const bookCards = document.querySelector(".book-cards-container");
const addBookButton = document.querySelector("#add-book-button");
const bookInfoForm = document.querySelector(".form-container");

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`;
};

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayForm() {
    if (bookInfoForm.style.display == "block") {
        return;
    } else {
        bookInfoForm.style.display = "block";
    }
}

function handleClickOutsideForm(event) {
    // hide the form if the click event does not occur on the "addBookButton" element
    // or any element within the "bookInfoForm" container

    if (event.target !== addBookButton && !bookInfoForm.contains(event.target)) {
        bookInfoForm.style.display = "none";
    }
}

addBookButton.addEventListener("click", displayForm);

document.addEventListener("click", handleClickOutsideForm);

// const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");
