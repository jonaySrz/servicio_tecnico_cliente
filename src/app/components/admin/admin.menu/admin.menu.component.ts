import { Component, OnInit } from '@angular/core';
import { TareasService } from 'src/app/services/tareas/tareas.service';
import { TecnicosService } from 'src/app/services/tecnicos/tecnicos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin.menu',
  templateUrl: './admin.menu.component.html',
  styleUrls: ['./admin.menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  user: any
  countTecnicos: number
  countTareas: number
  importe: number = 0

  acciones:any = [
    {foto: 'empleados.jpg', accion: 'tecnicos', titulo: 'Listado y mantenimiento de empleados', descripcion: 'Menú en el que se listarán todos los empleados de la empresa (activos y no activos), así como diferentes opciones para su alta, baja y modificación.'},
    {foto: 'tareas.jpg', accion: 'tareas', titulo: 'Listado y mantenimiento de tareas', descripcion: 'Menú en el que se listarán todas las tareas realizadas por los empleados, así como diferentes opciones para la alta, baja y modificación de las mismas.'},
    {foto: 'stats.jpg', accion: 'stats', titulo: 'Estadísticas de la empresa', descripcion: 'Pantalla en la que se detallarán las estadísticas de empresa sobre productividad y rendimientos.'}
  ]

  constructor(
    private tareaService: TareasService, 
    private tecnicoService: TecnicosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('rol')

    this.tecnicoService.contar().subscribe(
      (data)=>{
        this.countTecnicos = data
      },
      (err)=>{
        console.log(err)
      }
    )

    this.tareaService.contar().subscribe(
      (data)=>{
        this.countTareas = data
      },
      (err)=>{
        console.log(err);
      }
    )

    this.tareaService.listaCompleta().subscribe(
      (data)=>{
        data.forEach((element:any) => {
          this.importe = this.importe + element.importe
        })
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  redirecting(item:any){
    if(item.accion == 'tecnicos'){
      this.router.navigate(['/admin/lista/tecnicos'])
    }

    if(item.accion == 'tareas'){
      this.router.navigate(['/admin/lista/tareas'])
    }

    if(item.accion == 'stats'){
      this.router.navigate(['/admin/stats'])
    }
  }

}
