import { Component, OnInit } from '@angular/core';
import { BookService } from '../../service/book.service'
import {Book} from '../../admin/books-data/books-data.component'
import { MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss']
})
export class MyBooksComponent implements OnInit {
  displayedColumns = ['isbn', 'name', 'author'];
  dataSource;
  guestUserId:number=0;

  constructor(private bookService: BookService) { 
    let BOOKS_DATA: Book[] = bookService.getUserBooks(this.guestUserId);
    this.dataSource = new MatTableDataSource(BOOKS_DATA);
  }

  ngOnInit() {
  }

  ngDoCheck() {

    if (this.dataSource.data.length !== this.bookService.getUserBooks(this.guestUserId).length) {
      this.dataSource = new MatTableDataSource(this.bookService.getUserBooks(this.guestUserId));
    }
  }
}
