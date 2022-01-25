// DOM
const addModal = document.getElementById("add-modal");
const startAddButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const modalCancelButton = addModal.querySelector(".btn--passive");
const modalAddMovieButton = modalCancelButton.nextElementSibling;
const modalInputs = addModal.querySelectorAll("input");
const renderContainer = document.getElementById("movie-list");
const deleteModal = document.getElementById("delete-modal");

// vars
const movies = [];

// Internal logic

const renderOneMovie = (title, image, rating) => {
    const e = document.createElement("li");
    const id = title + image + rating;
    e.setAttribute("id", id);
    e.className = "movie-element";
    e.innerHTML = `
        <div class='movie-element__image'>
            <img src='${image}' />
        </div>
        <div class='movie-element__info'>
            <h2>${title}</h2>
            <p>${rating} / 5 stars</p>            
        </div>
    `;
    deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener("click", deleteHandler.bind(null, id));
    e.querySelector(".movie-element__info").appendChild(deleteButton);
    renderContainer.appendChild(e);
};

const deleteHandler = (id) => {
    deleteModal.classList.add("visible");
    toggleBackdrop();
    deleteOneMovie(id);
};

const deleteOneMovie = (id) => {
    document.getElementById(id).remove();
};

// UI handlers

const toggleBackdrop = () => {
    backdrop.classList.toggle("visible");
};

const backdropClickHandler = () => {
    toggleMovieModal();
};

const toggleMovieModal = () => {
    addModal.classList.toggle("visible");
    toggleBackdrop();
};

const cancelMovieModal = () => {
    toggleMovieModal();
    clearModalInputs();
};

const modalAddMovieButtonHandler = () => {
    const title = modalInputs[0].value;
    const image = modalInputs[1].value;
    const rating = modalInputs[2].value;
    const newMovie = {
        title: title,
        image: image,
        rating: rating,
    };
    movies.push(newMovie);
    clearModalInputs();
    toggleMovieModal();
    renderOneMovie(title, image, rating);
};

const clearModalInputs = () => {
    for (const input of modalInputs) {
        input.value = "";
    }
};

// Listeners

startAddButton.addEventListener("click", toggleMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
modalCancelButton.addEventListener("click", cancelMovieModal);
modalAddMovieButton.addEventListener("click", modalAddMovieButtonHandler);
