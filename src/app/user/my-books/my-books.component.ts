import { Component, OnInit, DoCheck } from '@angular/core';
import { BookService } from '../../service/book.service';
import { Book } from '../../admin/books-data/books-data.component';
import { MatTableDataSource, MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss']
})
export class MyBooksComponent implements OnInit, DoCheck {
  displayedColumns = ['isbn', 'name', 'author', 'return'];
  dataSource;
  guestUserId = 0;

  constructor(private bookService: BookService, public snackBar: MatSnackBar) {
    const BOOKS_DATA: Book[] = bookService.getUserBooks(this.guestUserId);
    this.dataSource = new MatTableDataSource(BOOKS_DATA);
  }

  ngOnInit() {
  }

  ngDoCheck() {

    if (this.dataSource.data.length !== this.bookService.getUserBooks(this.guestUserId).length) {
      this.dataSource = new MatTableDataSource(this.bookService.getUserBooks(this.guestUserId));
    }
  }

  returnBook(isbn: number, uid: number) {
    this.bookService.returnBook(isbn, uid);
    this.snackBar.open('Book returned successfully', 'OK', {
      duration: 4000,
    });
  }
}
