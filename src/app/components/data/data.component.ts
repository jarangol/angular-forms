import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupName, FormArray, ControlContainer } from "@angular/forms";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {
  
  form: FormGroup;

  user: Object = {
    fullname:{
      name: 'name',
      lastname: 'lastname'
    },email: 'email',
    hobbies: ["Run","Sleep"]
  }
    
  constructor() { 
    this.form = new FormGroup({
      'fullname': new FormGroup({
        'name': new FormControl('', [Validators.required,
          Validators.minLength(3)
        ]),
        'lastname': new FormControl('', [Validators.required,
                                         this.noHerrera]),
      }),
      'email': new FormControl('', [ Validators.required,
                                     Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      'hobbies': new FormArray([
        new FormControl('Run', Validators.required)
      ]),
      'username': new FormControl('', Validators.required, this.userExists),
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl(),
    });
    // this.form.setValue(this.user);
    this.form.controls['password2'].setValidators([
      Validators.required,
      this.noEquals.bind(this.form)
    ]);

    this.form.controls['username'].valueChanges
      .subscribe(data => console.log(data))
  
    this.form.controls['username'].statusChanges
      .subscribe(data => console.log(data))
  
    
  }

  noHerrera(control: FormControl):{[s:string]:boolean} {
    if(control.value === 'herrera'){
      return {
        noherrera:true
      };
    }
    return null;
  }

  noEquals(control: FormControl):{[s:string]:boolean} {
    let form: any = this;
    if(control.value !== form.controls['password1'].value){
      return {
        noequals:true
      };
    }
    return null;
  }
  
  userExists(control: FormControl): Promise<any> | Observable<any>{
    let promise = new Promise( (resolve, reject) => {
        setTimeout(() => {
          if(control.value === "strider"){
            resolve({exists:true}) 
          }else{
            resolve(null)
          }
        },3000)
      }
    )
    return promise;
  }

  submit(){
    this.form.reset(this.user);
  }
  
  addHobbie(hobbie: string){
    console.log(hobbie);
  (<FormArray>this.form.controls['hobbies']).push(
    new FormControl('', Validators.required)
  )}
}

