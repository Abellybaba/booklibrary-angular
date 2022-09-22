import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'my-lib-assign';

  //import from Mat table API 
  displayedColumns: string[] = ['authorsName', 'bookName', 'ISBNnumber', 'category', 'date', 'condition', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog : MatDialog, private api : ApiService){

  }
  ngOnInit(): void {
   this.getAllBooks();
  }
  
  
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '70%'
      
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllBooks();
      }
    })
  }

  getAllBooks(){
    this.api.getBook()
    .subscribe({
      next: (res) =>{
        this.dataSource = new MatTableDataSource(res) 
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err)=>{
        alert("Error while fetching data");
      }
    })
  }

  //delete method to delete book in library
  deleteBook(id:number){
    this.api.deleteBook(id).subscribe({
      next:(res)=>{
        alert("Book Deleted Successfully")
        this.getAllBooks();
      },
      error:()=>{
        alert("Error while deleting book from library")
      }
    })
    
    
  }

  //Filtering implementation
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

//Edit dialog box book record
  editBook(row : any)
  {
    this.dialog.open(DialogComponent, 
      {width: '70%', 
      data: row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllBooks();
      }
    })
  }
}

