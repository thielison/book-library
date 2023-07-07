const bookCardsContainer = document.querySelector(".book-cards-container");
const addBookButton = document.querySelector("#add-book-button");
const bookInfoForm = document.querySelector(".form-container");

let myLibrary = [];

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

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
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
    bookInfoForm.style.display = "none"; // hide form after submit
}

document.getElementById("input-form").addEventListener("submit", function (e) {
    e.preventDefault(); // prevent submit input to send the data to a server by default
    getFormData(e.target);
});

addBookButton.addEventListener("click", displayForm);

document.addEventListener("click", handleClickOutsideForm);
