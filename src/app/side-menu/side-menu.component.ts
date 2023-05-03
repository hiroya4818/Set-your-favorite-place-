import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { AddItemDialogComponent } from '../add-item-dialog/add-item-dialog.component';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {
  @ViewChild(MatDrawer) drawer!: MatDrawer;
  @Input() items: any;
  @Output() itemsChange = new EventEmitter<any>();

  constructor(
    public dialog: MatDialog
  ) {}


  drawerFlag = false;

  toggleDrawer(): void {
    this.drawer.toggle();
  }

  closeDrawerContainer(): void {
    this.drawerFlag = false;
    this.drawer.close();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(AddItemDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        this.items.push(result);
        this.itemsChange.emit(this.items);
        console.log(result);
    });
  }


}
