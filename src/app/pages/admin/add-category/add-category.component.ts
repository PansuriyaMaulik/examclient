import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category = {
    title: '',
    description: '',
  }

  constructor(private _category: CategoryService, private _snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if (this.category.title.trim() == '' || this.category.title == null) {
      this._snack.open('Title Required..!!', '', {
        duration: 3000,
      });
      return;
    }
    //all done
    this._category.addCategory(this.category).subscribe(
      (data: any) => {
        this.category.title = '',
        this.category.description = '',
        Swal.fire("Success..!!", "Category is added sucessfully", "success");
      },
      (error) => {
        console.log(error);
        Swal.fire("Error..!!", "Category is not added", "error");
       }
    );
  }
}
