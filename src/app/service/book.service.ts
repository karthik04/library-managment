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
        { isbn: 4938497, name: 'War and Peace', quantity: 90, author: 'Stefan', user: 0 },
        { isbn: 4323254, name: 'Great Books', quantity: 60, author: 'Michale' },
        { isbn: 3678741, name: 'Best Books Ever', quantity: 56, author: 'Kittler' },
        { isbn: 5564534, name: 'The Graphic Canon', quantity: 26, author: 'Susanne' },
        { isbn: 4863594, name: '100 Life-Changing Books', quantity: 61, author: 'Andreas', user: 0 },
        { isbn: 9483958, name: 'How to Read Literature', quantity: 10, author: 'Thomas C. Foster' },
        { isbn: 3642424, name: '100 Greatest Books', quantity: 96, author: 'Easton', user: 0 }
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
