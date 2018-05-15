import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import {BookService} from '../../service/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  constructor(private bookService:BookService, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  submitBook(form) {
    console.log(form.value);
    if(this.bookService.addBook(form.value)){
      this.snackBar.open('Book added successfully', 'OK', {
        duration: 4000,
      });
    } else{
      this.snackBar.open('ISBN already exists', 'OK', {
        duration: 4000,
      });
    }


    //Reset from
    form.reset();
    form.markAsUntouched();
    Object.keys(form.controls).forEach((name) => {
      form.controls[name].setErrors(null);
    });
  }

}
