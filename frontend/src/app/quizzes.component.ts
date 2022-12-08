import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-quizzes`',
  templateUrl: './quizzes.component.html',
})
export class QuizzesComponent{
  constructor(public api: ApiService) { }


  quiz: any = {};
  quizzes : any = {};

  onGetApi() {
    this.api.getQuizzes().subscribe(res => {
      console.log(res);
      this.quizzes = res;
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

