import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.css']
})
export class AddItemDialogComponent {
  place?: string;
  selectedOption?: string;

  @Output() formSubmit = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<AddItemDialogComponent>,
  ) {
  }

  options: any = [
    {value: 'A', viewValue: 'a'},
    {value: 'B', viewValue: 'b'},

  ]

  confirmSelection() {
    this.dialogRef.close({name: this.place, toggled: true, url: this.selectedOption});
  }
}
