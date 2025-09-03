import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  imports: [MatDialogContent, MatButtonModule],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent {

  data: any = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<ConfirmationComponent>)

  onConfirmation(){
    this.dialogRef.close(true);
  }
  onCancel(){
    this.dialogRef.close(false);
  }

}
