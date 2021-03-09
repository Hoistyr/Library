let myLibrary = [];

pageLoad();

function pageLoad () {
    let addBookButton = document.getElementById('addBookButton')
    addBookButton.addEventListener('click', bookInfoForm);
}

function bookInfoForm () {
    let backgroundFadeOut = document.createElement('div');
    backgroundFadeOut.classList.add('backgroundFadeOut');
    container.insertBefore(backgroundFadeOut, header);
    backgroundFadeOut.addEventListener('click', backgroundClickExit);
    
    const formDiv = document.createElement('div');
    formDiv.id = 'formDiv';
    container.appendChild(formDiv);

    const bookInformation = document.createElement('p');
    bookInformation.id = 'bookInformation';
    bookInformation.textContent = "Book Information";
    formDiv.appendChild(bookInformation);

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
    bookPageCountText.id = 'bookTitleText';
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
    submitButton.style.textDecoration = 'underline';
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
    if (bookAuthorInput.required && bookPageCountInput.required && bookTitleInput.required) {
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
            const bookInformation = document.getElementById('bookInformation');
            if (!document.getElementById('inLibrary')) { 
                bookInformation.insertAdjacentElement('afterend', inLibrary); 
            }
        } else {
            myLibrary.push(getBookInformation());
            console.log(myLibrary);
            addBookToLibrary();
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

function addBookToLibrary () {
    myLibrary.forEach(function (book) {
        console.log('Book Title: ' + book.title);
        console.log('Book Author: ' + book.author);
        let bookInformation = book.info();
        console.log(bookInformation);
        //console.log(bookList.querySelector(`[data-title='${book.title}']`));
        
        if ((!document.querySelector(`[data-title='${book.title}']`) && !document.querySelector(`[data-author='${book.author}']`)) 
        || (document.querySelector(`[data-title='${book.title}']`) && !document.querySelector(`[data-author='${book.author}']`))) {
            let newBookDiv = document.createElement('div');
            newBookDiv.className = 'libraryBook';
            newBookDiv.dataset.title = `${book.title}`;
            newBookDiv.dataset.author = `${book.author}`;
            console.log(newBookDiv.dataset.title);
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
            bookHolder.appendChild(readStatus);

            readStatus.addEventListener('click', function () {
                readStatus = document.getElementById(`${book.title}-${book.author}-readStatus`)
                if (readStatus.textContent === '[Read]') {
                    readStatus.textContent = '[Unread]';
                } else {
                    readStatus.textContent = '[Read]'
                }
            });
            console.log(myLibrary);
        }
    }) 
    
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
    console.log(myLibrary);
}

function doubleCheckDelete(bookTitle, bookAuthor, eventData) {
    console.log(bookTitle + bookAuthor);
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
                let libraryLength = (myLibrary.length - 1).toString();
                if (book === libraryLength) {
                    myLibrary.pop();
                    console.log(myLibrary);
                    bookToDelete.remove();
                } else if (book === '0') {
                    myLibrary.shift();
                    console.log(myLibrary);
                    bookToDelete.remove();
                } else {
                    myLibrary.splice(book, 1);
                    bookToDelete.remove();
                    console.log(myLibrary);
                }
                
                
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

function swapReadStatus() {
    let readStatus = bookList.getElementsByClassName('readStatus');
    
    console.log(readStatus);
}

function removeForm () {
    let formDiv = document.getElementById('formDiv');
    formDiv.remove();
}

function Book(title, author, pageCount, readStatus) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    if (readStatus === true) {
        this.isRead = function () {
            return 'Read';
        }

    } else {
        this.isRead = function () {
            return 'Unread';
        }
    }
    this.readStatus = readStatus;
    this.info = function () {
        let bookInfo = title + ' by ' + author + ', ' + pageCount + ' pages, ' + this.isRead();
        return bookInfo;
    }
} 