import { Component, OnInit } from '@angular/core';
import {BookService} from '../../service/book.service'

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  constructor(private bookService:BookService) { }

  ngOnInit() {
  }

  submitBook(form) {
    console.log(form.value);
    this.bookService.addBook(form.value)
    alert("Book added successfully");

    //Reset from
    form.reset();
    form.markAsUntouched();
    Object.keys(form.controls).forEach((name) => {
      form.controls[name].setErrors(null);
    });
  }

}
