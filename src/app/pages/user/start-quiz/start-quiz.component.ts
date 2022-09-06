import Swal from 'sweetalert2';
import { LoadQuizComponent } from './../load-quiz/load-quiz.component';
import { QuestionService } from './../../../services/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  qid;
  questions;
  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;

  isSubmit = false;
  timer:any;

  constructor(private _route: ActivatedRoute, private _question: QuestionService, private _snack: MatSnackBar, private _location: LocationStrategy, private _router: Router) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this.preventBackButton();

    this.loadQuestions();
  }

  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data:any)=>{
        this.questions = data;
        console.log(data)
        this.timer = this.questions.length * 2 * 60;
        this.startTimer();
      },
      (error)=>{
        this._snack.open("Error while loading the question of the quiz", '', {
          duration: 3000, 
        })
      }
    )
  }

  preventBackButton()
  {
    history.pushState(null, null, location.href);
    this._location.onPopState(()=>{
      history.pushState(null, null, location.href)
    })
  }

  submitQuiz(){
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info' 
    }).then((e) =>{
      if(e.isConfirmed) {
        //Calculation

        this.evalQuiz();
      }
    });
  }

  startTimer()
  {
    let t:any = window.setInterval(()=>{
      //Call the code after 1 sec
      if(this.timer <= 0)
      {
        this.evalQuiz()
        clearInterval(t);
      } else
      {
        this.timer--;
      }
    }, 1000)
  }

  getFormattedTime(){
    let mm = Math.floor(this.timer/60);
    let ss = this.timer-mm*60;
    return `${mm} min: ${ss} sec`;
  }

  evalQuiz(){
    //Call to server to check question
    this._question.evalQuiz(this.questions).subscribe(
      (data:any)=>{
        console.log(data);
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted;
        this.isSubmit = true;
      },
      (error)=>{
        this._snack.open("Error while gettiing quiz", '', {
          duration: 3000,
        })
      }
    )

    //Client side question and answer checking
    // this.isSubmit = true;

        // this.questions.forEach(q => {
        //   if(q.givenAnswer == q.answer){
        //     this.correctAnswers++;
        //     let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
        //     this.marksGot += marksSingle;
        //   }

        //   if(q.givenAnswer.trim()!=''){
        //     this.attempted++;
        //   }
        // });

        // console.log("Correct: "+this.correctAnswers)
        // console.log("marks"+ this.marksGot)
        // console.log("attempted"+ this.attempted)
  }

  printPage(){
    window.print();
  }
}
