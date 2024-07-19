import { NgModule } from '@angular/core';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [],
  imports: [
    ToastModule,
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
  ],
})
export class AuthModule {}
