import { Component,Inject } from '@angular/core';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
   templateUrl: './finished.component.html',
})
export class FinishedComponent {

  data: any = {};

  constructor(@Inject(MAT_DIALOG_DATA) private Matdata: any){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.data = this.Matdata;
  }

}
