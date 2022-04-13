import { Component, Inject, INJECTOR, OnInit } from '@angular/core';
import { FormGroup , FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dailog',
  templateUrl: './dailog.component.html',
  styleUrls: ['./dailog.component.scss']
})
export class DailogComponent implements OnInit {

  freshnessList=["Brand New","Second Hand","Refurbished"]
  productForm !: FormGroup
  actionBtn:string ="Save"
  constructor(private formBuilder:FormBuilder, private api:ApiService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef:MatDialogRef<DailogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName : ['',Validators.required],
      category : ['',Validators.required],
      freshness : ['',Validators.required],
      price : ['',Validators.required],
      comment : ['',Validators.required],
      date : ['',Validators.required]
    })
    console.log(this.editData)

    if(this.editData){
      this.actionBtn="Update"
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }
  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value).subscribe({
          next:(res)=>{
            alert("Product Added Successfully");
            this.productForm.reset();
            this.dialogRef.close('Save');
          },
          error:()=>{
            alert("Error While Adding The Product")
          }
        })
      }
    }else{
      this.updateProduct()
    }
    //console.log(this.productForm.value)
  }

  updateProduct(){
    this.api.putProduct(this.productForm.value,this.editData.id).subscribe({
      next:(res)=>{
        alert("Product Updated Successfully")
        this.productForm.reset();
        this.dialogRef.close('Update');
      },
      error:()=>{
        alert("Error While Updating the Record!!!");
      }
    })
  }

}
