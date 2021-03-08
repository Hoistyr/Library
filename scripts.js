let myLibrary = [];

pageLoad();

function pageLoad () {
    let addBookButton = document.getElementById('addBookButton')
    addBookButton.addEventListener('click', bookInfoForm);
}

function bookInfoForm () {
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
            removeForm();
        } 
    }   
}

function bookCheck (newBook) {
    console.log(newBook.title);
    return true;
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
        
        if (!document.querySelector(`[data-title='${book.title}']`) && !document.querySelector(`[data-author='${book.author}']`)) {
            let newBookDiv = document.createElement('div');
            newBookDiv.className = 'libraryBook';
            newBookDiv.dataset.title = `${book.title}`;
            newBookDiv.dataset.author = `${book.author}`;
            console.log(newBookDiv.dataset.title);
            bookList.appendChild(newBookDiv);
            let bookHolder = document.querySelector(`[data-title='${book.title}']`);
            let title = document.createElement('p');
            title.textContent = book.title;
            title.className = 'title'
            bookHolder.appendChild(title);
            
            let author = document.createElement('p');
            author.textContent = book.author;
            author.className = 'author'
            bookHolder.appendChild(author);
            
            let pageCount = document.createElement('p');
            pageCount.textContent = `${book.pageCount} pages`;
            pageCount.className = 'pageCount'
            bookHolder.appendChild(pageCount);
            
            let readStatus = document.createElement('p');
            console.log(book.isRead);
            readStatus.textContent = book.isRead();
            readStatus.className = 'readStatus'
            bookHolder.appendChild(readStatus);
            
        } else if (document.querySelector(`[data-title='${book.title}']`) && !document.querySelector(`[data-author='${book.author}']`)) {
            let newBookDiv = document.createElement('div');
            
            newBookDiv.className = 'libraryBook';
            newBookDiv.dataset.title = `${book.title}`;
            newBookDiv.dataset.author = `${book.author}`;
            bookList.appendChild(newBookDiv);
        }
        
        else {
            const formDiv = document.getElementById('fromDiv');
            console.log(formDiv);
            console.log('already in library');
            
        }
    }) 
    
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
            return 'read';
        }

    } else {
        this.isRead = function () {
            return 'unread';
        }
    }
    this.readStatus = readStatus;
    this.info = function () {
        let bookInfo = title + ' by ' + author + ', ' + pageCount + ' pages, ' + this.isRead();
        return bookInfo;
    }
} 