import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { CategoryService } from './../../../services/category.service';
import { QuizService } from './../../../services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _quiz: QuizService, private _category: CategoryService, private _snack: MatSnackBar, private _router: Router) { }

  qId =0;
  quiz;
  categories;

  ngOnInit(): void {

    this.qId = this._route.snapshot.params['qid'];
    // alert(this.qId);

    this._quiz.getQuiz(this.qId).subscribe(
      (data:any)=>{
        this.quiz = data;
        console.log(this.quiz);
      },
      (error) => {
        console.log(error);
      }
    ),

    this._category.categories().subscribe(
      (data:any)=>{
        this.categories = data;
      },
      (error)=>{
        Swal.fire("Error..!!", "Error in loading category", "error");
      }
    )
  }

  //Update quiz submit
  public updateQuiz() {
    if (this.quiz.title.trim() == '' || this.quiz.title == null) {
      this._snack.open('Title Required..!!', '', {
        duration: 3000,
      });
      return;
    }
    //validation...
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data: any) => {
        Swal.fire("Success..!!", "Quiz is updated sucessfully", "success").then((e)=>{
          this._router.navigate(['/admin/quizzes']);
        });
      },
      (error) => {
        console.log(error);
        Swal.fire("Error..!!", "Quiz is not added", "error");
      }
    );
  }
}
