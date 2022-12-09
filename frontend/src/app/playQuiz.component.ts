import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FinishedComponent } from './finished.component';

@Component({
  templateUrl: './playQuiz.component.html'
})
export class PlayQuizComponent {

  constructor(public api : ApiService, private route: ActivatedRoute,private dialog: MatDialog) {}
  questions : any = {};
  quizId: string | null = '';
  step = 0;

  ngOnInit() {
    this.quizId = this.route.snapshot.paramMap.get('quizId');
    this.api.getQuestion(this.quizId).subscribe(res => {
      this.questions = res;
      this.questions.forEach((q : any) => {
        q.answers = [
          q.CorrectAnswer,
          q.Answer1,
          q.Answer2,
          q.Answer3
        ]
        shuffle(q.answers);
      })
    })
  }


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  finish() {
    var correct = 0;
    this.questions.forEach((q: any) => {
      if (q.correctAnswer == q.selectedAnswer) {
        correct++;
      }
    })
    const dialogRef = this.dialog.open(FinishedComponent, {
      data: { correct,total: this.questions.length },
    });
    console.log(correct);
  }
}


function shuffle(answer : any) {
  for (let i = answer.length; i ; i++) {
    let j = Math.floor(Math.random() * i);
    //Shuffling The answers
    [answer[i - 1], answer[j]] = [answer[j], answer[i - 1]];

  }
}
