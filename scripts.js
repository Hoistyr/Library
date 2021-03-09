
let storedLibrary = JSON.parse(localStorage.getItem('storedLibrary'));
if (storedLibrary === null || storedLibrary == []) {
    myLibrary = [];
    const exampleBook = new Book('The Way of Kings', 'Brandon Sanderson', '1007', true);
    myLibrary.push(exampleBook);
} else {
    myLibrary = [];
    buildBooks();
}
newBookButton();
buildLibrary();

function populateStorage () {
    localStorage.setItem('storedLibrary', JSON.stringify(myLibrary));
}

function newBookButton () {
    let addBookButton = document.getElementById('addBookButton')
    addBookButton.addEventListener('click', bookInfoForm);
}

function buildBooks () {
    storedLibrary.forEach(function(book){
        let title = book.title;
        let author = book.author;
        let pageCount = book.pageCount;
        let readStatus = book.readStatus;
        let newBook = new Book(title, author, pageCount, readStatus);
        myLibrary.push(newBook);
        
    })
}

function buildLibrary () {
    if (document.getElementById('bookList')){
        let bookList = document.getElementById('bookList');
        resetBookList(bookList);
    } else if (!document.getElementById('bookList')) {
        bookList = document.createElement('div');
        bookList.id = 'bookList';
        booksContainer.appendChild(bookList);
    }
    
    
    myLibrary.forEach(function (book) {
        console.log('Book Title: ' + book.title);
        console.log('Book Author: ' + book.author);
        
        if ((!document.querySelector(`[data-title='${book.title}']`) && !document.querySelector(`[data-author='${book.author}']`)) 
        || (document.querySelector(`[data-title='${book.title}']`) && !document.querySelector(`[data-author='${book.author}']`))) {
            let newBookDiv = document.createElement('div');
            newBookDiv.className = 'libraryBook';
            newBookDiv.dataset.title = `${book.title}`;
            newBookDiv.dataset.author = `${book.author}`;
            newBookDiv.id = `book:${book.title}-${book.author}`
            bookList.appendChild(newBookDiv);
            let bookHolder = document.querySelector(`[data-title='${book.title}'][data-author='${book.author}']`);
            
            let removeBookButton = document.createElement('p')
            removeBookButton.id = `${book.title}-${book.author}-removeBookButton`
            removeBookButton.classList.add('removeBookButton');
            removeBookButton.dataset.title = `${book.title}`;
            removeBookButton.dataset.author = `${book.author}`;
            removeBookButton.textContent = 'x';
            bookHolder.appendChild(removeBookButton);
            
            removeBookButton.addEventListener('click', deleteBook);
            
            let title = document.createElement('p');
            title.textContent = book.title;
            title.classList.add('title', 'bookInformation');
            bookHolder.appendChild(title);
            
            let author = document.createElement('p');
            author.textContent = book.author;
            author.classList.add('author', 'bookInformation');
            bookHolder.appendChild(author);
            
            let pageCount = document.createElement('p');
            pageCount.textContent = `${book.pageCount} pages`;
            pageCount.classList.add('pageCount', 'bookInformation');
            bookHolder.appendChild(pageCount);
            
            let readStatus = document.createElement('button');
            readStatus.id = `${book.title}-${book.author}-readStatus`
            readStatus.textContent = `[${book.isRead()}]`;
            readStatus.classList.add('readStatus', 'bookInformation');
            if (book.readStatus === true) {
                newBookDiv.classList.add('read');
            }
            bookHolder.appendChild(readStatus);
            
            readStatus.addEventListener('click', function () {
                let readStatusElement = document.getElementById(`${book.title}-${book.author}-readStatus`);
                if (book.readStatus === true) {
                    book.readStatus = false;
                    readStatusElement.textContent = `[${book.isRead()}]`;
                    newBookDiv.classList.remove('read');
                    console.log('started true, changed to: ' + book.readStatus);
                    console.log(myLibrary);
                    populateStorage();
                } else if (book.readStatus === false) {
                    book.readStatus = true;
                    readStatusElement.textContent = `[${book.isRead()}]`;
                    newBookDiv.classList.add('read');
                    console.log('started false, changed to: ' + book.readStatus);
                    console.log(myLibrary);
                    populateStorage();
                }
            });
            console.log(myLibrary);
        }
    }) 
}

function bookInfoForm () {
    let backgroundFadeOut = document.createElement('div');
    backgroundFadeOut.classList.add('backgroundFadeOut');
    container.insertBefore(backgroundFadeOut, header);
    backgroundFadeOut.addEventListener('click', backgroundClickExit);
    
    const formDiv = document.createElement('div');
    formDiv.id = 'formDiv';
    container.appendChild(formDiv);

    const formInputDiv = document.createElement('div');
    formInputDiv.id = 'formInputDiv';
    formDiv.appendChild(formInputDiv);

    const formHolder = document.createElement('form');
    formHolder.id = 'formHolder';
    formInputDiv.appendChild(formHolder);

    const bookTitleText = document.createElement('p');
    bookTitleText.id = 'bookTitleText';
    bookTitleText.className = 'formDescription';
    bookTitleText.textContent = "Book Title:";
    formHolder.appendChild(bookTitleText);

    const bookTitleInput = document.createElement('input');
    bookTitleInput.id = 'bookTitleInput';
    bookTitleInput.className = 'form';
    bookTitleInput.type = 'text';
    bookTitleInput.value = '';
    bookTitleInput.required = true;
    formHolder.appendChild(bookTitleInput);
    
    const bookAuthorText = document.createElement('p');
    bookAuthorText.id = 'bookAuthorText';
    bookAuthorText.className = 'formDescription';
    bookAuthorText.textContent = "Author Name:";
    formHolder.appendChild(bookAuthorText);

    const bookAuthorInput = document.createElement('input');
    bookAuthorInput.id = 'bookAuthorInput';
    bookAuthorInput.className = 'form';
    bookAuthorInput.type = 'text';
    bookAuthorInput.value = '';
    bookAuthorInput.required = true;
    formHolder.appendChild(bookAuthorInput);

    const bookPageCountText = document.createElement('p');
    bookPageCountText.id = 'bookPageCountText';
    bookPageCountText.className = 'formDescription';
    bookPageCountText.textContent = 'Page Count:';
    formHolder.appendChild(bookPageCountText);

    const bookPageCountInput = document.createElement('input');
    bookPageCountInput.id = 'bookPageCountInput';
    bookPageCountInput.className = 'form';
    bookPageCountInput.type = 'number';
    bookPageCountInput.value = '';
    bookPageCountInput.required = true;
    formHolder.appendChild(bookPageCountInput);

    const formInputCheckboxDiv = document.createElement('div');
    formInputCheckboxDiv.id = 'formInputCheckboxDiv';
    formHolder.appendChild(formInputCheckboxDiv);
    
    const bookReadText = document.createElement('p');
    bookReadText.id = 'bookReadText';
    bookReadText.className = 'formDescription';
    bookReadText.textContent = 'Read Before:';
    formInputCheckboxDiv.appendChild(bookReadText);

    const bookReadCheckbox = document.createElement('input');
    bookReadCheckbox.id = 'bookReadInput';
    bookReadCheckbox.class = 'form';
    bookReadCheckbox.type = 'checkbox';
    formInputCheckboxDiv.appendChild(bookReadCheckbox);
    
    const bookReadNoText = document.createElement('p');
    bookReadNoText.id = 'bookReadNoText';
    bookReadNoText.className = 'bookReadCheck';
    bookReadNoText.textContent = 'No';
    formInputCheckboxDiv.appendChild(bookReadNoText);
    
    bookReadCheckbox.addEventListener('change', swapYesNo);

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Add to Library';
    submitButton.id = "submitButton";
    submitButton.type = "button";
    formDiv.appendChild(submitButton);

    submitButton.addEventListener('click', submitForm);

}

function swapYesNo () {
    let bookReadNoText = document.getElementById('bookReadNoText');
    let answerText = bookReadNoText.textContent;
    let answerCheck = answerText.includes('No');
    if (answerCheck) {
        bookReadNoText.textContent = 'Yes';
    } else {
        bookReadNoText.textContent = 'No';
    }
}

function submitForm() {
    let bookTitleInput = document.getElementById('bookTitleInput');
    let bookAuthorText = document.getElementById('bookAuthorText');
    let bookAuthorInput = document.getElementById('bookAuthorInput');
    let bookPageCountText = document.getElementById('bookPageCountText');
    let bookPageCountInput = document.getElementById('bookPageCountInput');
    let formInputCheckboxDiv = document.getElementById('formInputCheckboxDiv');
    if (bookTitleInput.value === '') {
        let formHolder = document.getElementById('formHolder');
        if (!document.getElementById('titleReminder')) {
            
            let titleReminder = document.createElement('p');
            titleReminder.id = 'titleReminder';
            titleReminder.textContent = 'Please enter a title';
            titleReminder.classList.add('noInputReminder');
            formHolder.insertBefore(titleReminder, bookAuthorText);
            bookTitleInput.addEventListener('click', function () {
            titleReminder.remove();
            })
        }
        
    }
    
    if (bookAuthorInput.value === '') {
        if (!document.getElementById('authorReminder')) {
            let authorReminder = document.createElement('p');
            authorReminder.id = 'authorReminder';
            authorReminder.textContent = 'Please enter an author';
            authorReminder.classList.add('noInputReminder');
            formHolder.insertBefore(authorReminder, bookPageCountText);
            bookAuthorInput.addEventListener('click', function () {
            authorReminder.remove();
            })
        }
    }
 
    if (bookPageCountInput.value === '') {
        if (!document.getElementById('pageCountReminder')) {
            let pageCountReminder = document.createElement('p');
            pageCountReminder.id = 'pageCountReminder';
            pageCountReminder.textContent = 'Please enter a valid page count';
            pageCountReminder.classList.add('noInputReminder');
            formHolder.insertBefore(pageCountReminder, formInputCheckboxDiv);
            bookPageCountInput.addEventListener('click', function () {
            pageCountReminder.remove();
            })
        }
    }
    
    console.log(bookAuthorText);
    console.log(bookPageCountText);
    if (bookPageCountInput.value !== '' && bookAuthorInput.value !== '' && bookTitleInput.value !== '') {
        console.log('submit clicked');
        let newBook = getBookInformation();
        let newBookTitle = newBook.title;
        let newBookAuthor = newBook.author;
        console.log(newBookTitle);
        console.log(newBookAuthor);
        if (myLibrary.some(book => book.title === newBookTitle && book.author === newBookAuthor)) {
            console.log('already in library');
            const inLibrary = document.createElement('p');
            inLibrary.id = 'inLibrary';
            inLibrary.textContent = 'Already in library';
            let formDiv = document.getElementById('formDiv');
            if (!document.getElementById('inLibrary')) { 
                formDiv.appendChild(inLibrary);
            }
        } else {
            myLibrary.push(getBookInformation());
            buildLibrary();
            populateStorage();
            removeBackgroundFadeOut();
            removeForm();
        }
    }
}

function getBookInformation () {
    let bookTitle = `${document.querySelector('#bookTitleInput').value}`;
    let authorName = document.querySelector('#bookAuthorInput').value;
    let pageCount = document.querySelector('#bookPageCountInput').value;
    let readStatus = document.querySelector('#bookReadInput').checked;
    return new Book(bookTitle, authorName, pageCount, readStatus);
}

function removeBackgroundFadeOut() {
    let backgroundFadeOut = document.querySelector('.backgroundFadeOut');
    backgroundFadeOut.remove();
}

function deleteBook(eventData) {
    console.log('remove clicked');
    let bookTitle = eventData.target.dataset.title;
    let bookAuthor = eventData.target.dataset.author;
    doubleCheckDelete(bookTitle, bookAuthor, eventData);
}

function doubleCheckDelete(bookTitle, bookAuthor, eventData) {
    let backgroundFadeOut = document.createElement('div');
    backgroundFadeOut.classList.add('backgroundFadeOut');
    container.insertBefore(backgroundFadeOut, header);
    backgroundFadeOut.addEventListener('click', backgroundClickExit);
    
    let doubleCheckDelete = document.createElement('div');
    doubleCheckDelete.id = 'doubleCheckDelete'
    container.appendChild(doubleCheckDelete);

    let doubleCheckDeleteText = document.createElement('p');
    doubleCheckDeleteText.textContent = `Do you want to delete ${bookTitle} by ${bookAuthor} from your library?`
    doubleCheckDelete.appendChild(doubleCheckDeleteText);

    let doubleCheckDeleteButtonHolder = document.createElement('div');
    doubleCheckDeleteButtonHolder.id = ('doubleCheckDeleteButtonHolder');
    doubleCheckDelete.appendChild(doubleCheckDeleteButtonHolder);

    let doubleCheckDeleteYes = document.createElement('button');
    doubleCheckDeleteYes.id = ('doubleCheckDeleteYes');
    doubleCheckDeleteYes.classList.add('doubleCheckDeleteButton');
    doubleCheckDeleteYes.textContent = 'Yes'
    doubleCheckDeleteButtonHolder.appendChild(doubleCheckDeleteYes);
    doubleCheckDeleteYes.addEventListener('click', function () {
        deleteDoubleCheckDelete();
        removeBackgroundFadeOut();
        let  bookToDelete = document.getElementById(`book:${eventData.target.dataset.title}-${eventData.target.dataset.author}`);
        for (book in myLibrary) {
            if (myLibrary[book].title === bookToDelete.dataset.title && myLibrary[book].author === bookToDelete.dataset.author) {
                myLibrary.splice(book, 1);
                bookToDelete.remove();
                buildLibrary();
                populateStorage();
            }      
        }
    });

    let doubleCheckDeleteNo = document.createElement('button');
    doubleCheckDeleteNo.id = ('doubleCheckDeleteNo');
    doubleCheckDeleteNo.classList.add('doubleCheckDeleteButton');
    doubleCheckDeleteNo.textContent = 'No'
    doubleCheckDeleteButtonHolder.appendChild(doubleCheckDeleteNo);
    doubleCheckDeleteNo.addEventListener('click', function () {
        deleteDoubleCheckDelete();
        removeBackgroundFadeOut();
    });
}

function backgroundClickExit () {
    removeBackgroundFadeOut();
    if (document.getElementById('doubleCheckDelete')){
        deleteDoubleCheckDelete();
    } else if (document.getElementById('formDiv')) {
        removeForm(); 
    }
}

function deleteDoubleCheckDelete() {
    let doubleCheckDelete = document.getElementById('doubleCheckDelete');
    doubleCheckDelete.remove();
} 

function removeForm () {
    let formDiv = document.getElementById('formDiv');
    formDiv.remove();
}

function resetBookList (parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function Book(title, author, pageCount, readStatus) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.readStatus = readStatus;
    this.isRead = function () {
        if (this.readStatus === true) {
            return 'Read';
        } else if (this.readStatus === false) {
            return 'Unread';
        }
    }
    
    this.info = function () {
        let bookInfo = title + ' by ' + author + ', ' + pageCount + ' pages, ' + this.isRead();
        return bookInfo;
    }
} 