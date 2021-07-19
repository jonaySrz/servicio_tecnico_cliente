import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMenuComponent } from './components/admin/admin.menu/admin.menu.component';
import { FichaTareaComponent } from './components/ficha-tarea/ficha-tarea.component';
import { FichaTecnicoComponent } from './components/ficha-tecnico/ficha-tecnico.component';
import { ListaTareasComponent } from './components/lista-tareas/lista-tareas.component';
import { ListaTecnicosComponent } from './components/lista-tecnicos/lista-tecnicos.component';
import { LoginComponent } from './components/login/login.component';
import { StatsComponent } from './components/stats/stats.component';
import { TecnicoMenuComponent } from './components/tecnico/tecnico.menu/tecnico.menu.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: LoginComponent},

  {path:'admin/lista/tareas', component: ListaTareasComponent, canActivate: [AuthGuard]},
  {path:'admin/ficha/tarea/:id', component: FichaTareaComponent, canActivate: [AuthGuard]},
  
  {path:'admin/menu', component: AdminMenuComponent, canActivate: [AuthGuard]},
  {path:'admin/stats', component: StatsComponent, canActivate: [AuthGuard]},
  
  {path:'admin/lista/tecnicos', component: ListaTecnicosComponent, canActivate: [AuthGuard]},
  {path:'admin/ficha/tecnico/:id', component: FichaTecnicoComponent, canActivate: [AuthGuard]},

  {path:'tecnico/lista/tareas', component: ListaTareasComponent, canActivate: [AuthGuard]},
  {path:'tecnico/ficha/tarea/:id', component: FichaTareaComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
