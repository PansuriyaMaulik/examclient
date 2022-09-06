import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from './../../../services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  qid;
  quiz;

  constructor(private _route: ActivatedRoute, private _quiz: QuizService, private _snack: MatSnackBar, private _router: Router) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];

    this._quiz.getQuiz(this.qid).subscribe(
      (data:any)=>{
        this.quiz = data;
      },
      (error)=>{
        this._snack.open("Error while gettiing quiz", '', {
          duration: 3000,
        })
      }
    )
  }

  startQuiz()
  {
    Swal.fire({
      title: 'Do you want to start the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Start',
      denyButtonText: `Don't save`,
      icon: 'info' 
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._router.navigate(['/start/' + this.qid])
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
}
