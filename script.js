const formContainer = document.querySelector(".form-container");

// Constraint Validation API
const form = document.getElementById("input-form");
const bookTitle = document.getElementById("book-title");
const bookAuthor = document.getElementById("book-author");
const bookPages = document.getElementById("book-pages");

const Book = class {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    static createNewBookDiv() {
        // get the last book added to myLibrary array
        let lastBook = library.myLibrary.slice(-1);

        const newDiv = document.createElement("div");
        newDiv.classList = `book`;
        newDiv.setAttribute("data-index", library.myLibrary.length - 1);

        const titlePara = document.createElement("p");
        titlePara.textContent = `"${lastBook[0].title}"`;

        const authorPara = document.createElement("p");
        authorPara.textContent = lastBook[0].author;

        const pagesPara = document.createElement("p");
        pagesPara.textContent = `${lastBook[0].pages} pages`;

        const readStatusButton = document.createElement("button");

        if (lastBook[0].read === "on") {
            readStatusButton.classList = "read-status read";
            readStatusButton.textContent = "Read";
        } else {
            readStatusButton.classList = "read-status not-read";
            readStatusButton.textContent = "Not Read";
        }

        readStatusButton.addEventListener("click", (e) => {
            this.changeReadStatus(e.target);
        });

        const removeBookButton = document.createElement("button");
        removeBookButton.classList.add("remove-book");
        removeBookButton.textContent = "Remove";

        removeBookButton.addEventListener("click", (e) => {
            library.removeBook(e.target);
        });

        newDiv.append(titlePara, authorPara, pagesPara, readStatusButton, removeBookButton);
        document.querySelector(".book-cards-container").appendChild(newDiv); // Append the new book card to the container
    }

    static changeReadStatus(e) {
        const isRead = e.textContent === "Read";
        e.textContent = isRead ? "Not read" : "Read";
        e.classList = `read-status ${isRead ? "not-read" : "read"}`;
    }
};

const Library = class {
    #myLibrary = [];

    addBook(book) {
        this.#myLibrary.push(book);
        Book.createNewBookDiv();
    }

    removeBook(target) {
        // Removes a book from the myLibrary array and its corresponding book card from the DOM.
        let bookCard = target.closest(".book");
        let index = bookCard.getAttribute("data-index");
        this.#myLibrary.splice(index, 1);
        bookCard.remove();

        // Updates the data-index attribute of all remaining book cards to reflect their new position in the library.
        let bookCards = document.querySelectorAll(".book");
        for (let i = 0; i < bookCards.length; i++) {
            bookCards[i].setAttribute("data-index", i);
        }
    }

    get myLibrary() {
        return this.#myLibrary;
    }
};

const UserForm = class {
    static getFormData(form) {
        const formData = new FormData(form);
        const title = formData.get("title");
        const author = formData.get("author");
        const pages = formData.get("pages");
        const read = formData.get("read");
        const book = new Book(title, author, pages, read);
        library.addBook(book);
        form.reset(); // reset form after submit
        formContainer.style.display = "none"; // hide form after submit
    }

    static displayForm() {
        if (formContainer.style.display == "block") {
            return;
        }

        formContainer.style.display = "block";
    }

    // hide the form if the click event does not occur on the "+ Add Book" button element
    // or any element within the "bookInfoForm" container
    static handleClickOutsideForm(e) {
        if (e.target !== document.getElementById("add-book-button") && !formContainer.contains(e.target)) {
            formContainer.style.display = "none";
        }
    }
};

// Constraint Validation API
const validateForm = (event) => {
    event.preventDefault(); // prevent submit input to send the data to a server by default

    const fields = [bookPages, bookAuthor, bookTitle];
    const messages = [
        "You have to add the number of pages in the book!",
        "I'm expecting an author name in this field!",
        "I'm expecting a book title in this field!",
    ];

    // If true, form is valid
    if (form.checkValidity()) {
        UserForm.getFormData(event.target);
    } else {
        fields.forEach((field, index) => {
            if (field.validity.valueMissing) {
                field.setCustomValidity(messages[index]);
            } else {
                field.setCustomValidity("");
            }
            field.reportValidity();
        });
    }
};

form.addEventListener("submit", validateForm);

document.getElementById("add-book-button").addEventListener("click", UserForm.displayForm);

document.addEventListener("click", (e) => UserForm.handleClickOutsideForm(e));

const library = new Library();

// Test books that are displayed when the page loads
const book1 = new Book("The Hobbit", "J. R. R. Tolkien", 304, null);
const book2 = new Book("The Book Thief", "Markus Zusak", 552, "on");
library.addBook(book1);
library.addBook(book2);
