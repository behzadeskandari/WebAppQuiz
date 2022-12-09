import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BASE_URL_QUESTION: string = 'https://localhost:44364/api/Questions';
  BASE_URL_QUIZ: string = 'https://localhost:44364/api/Quizzes';


  private selectedQestion = new Subject<any>();
  questionSelected = this.selectedQestion.asObservable();

  private selectedQuiz = new Subject<any>();
  quizSelected = this.selectedQuiz.asObservable();


  constructor(private http: HttpClient) { }

  getQuestion(quizId: any) {
    return this.http.get(`https://localhost:44364/api/Questions/${quizId}`);
  }
  getQuizzes() {
    return this.http.get(this.BASE_URL_QUIZ);

  }
  postQuestion(question: any) {
    this.http.post(this.BASE_URL_QUESTION, question).subscribe(res => {
      console.log(res, 'resss');
    })

  }

  putQuestion(question: any) {
    this.http.put(`https://localhost:44364/api/Questions/${question.id}`, question).subscribe(res => {

      console.log(res, 'resss');

    })
  }


  postQuiz(question: any) {
    this.http.post(this.BASE_URL_QUIZ, question).subscribe(res => {
      console.log(res, 'resss');
    })
  }

  putQuiz(quiz: any) {
    this.http.put(`https://localhost:44364/api/Quizzes/${quiz.id}`, quiz).subscribe(res => {
      console.log(res, 'resss');
    })
  }
  selectedQuestion(question: any) {
    this.selectedQestion.next(question);
  }

  selectQuiz(quiz: any) {
    this.selectedQuiz.next(quiz);
  }
}
