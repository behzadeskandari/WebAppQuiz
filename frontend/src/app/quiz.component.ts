import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html'
})
export class QuizComponent {

  constructor(public api : ApiService) {}
  quiz : any = {}

  ngOnInit() {
    this.api.quizSelected.subscribe(quiz => this.quiz = quiz);

  }


}
