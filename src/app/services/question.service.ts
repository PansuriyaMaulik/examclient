import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http: HttpClient) { }

  //Get all question of quiz
  public getQuestionsOfQuiz(qid)
  {
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`)
  }

  //Get particular question of quiz
  public getQuestionsOfQuizForTest(qid)
  {
    return this._http.get(`${baseUrl}/question/quiz/${qid}`)
  }

  //Add question
  public addQuestion(question){
    return this._http.post(`${baseUrl}/question/`, question)
  }

  //get the single question
  public getQuestion(questionId)
  {
    return this._http.get(`${baseUrl}/question/${questionId}`);
  }

  //update Question
  public updateQuestion(question)
  {
    return this._http.put(`${baseUrl}/question/`, question);
  }

  //delete Question
  public deleteQuestion(questionId)
  {
    return this._http.delete(`${baseUrl}/question/${questionId}`, questionId);
  }
}
