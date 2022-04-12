import { Component } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DailogComponent } from './dailog/dailog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular13Curd';

  constructor(private dialog:MatDialog){}

  openDialog() {
    this.dialog.open(DailogComponent, {
      width:'30%',
    });
  }
}
