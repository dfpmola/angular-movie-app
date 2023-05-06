import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { personalRoutingModule } from './personal-routing.module';
import { PersonComponent } from '../person/person.component';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { PersonalComponent } from './personal.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';
import { SkeletonModule } from 'src/app/shared/skeleton/skeleton.module';



@NgModule({
  declarations: [PersonalComponent],
  imports: [
    CommonModule,
    personalRoutingModule,
    PipeModule,
    SkeletonModule,
    MatPaginatorModule 
  ]
})

@NgModule({
  imports: [
    CommonModule,
    personalRoutingModule,
    PipeModule,
    ScrollingModule,
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  declarations: [
    PersonalComponent,
  ]
})
export class PersonalModule { }
