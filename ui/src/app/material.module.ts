import { NgModule } from '@angular/core';

import {
    MatDialogModule,
    MatFormFieldModule,
    MatStepperModule,
    MatSelectModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSlideToggleModule
} from '@angular/material';

@NgModule({
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatStepperModule,
    MatSelectModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSlideToggleModule
  ],
  exports: [
    MatDialogModule,
    MatFormFieldModule,
    MatStepperModule,
    MatSelectModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSlideToggleModule
  ],
  providers: [
    MatDatepickerModule
  ]
})
export class MaterialModule {}