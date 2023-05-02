import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.css']
})
export class AddItemDialogComponent {
  favoritePlace = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<AddItemDialogComponent>,
  ) {
  }

  confirmSelection() {
    this.dialogRef.close('OK');
  }
}
