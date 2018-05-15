import { Component, OnInit } from '@angular/core';
import { BookService } from '../service/book.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private bookService: BookService) {
    bookService.setAdmin(false);
  }

  ngOnInit() {
  }

}
