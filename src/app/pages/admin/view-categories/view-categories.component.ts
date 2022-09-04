import Swal from 'sweetalert2';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories = [];

  constructor(private _categories:CategoryService) { }

  ngOnInit(): void {
    this._categories.categories().subscribe((data:any)=>
    {
      //Success
      this.categories=data;
      console.log(this.categories);
    },
    (error)=>
    {
      console.log(error);
      Swal.fire("Error..!!",  "Error in loadin data", "error");
    })
  }

}
