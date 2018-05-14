import { Injectable } from '@angular/core';
import { Book } from '../admin/books-data/books-data.component'
import * as _ from "lodash";

@Injectable({
  providedIn: 'root'
})

export class BookService {

  constructor() { }

  getBooks(): Book[] {
    let BOOKS_DATA: Book[];

    if (localStorage.getItem("bo")) {
      BOOKS_DATA = JSON.parse(localStorage.getItem("bo"));
    } else {
      // Initial data
      BOOKS_DATA = [
        { isbn: 1, name: 'Hydrogen', quantity: 9, author: 'H' },
        { isbn: 2, name: 'Helium', quantity: 6, author: 'He' },
        { isbn: 3, name: 'Hydrogen', quantity: 9, author: 'H' },
        { isbn: 4, name: 'Helium', quantity: 6, author: 'He' }
      ];
      this.setBooks(BOOKS_DATA)
    }
    return BOOKS_DATA;
  }

  getBooksString() {
    return localStorage.getItem("bo")
  }

  addBook(book: Book) {
    let BOOKS_DATA: Book[] = this.getBooks()
    BOOKS_DATA.push(book)
    this.setBooks(BOOKS_DATA)
  }

  setBooks(books: Book[]) {
    localStorage.setItem("bo", JSON.stringify(books));
  }

  deleteBook(isbn: number) {
    let updatedBooks: Book[] = this.getBooks();

    _.remove(updatedBooks, function (book) {
      return book.isbn === isbn;
    });

    this.setBooks(updatedBooks)
  }
}
