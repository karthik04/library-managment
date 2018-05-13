import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-books-data',
  templateUrl: './books-data.component.html',
  styleUrls: ['./books-data.component.scss']
})
export class BooksDataComponent implements OnInit {
  displayedColumns = ['isbn', 'name', 'quantity', 'author'];
  dataSource = new MatTableDataSource(BOOKS_DATA);

  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}



export interface Element {
  name: string;
  isbn: number;
  quantity: number;
  author: string;
}

const BOOKS_DATA: Element[] = [
  { isbn: 1, name: 'Hydrogen', quantity: 9, author: 'H' },
  { isbn: 2, name: 'Helium', quantity: 6, author: 'He' },
  { isbn: 3, name: 'Lithium', quantity: 2, author: 'Li' },
  { isbn: 4, name: 'Beryllium', quantity: 2, author: 'Be' },
  { isbn: 5, name: 'Boron', quantity: 1, author: 'B' },
  { isbn: 6, name: 'Carbon', quantity: 17, author: 'C' }
];
