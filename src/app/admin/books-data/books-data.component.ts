import { Component, OnInit, DoCheck, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { BookService } from '../../service/book.service'

@Component({
  selector: 'app-books-data',
  templateUrl: './books-data.component.html',
  styleUrls: ['./books-data.component.scss']
})
export class BooksDataComponent implements OnInit {
  displayedColumns = ['isbn', 'name', 'quantity', 'author', 'delete'];
  dataSource;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private bookService: BookService, public snackBar: MatSnackBar) {
    let BOOKS_DATA: Book[] = bookService.getBooks();
    this.dataSource = new MatTableDataSource(BOOKS_DATA);
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  ngDoCheck() {

    if (JSON.stringify(this.dataSource.data) !== this.bookService.getBooksString()) {
      this.dataSource = new MatTableDataSource(this.bookService.getBooks());
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  deleteBook(isbn: number) {
    this.bookService.deleteBook(isbn)
    this.snackBar.open('Book deleted successfully', 'OK', {
      duration: 4000,
    });
  }
}



export interface Book {
  name: string;
  isbn: number;
  quantity: number;
  author: string;
}


