import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  category;

  constructor(private _categories: CategoryService, private _snack: MatSnackBar) { }

  ngOnInit(): void {
    this._categories.categories().subscribe(
      (data:any)=>
      {
        this.category = data;
      },
      (error)=>
      {
        this._snack.open("Error in loading category", "", {
          duration: 3000,
        })
      }
    )
  }

}
