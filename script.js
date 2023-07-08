const bookCardsContainer = document.querySelector(".book-cards-container");
const addBookButton = document.querySelector("#add-book-button");
const formContainer = document.querySelector(".form-container");
const userInputForm = document.getElementById("input-form");

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);

    let lastBookAddedToMyLibrary = myLibrary.slice(-1);
    addNewBookCardDiv(lastBookAddedToMyLibrary[0]);
}

function addNewBookCardDiv(book) {
    const newDiv = document.createElement("div");
    const titlePara = document.createElement("p");
    const authorPara = document.createElement("p");
    const pagesPara = document.createElement("p");
    const readNotReadButton = document.createElement("button");
    const removeButton = document.createElement("button");

    // Set the text content of the elements based on the LAST BOOK ADDED to myLibrary array
    titlePara.textContent = book.title;
    authorPara.textContent = book.author;
    pagesPara.textContent = book.pages;
    readNotReadButton.textContent = book.read === "on" ? "Read" : "Not read";
    removeButton.textContent = "Remove";

    newDiv.append(titlePara, authorPara, pagesPara, readNotReadButton, removeButton);
    bookCardsContainer.appendChild(newDiv); // Append the new book card to the container
}

function getFormData(form) {
    const formData = new FormData(form);
    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages");
    const read = formData.get("read");

    const book = new Book(title, author, pages, read);
    addBookToLibrary(book);

    form.reset(); // reset form after submit
    formContainer.style.display = "none"; // hide form after submit
}

function displayForm() {
    if (formContainer.style.display == "block") {
        return;
    }

    formContainer.style.display = "block";
}

function handleClickOutsideForm(event) {
    // hide the form if the click event does not occur on the "addBookButton" element
    // or any element within the "bookInfoForm" container

    if (event.target !== addBookButton && !formContainer.contains(event.target)) {
        formContainer.style.display = "none";
    }
}

userInputForm.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent submit input to send the data to a server by default
    getFormData(e.target);
});

addBookButton.addEventListener("click", displayForm);

document.addEventListener("click", handleClickOutsideForm);
