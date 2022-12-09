import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
})
export class QuestionComponent{
  constructor(public api: ApiService, private route: ActivatedRoute) { }

  quizId: string | null = '';

  public question: any = {};

  ngOnInit() {
    this.quizId = this.route.snapshot.paramMap.get('quizId');

    console.log(this.quizId);

    this.api.questionSelected.subscribe(question => this.question = question);
  }
  post(question: any) {
    this.api.postQuestion(question);
    question.quizId = this.quizId;

    console.log('questionsssss',question)
  }

}

