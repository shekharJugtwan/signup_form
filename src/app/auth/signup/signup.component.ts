import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

 function areEqual(controlName1:string,  controlName2:string){
  return( control: AbstractControl)=>{
    const val1= control.get(controlName1)?.value;
    const val2 = control.get(controlName2)?.value
    if(val1 === val2){
      return null;
    }
    return {valuesAreNotSame: true};
  }
}


@Component({
  selector: 'app-signup',
  standalone: true,
  imports:[ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {

  form = new FormGroup({
    email : new FormControl('',{
      validators:[Validators.required, Validators.email, ]
    }),


    passwords : new  FormGroup({
      password : new FormControl('' , {
        validators: [Validators.required,Validators.minLength(8)]
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(8)]
      })
    },{
      validators:[areEqual('password','confirmPassword')]
    }),


    firstName : new FormControl('', {validators:[Validators.required]}),
    lastName : new FormControl('', {validators:[Validators.required]}),
  
    address : new FormGroup({
    street : new FormControl('', {validators:[Validators.required]}),
    number : new FormControl('', {validators:[Validators.required]}),
    postalCode : new FormControl('', {validators:[Validators.required]}),
    city : new FormControl('', {validators:[Validators.required]}),
  }),

  source : new FormArray([
    new FormControl(false),
    new FormControl(false),
    new FormControl(false),
  ]),

    role : new FormControl<'student'| 'teacher'|'employee'| 'founder'| 'other'>('teacher', {validators:[Validators.required]}),
    agree : new FormControl(false, {validators:[Validators.required]}),
  })

  onReset(){
    this.form.reset();
  }

  onSubmit(){
  
    console.log(this.form)
  
  //  const eneteredEmail =   this.form.controls.email.value;
  //  const enteredPassword = this.form.controls.value;
  //  console.log(enteredPassword,eneteredEmail);
  }
}
