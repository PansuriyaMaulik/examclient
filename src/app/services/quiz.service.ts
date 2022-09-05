import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http: HttpClient) { }

  public quizzes(){
    return this._http.get(`${baseUrl}/quiz/`);
  }

  //Add quiz
  public addQuiz(quiz)
  {
    return this._http.post(`${baseUrl}/quiz/`, quiz);
  }

  //delete Quiz
  public deleteQuiz(qId)
  {
    return this._http.delete(`${baseUrl}/quiz/${qId}`)
  }

  //get the single quiz
  public getQuiz(qId)
  {
    return this._http.get(`${baseUrl}/quiz/${qId}`);
  }

  //update Quiz
  public updateQuiz(quiz)
  {
    return this._http.put(`${baseUrl}/quiz/`, quiz);
  }
}

