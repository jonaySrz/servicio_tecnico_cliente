import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

import { TareasService } from './services/tareas/tareas.service';
import { TecnicosService } from './services/tecnicos/tecnicos.service';
import { TokenInterceptorService } from "./services/token-interceptor/token-interceptor.service";

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { SiOnoPipe } from './pipes/facturable/si-ono.pipe';
import { LoginComponent } from './components/login/login.component';
import { DialogComponent } from './dialogs/dialog/dialog.component';
import { AdminMenuComponent } from './components/admin/admin.menu/admin.menu.component';
import { TecnicoMenuComponent } from './components/tecnico/tecnico.menu/tecnico.menu.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListaTecnicosComponent } from './components/lista-tecnicos/lista-tecnicos.component';
import { FichaTecnicoComponent } from './components/ficha-tecnico/ficha-tecnico.component';
import { ListaTareasComponent } from './components/lista-tareas/lista-tareas.component';
import { FichaTareaComponent } from './components/ficha-tarea/ficha-tarea.component';
import { StatsComponent } from './components/stats/stats.component';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    SiOnoPipe,
    LoginComponent,
    DialogComponent,
    AdminMenuComponent,
    TecnicoMenuComponent,
    HeaderComponent,
    FooterComponent,
    ListaTecnicosComponent,
    FichaTecnicoComponent,
    ListaTareasComponent,
    FichaTareaComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatButtonToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [
    TareasService,
    TecnicosService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
