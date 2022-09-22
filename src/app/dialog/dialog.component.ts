import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  Bookcondition = ['Brand New', 'Almost New', 'Used'];
  libraryForm!: FormGroup;
  actionBtn: string = 'Save';
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any, //inject for edit data to display in dialog
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.libraryForm = this.formBuilder.group({
      authorsName: ['', Validators.required],
      bookName: ['', Validators.required],
      ISBNnumber: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      condition: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.libraryForm.controls['authorsName'].setValue(
        this.editData.authorsName
      );
      this.libraryForm.controls['bookName'].setValue(this.editData.bookName);
      this.libraryForm.controls['ISBNnumber'].setValue(
        this.editData.ISBNnumber
      );
      this.libraryForm.controls['category'].setValue(this.editData.category);
      this.libraryForm.controls['date'].setValue(this.editData.date);
      this.libraryForm.controls['condition'].setValue(this.editData.condition);
    }
  }

  addBook() {
    if (!this.editData) {
      if (this.libraryForm.valid) {
        this.api.postBook(this.libraryForm.value).subscribe({
          next: (res) => {
            alert('Book added successfully');
            this.libraryForm.reset();
            this.dialogRef.close('saved');
          },
          error: () => {
            alert('Error adding book');
          },
        });
      }
    } else {
      this.updateBook();
    }
  }

  updateBook() {
    this.api.putBook(this.libraryForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Book Updated Successfully');
        this.libraryForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        alert('Error while updating book');
      },
    });
  }
}
