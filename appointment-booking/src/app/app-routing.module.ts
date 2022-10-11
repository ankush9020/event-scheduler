import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulerComponent } from './scheduler/scheduler.component';

const routes: Routes = [
  { path: 'schedule', component: SchedulerComponent,
  //lazy loading
  loadChildren: () => import('./scheduler/scheduler.module').then(m => m.SchedulerModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
