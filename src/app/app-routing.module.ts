import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoFormComponent } from './do-form/do-form.component';
import { DoReportsComponent } from './do-reports/do-reports.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: "", redirectTo: "/DoForm", pathMatch: "full", data: { breadcrumbs: 'DoForm' } },
  { path: "DoForm", component: DoFormComponent ,data: { breadcrumb: 'DoForm' }},
  { path: "Login", component: LoginComponent },
  { path: "Do-Reports", component: DoReportsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

