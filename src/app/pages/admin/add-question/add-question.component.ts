import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionService } from './../../../services/question.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public Editor = ClassicEditor;

  qId;
  qTitle;
  question = {
    quiz: {},
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  }

  constructor(private _route: ActivatedRoute, private _question: QuestionService, private _snack: MatSnackBar) { }

  ngOnInit(): void {

    this.qId = this._route.snapshot.params['qid'];
    this.question.quiz['qId'] = this.qId;
    this.qTitle = this._route.snapshot.params['title'];
  }

  //Add question----form submit
  addQuestion() {

    // Validation....
    if (this.question.content.trim() == '' || this.question.content == null) {
      this._snack.open('Title Required..!!', '', {
        duration: 3000,
      });
      return;
    }

    if (this.question.option1.trim() == '' || this.question.option1 == null) {
      return;
    }

    if (this.question.option2.trim() == '' || this.question.option2 == null) {
      return;
    }

    if (this.question.answer.trim() == '' || this.question.answer == null) {
      return;
    }

    //Form Submit...
    this._question.addQuestion(this.question).subscribe(
      (data: any) => {
        Swal.fire("Success..!!", "Question is added sucessfully", "success");
        this.question = {
          quiz: {},
          content: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          answer: '',
        };
      },
      (error) => {
        console.log(error);
        Swal.fire("Error..!!", "Question is not added", "error");
      }
    );
  }
}
