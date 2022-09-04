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

  constructor(private _route: ActivatedRoute, private _questions: QuestionService) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this._questions.getQuestionsOfQuiz(this.qId).subscribe(
      (data:any) => {
        this.questions = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
