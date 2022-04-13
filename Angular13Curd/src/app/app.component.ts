import { Component, OnInit , ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DailogComponent } from './dailog/dailog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular13Curd';

  displayedColumns: string[] = ['productName', 'category','date','freshness','price','comment','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog,private api:ApiService){}

  openDialog() {
    this.dialog.open(DailogComponent, {
      width:'30%',
    }).afterClosed().subscribe(val=>{
      if(val ==="Save"){
        this.getAllProduct();
      }
    })
  }

  editProduct(row:any){
    this.dialog.open(DailogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val ==="Update"){
        this.getAllProduct();
      }
    })
  }

  getAllProduct(){
    this.api.getProduct().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator,
        this.dataSource.sort = this.sort
        //console.log(res)
      },
      error:(err)=>{
        alert("Error While Fetching the Records")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getAllProduct();
  }
}
