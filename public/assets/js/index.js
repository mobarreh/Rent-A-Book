let booksTitle;
let booksText;
let saveNoteBtn;
let newNoteBtn;
let booksList;

if (window.location.pathname === '/books') {
  bookTitle = document.querySelector('.book-title');
  bookText = document.querySelector('.book-textarea');
  savebookBtn = document.querySelector('.save-');
  newBookBtn = document.querySelector('.new-book');
  bookList = document.querySelectorAll('.list-container .list-group');
}

// Show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

// activeNote is used to keep track of the note in the textarea
let activeBook = {};

const getBook = () =>
  fetch('/api/books', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const saveBook = (book) =>
  fetch('/api/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });

const deletebook = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const renderActiveNote = () => {
  hide(saveNoteBtn);

  if (activeNote.id) {
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } else {
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    noteTitle.value = '';
    noteText.value = '';
  }
};

const handleBookSave = () => {
  const newBook = {
    title: bookTitle.value,
    text: bookText.value,
  };
  saveNote(newBook).then(() => {
    getAndRenderBook();
    renderActiveBook();
  });
};

// Delete the clicked note
const handleBookDelete = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const book = e.target;
  const bookId = JSON.parse(book.parentElement.getAttribute('data-book')).id;

  if (activeBook.id === bookId) {
    activeBook = {};
  }

  deleteBook(bookId).then(() => {
    getAndRenderBooks();
    renderActiveBook();
  });
};

// Sets the activeNote and displays it
const handleBookView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-book'));
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
  activeNote = {};
  renderActiveNote();
};

const handleRenderSaveBtn = () => {
  if (!bookTitle.value.trim() || !bookText.value.trim()) {
    hide(saveBookBtn);
  } else {
    show(saveBookBtn);
  }
};

// Render the list of note titles
const renderBookList = async (books) => {
  let jsonBooks = await books.json();
  if (window.location.pathname === '/notes') {
    bookList.forEach((el) => (el.innerHTML = ''));
  }

  let bookListItems = [];

  // Returns HTML element with or without a delete button
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleNoteView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleBookDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };

  if (jsonNotes.length === 0) {
    bookListItems.push(createLi('No saved Books', false));
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
  });

  if (window.location.pathname === '/books') {
    booksListItems.forEach((book) => bookList[0].append(book));
  }
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderBooks = () => getBooks().then(renderBookList);

if (window.location.pathname === '/books') {
  saveBookBtn.addEventListener('click', handleBookSave);
  newBookBtn.addEventListener('click', handleNewBookView);
  bookTitle.addEventListener('keyup', handleRenderSaveBtn);
  bookText.addEventListener('keyup', handleRenderSaveBtn);
}

getAndRenderNotes();
