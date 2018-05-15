import { Injectable } from '@angular/core';
import { Book } from '../admin/books-data/books-data.component';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})

export class BookService {

  admin: boolean;

  constructor() { }

  getBooks(): Book[] {
    let BOOKS_DATA: Book[];

    if (localStorage.getItem('bo')) {
      BOOKS_DATA = JSON.parse(localStorage.getItem('bo'));
    } else {
      // Initial data
      BOOKS_DATA = [
        { isbn: 1, name: 'Hydrogen', quantity: 9, author: 'H', user: 0 },
        { isbn: 2, name: 'Helium', quantity: 6, author: 'He' },
        { isbn: 3, name: 'Hydrogen', quantity: 9, author: 'H', user: 0 },
        { isbn: 4, name: 'Helium', quantity: 6, author: 'He' }
      ];
      this.setBooks(BOOKS_DATA);
    }
    return BOOKS_DATA;
  }

  getBooksString() {
    return localStorage.getItem('bo');
  }

  getUserBooks(uid: number) {
    const allBooks: Book[] = this.getBooks();
    return _.filter(allBooks, ['user', 0]);
  }

  addBook(book: Book): boolean {
    const BOOKS_DATA: Book[] = this.getBooks();
    if (_.findIndex(BOOKS_DATA, ['isbn', book.isbn]) === -1) {
      BOOKS_DATA.push(book);
      this.setBooks(BOOKS_DATA);
      return true;
    } else {
      return false;
    }
  }

  setBooks(books: Book[]) {
    localStorage.setItem('bo', JSON.stringify(books));
  }

  deleteBook(isbn: number) {
    const updatedBooks: Book[] = this.getBooks();

    _.remove(updatedBooks, function (book) {
      return book.isbn === isbn;
    });

    this.setBooks(updatedBooks);
  }

  isAdmin(): boolean {
    return this.admin;
  }
  setAdmin(val: boolean) {
    this.admin = val;
  }

  issueBook(isbn: number, uid: number): boolean {
    const BOOKS_DATA: Book[] = this.getBooks();
    const bookIndex = _.findIndex(BOOKS_DATA, ['isbn', isbn]);
    if (BOOKS_DATA[bookIndex].user !== uid) {
      BOOKS_DATA[bookIndex].user = uid;
      this.setBooks(BOOKS_DATA);
      return true;
    } else {
      return false;
    }
  }

  returnBook(isbn: number, uid: number) {
    const BOOKS_DATA: Book[] = this.getBooks();
    const bookIndex = _.findIndex(BOOKS_DATA, ['isbn', isbn]);
    BOOKS_DATA[bookIndex].user = -1;
    this.setBooks(BOOKS_DATA);
  }

}
