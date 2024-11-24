import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutComponent } from './layout/layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppValidationComponent } from './validation/validation.component';
import { AddStoryComponent } from './add-story/add-story.component';
import { StoryListComponent } from './story-list/story-list.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SprintCalComponent } from './sprint-cal/sprint-cal.component';

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    AppValidationComponent,
    AddStoryComponent,
    StoryListComponent,
    SprintCalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
