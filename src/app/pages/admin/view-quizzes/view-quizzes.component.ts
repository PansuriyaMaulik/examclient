import Swal from 'sweetalert2';
import { QuizService } from './../../../services/quiz.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes = [];

  constructor(private _quiz: QuizService) { }

  ngOnInit(): void {

    this._quiz.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);
        // Swal.fire("Success..!!", "Quiz added successfully", "success");
      },
      (error) => {
        console.log(error);
        Swal.fire("Error..!!", "No quiz added", "error");
      }
    )
  }

  //delete quiz from database
  deleteQuiz(qId) {
    Swal.fire({
      icon: 'info',
      'title':  "Are you sure?",
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result)=>{
      if(result.isConfirmed)
      {
        //delete quiz
        this._quiz.deleteQuiz(qId).subscribe(
          (data: any) => {
            this.quizzes = this.quizzes.filter((quiz) => quiz.qId != qId);
            Swal.fire("Success..!!", "Quiz deleted successfully", "success");
          },
          (error) => {
            console.log(error);
            Swal.fire("Error..!!", "Error in deleting quiz", "error");
          }
        );
      }
    })
  }

}
