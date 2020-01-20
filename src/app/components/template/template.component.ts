import { Component} from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(form){
      border: 1px solid red;
    }
  `]
})
export class TemplateComponent{
  user: Object = {
    name: null,
    lastname: null,
    email: null,
    country: "",
    gender: "Male",
    agree: false

  }

  countries = [
    {code:"COL",
     name: "Colombia"
    },{
      code:"ESP",
      name:"España"
    }
  ]

  genders: string[] = ["Male", "Female", "Undefined"];

  constructor() { }

  save(form: NgForm){
    console.log(form);
  }
}
