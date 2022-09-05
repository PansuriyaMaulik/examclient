import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { QuestionService } from './../../../services/question.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId;
  qTitle;
  questions = [];

  constructor(private _route: ActivatedRoute, private _questions: QuestionService, private _snack: MatSnackBar) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this._questions.getQuestionsOfQuiz(this.qId).subscribe(
      (data: any) => {
        this.questions = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  //delete Questions
  deleteQuestion(qid) {
    Swal.fire(
      {
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        title: 'Are you sure, want to delete this question?'
      }).then((result) => {
        if (result.isConfirmed) {
          //confirm to delete
          this._questions.deleteQuestion(qid).subscribe(
            (data) => {
              this._snack.open("Question Deteled..!!", "", {
                duration: 3000,
              });
              this.questions = this.questions.filter((q) => q.quesId != qid);
            },
            (error) => {
              this._snack.open('Error in deleting questions', '', {
                duration: 3000,
              })
            })
        }
      });
  }
}
