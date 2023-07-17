import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AuthGuard } from './auth.guard';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'user', component: UserComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'admindashboard', component: AdmindashboardComponent, canActivate: [AuthGuard]  },
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: '**', redirectTo: '/admin' } // Handle invalid routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
