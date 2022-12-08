import { Component } from '@angular/core';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
})
export class QuestionComponent{
  title = 'my app';
  public question: any;
  post(question:any) {
    console.log('question',question)
  }

}

