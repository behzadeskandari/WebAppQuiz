import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html'
})
export class PlayComponent {

  constructor(public api : ApiService) {}
  quizzes: any = {};

  ngOnInit() {
    this.api.getAllQuizzes().subscribe(res => {
      this.quizzes = res;
    })
  }


}
