import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'questions',
  templateUrl: './questions.component.html',
})
export class QuestionsComponent{
  constructor(public api: ApiService, private route: ActivatedRoute) { }

  quizId: string | null = '';
  public question: any = {};
  questions: any = {};
  onGetApi() {
    this.api.getQuestion(this.quizId).subscribe(res => {
      console.log(res);
      this.questions = res;
    })

  }

  ngOnInit(): void {

    this.quizId = this.route.snapshot.paramMap.get('quizId');

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

