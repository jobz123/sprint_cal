import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/layout.component';
import { AddStoryComponent } from './add-story/add-story.component';
import { SprintCalComponent } from './sprint-cal/sprint-cal.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'add-story',
        pathMatch: 'full'
      },
      {
        path: 'add-story',
        component: AddStoryComponent
      },
      {
        path: 'sprint-calculator',
        component: SprintCalComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
