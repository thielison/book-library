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
    newDiv.classList = `book #${myLibrary.length}`;

    const titlePara = document.createElement("p");
    titlePara.textContent = `"${book.title}"`;

    const authorPara = document.createElement("p");
    authorPara.textContent = book.author;

    const pagesPara = document.createElement("p");
    pagesPara.textContent = `${book.pages} pages`;

    const readStatusButton = document.createElement("button");
    readStatusButton.classList.add("read-status");
    readStatusButton.textContent = book.read === "on" ? "Read" : "Not read";
    readStatusButton.addEventListener("click", (e) => {
        changeReadStatus(e.target);
    });

    const removeBookButton = document.createElement("button");
    removeBookButton.classList.add("remove-book");
    removeBookButton.textContent = "Remove";
    removeBookButton.addEventListener("click", (e) => {
        removeBookFromLibrary(e.target);
    });

    newDiv.append(titlePara, authorPara, pagesPara, readStatusButton, removeBookButton);
    bookCardsContainer.appendChild(newDiv); // Append the new book card to the container
}

function changeReadStatus(e) {
    e.textContent === "Read" ? (e.textContent = "Not read") : (e.textContent = "Read");
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

const testBook = new Book("The Hobbit", "J. R. R. Tolkien", 304, null);
const testBook2 = new Book("The Book Thief", "Markus Zusak", 552, "on");
addBookToLibrary(testBook);
addBookToLibrary(testBook2);
