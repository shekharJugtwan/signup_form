import { JsonPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';

function mustConatainQuestionMark(control: AbstractControl){
  if(control.value.includes('?')){
    return null;
  }
  return {QuestionmarkAbsent:true}
}

function emailIsUnique(control:AbstractControl){
  if(control.value !== 'test@example.com'){
    return of(null)
  }
  return of({notUnique: true});
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{

  destroyRef = inject(DestroyRef);

  form = new FormGroup({
    email:new FormControl('',{
      validators:[Validators.email,Validators.required],
      asyncValidators:emailIsUnique,
    }),
    password: new FormControl('',{
      validators: [Validators.required,Validators.minLength(8)]
    })
  })

  get IsemailValid()
  {
    return (this.form.controls.email.touched && 
      this.form.controls.email.dirty  && 
      this.form.controls.email.invalid )
  }

  get IsPasswordValid()
  {
    return (this.form.controls.password.touched && 
      this.form.controls.password.dirty  && 
      this.form.controls.password.invalid )
    }
    
    ngOnInit() {

    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
    next: value =>{
      console.log(value);
      window.localStorage.setItem('saved-emails', JSON.stringify({email: value.email}));
      }
      })
      
      const loadedemail = window.localStorage.getItem('saved-emails');
      if(loadedemail)
        this.form.patchValue({ email : JSON.parse(loadedemail).email});

      this.destroyRef.onDestroy(() =>{
        subscription.unsubscribe();
    })


  }

  onSubmit(){
  }
}
