import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from './../../../services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId;
  quizzes;

  constructor(private _route: ActivatedRoute, private _quiz: QuizService, private _snack: MatSnackBar, ) { }

  ngOnInit(): void {
    this._route.params.subscribe((params)=>
    {
      this.catId = params['catId'];

      if(this.catId == 0){
        this._quiz.getActiveQuizzes().subscribe(
          (data)=>{
            this.quizzes = data;
          },
          (error)=>
          {
            this._snack.open("Error while loading the all quiz", '', {
              duration: 3000,
            })
          }
        )
      }else 
      {
        console.log("Load Specific Quiz");
        this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
          (data:any)=>{
            this.quizzes = data;
          },
          (error)=>{
            this._snack.open("Error while loading the specific quiz", '', {
              duration: 3000,
            })
          }
        )
      }
    })
  }
}
