import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-dailog',
  templateUrl: './dailog.component.html',
  styleUrls: ['./dailog.component.scss']
})
export class DailogComponent implements OnInit {

  freshnessList=["Brand New","Second Hand","Refurbished"]
  productForm !: FormGroup
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName : ['',Validators.required],
      category : ['',Validators.required],
      freshness : ['',Validators.required],
      price : ['',Validators.required],
      comment : ['',Validators.required],
      date : ['',Validators.required]
    })
  }
  addProduct(){
    console.log(this.productForm.value)
  }
}
