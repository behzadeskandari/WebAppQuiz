import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'questions',
  templateUrl: './questions.component.html',
})
export class QuestionsComponent{
  constructor(public api: ApiService) {

  }
  public question: any = {};
  questions: any = {};
  onGetApi() {
    this.api.getQuestion().subscribe(res => {
      console.log(res);
      this.questions = res;

    })
  }

  ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
    this.onGetApi();
  }
  ngOnChanges(): void {
    this.onGetApi();
  }


  ngOnDestroy() {

  }
}

