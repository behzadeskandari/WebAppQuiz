import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
})
export class QuestionComponent{
  constructor(public api: ApiService) {

  }
  public question: any = {};
  ngOnInit() {
    this.api.questionSelected.subscribe(question => this.question = question);
  }
  post(question: any) {
    this.api.postQuestion(question);

    console.log('question',question)
  }

}

