import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule, 
    FormsModule
  ],
  exports: [
    SignUpComponent
  ]
})
export class SignUpModule { }
