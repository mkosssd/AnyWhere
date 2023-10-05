import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'
import { AdminServiceService } from './admin-service.service';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent {
  list=[
    'smartphones',
    'skincare',
    'fragrances',
    'laptops',
    'groceries'
  ]
  constructor(private prodService:AdminServiceService){}
  formHandler(form:NgForm){
 let formValue =  form.form.value
 let img:string[]=[]
 img.push(formValue.images)
 console.log(img);
 
 let prodObj = {
  ...formValue,images:img
 }
 console.log(prodObj);
 
    this.prodService.uploadProduct(prodObj)

  }
}
