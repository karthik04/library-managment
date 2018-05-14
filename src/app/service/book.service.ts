import { Injectable } from '@angular/core';
import { Book } from '../admin/books-data/books-data.component'

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
        { isbn: 3, name: 'Lithium', quantity: 2, author: 'Li' },
        { isbn: 4, name: 'Beryllium', quantity: 2, author: 'Be' },
        { isbn: 5, name: 'Boron', quantity: 1, author: 'B' },
        { isbn: 6, name: 'Carbon', quantity: 17, author: 'C' }
      ];
      this.setBooks(BOOKS_DATA)
    }
    return BOOKS_DATA;
  }

  addBook(book: Book){
    debugger;
    let BOOKS_DATA: Book[] = this.getBooks()
    BOOKS_DATA.push(book)
    this.setBooks(BOOKS_DATA)
  }

  setBooks(books: Book[]){
    localStorage.setItem("bo", JSON.stringify(books));
  }
}
