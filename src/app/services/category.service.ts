import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http:HttpClient) { }

  //Load all the categories
  public categories()
  {
    return this._http.get(`${baseUrl}/category/`)
  }

  //Add new category
  public addCategory(categoty)
  {
    return this._http.post(`${baseUrl}/category/`, categoty);
  }
}
