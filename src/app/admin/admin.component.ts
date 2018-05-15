import { Component, OnInit } from '@angular/core';
import { BookService } from '../service/book.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private bookService: BookService) { 
    bookService.setAdmin(true)
  }

  ngOnInit() {
  }

}
