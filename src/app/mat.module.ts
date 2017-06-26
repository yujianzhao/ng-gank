import { NgModule } from '@angular/core';
import {MdButtonModule, MdCheckboxModule, MdRadioModule, MdInputModule, MdAutocompleteModule, MdProgressSpinnerModule
} from '@angular/material';

let group = [MdButtonModule, 
MdInputModule,
MdAutocompleteModule,
MdRadioModule,
MdCheckboxModule,
MdProgressSpinnerModule];

@NgModule({
  imports: group,
  exports: group
})
export class MaterialModule { }