import { QuizService } from './../../../services/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories = []

  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: 'false',
    category: {
      cid: '',
    },
  };

  constructor(private _categories: CategoryService, private _snack: MatSnackBar, private _quiz: QuizService) { }

  ngOnInit(): void {

    this._categories.categories().subscribe(
      (data: any) => {
        //Categorie Load
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.log(error);
        Swal.fire("Error..!!", "Error in loading data from server", "error");
      }
    )
  }

  addQuiz() {
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this._snack.open('Title Required..!!', '', {
        duration: 3000,
      });
      return;
    }
    //validation...
    this._quiz.addQuiz(this.quizData).subscribe(
      (data: any) => {
        Swal.fire("Success..!!", "Quiz is added sucessfully", "success");
        this.quizData = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestions: '',
          active: 'false',
          category: {
            cid: '',
          },
        };
      },
      (error) => {
        console.log(error);
        Swal.fire("Error..!!", "Quiz is not added", "error");
      }
    );
  }
} 
