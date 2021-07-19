import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TareasService } from 'src/app/services/tareas/tareas.service';
import { TecnicosService } from 'src/app/services/tecnicos/tecnicos.service';
import { tareas } from 'src/app/models/tareas.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  @ViewChild('paginator', {static: false}) paginator: MatPaginator
  @ViewChild(MatSort, {static: false}) sort: MatSort

  user:any

  listaTecnicos:any

  selection = new FormControl('todos');
  selectionYear = new FormControl('todos');
  selectionMonth = new FormControl('todos');

  displayedColumns: string[] = ['tecnico', 'fecha', 'cliente', 'descripcion', 'facturable', 'importe'];
  dataSource:any = null;

  listaMeses = [
    {_id: 0, mes: 'Enero'},
    {_id: 1, mes: 'Febrero'},
    {_id: 2, mes: 'Marzo'},
    {_id: 3, mes: 'Abril'},
    {_id: 4, mes: 'Mayo'},
    {_id: 5, mes: 'Junio'},
    {_id: 6, mes: 'Julio'},
    {_id: 7, mes: 'Agosto'},
    {_id: 8, mes: 'Septiembre'},
    {_id: 9, mes: 'Octubre'},
    {_id: 10, mes: 'Noviembre'},
    {_id: 11, mes: 'Diciembre'},
  ]

  listaYear = [
    2018, 2019, 2020, 2021
  ]

  filtrado:boolean = false
  countTecnicos: number
  countTareas: number
  importe: number = 0

  noHayDatos:boolean = false

  totalTareas:number
  totalImporte:number = 0

  constructor(
    private tecnicosService:TecnicosService,
    private service: TareasService
  ) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('rol');

    this.tecnicosService.contar().subscribe(
      (data)=>{
        this.countTecnicos = data
      },
      (err)=>{
        console.log(err)
      }
    )

    this.service.contar().subscribe(
      (data)=>{
        this.countTareas = data
      },
      (err)=>{
        console.log(err);
      }
    )

    this.service.listaCompleta().subscribe(
      (data)=>{
        data.forEach((element:any) => {
          this.importe = this.importe + element.importe
        })
      },
      (err)=>{
        console.log(err);
      }
    )

    this.tecnicosService.listaCompleta().subscribe(
      (data)=>{
        this.listaTecnicos = data
      },
      (err)=>{
        console.log(err);
      }
    )

    this.service.listaCompleta().subscribe(
      (data)=>{

        data.forEach((element:any) => {

          if (element.facturable == true){
            element.facturable = 'Si'
          }
          else {
            element.facturable = 'No'
          }

          this.listaTecnicos.forEach((tecnico:any) => {
            if (tecnico._id == element.tecnico){
              element.tecnico = tecnico.nombre +' '+ tecnico.apellidos
            }
          });
        });

        this.dataSource = new MatTableDataSource<tareas>(data)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  buscar(){
    let fecha:any = null
    let tec:any = null

    if(this.selectionMonth.value !== 'todos' && this.selectionYear.value !== 'todos'){
      fecha = new Date()
    
      fecha.setMonth(this.selectionMonth.value)
      fecha.setFullYear(this.selectionYear.value)

      fecha = fecha.toISOString().slice(0, 7)
    }

    if(this.selectionMonth.value !== 'todos' && this.selectionYear.value == 'todos'){
      fecha = new Date()
    
      fecha.setMonth(this.selectionMonth.value)

      fecha = fecha.toISOString().slice(4, 8)
    }

    if(this.selectionMonth.value == 'todos' && this.selectionYear.value !== 'todos'){
      fecha = new Date()
    
      fecha.setFullYear(this.selectionYear.value)

      fecha = fecha.toISOString().slice(0, 5)
    }
    
    if (this.selection.value !== 'todos'){
      tec = this.selection.value
    }
    
    this.service.filtroStats({tec, fecha}).subscribe(
      (data)=>{
        if (data.mensaje){
          this.dataSource = new MatTableDataSource<tareas>([])
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          this.noHayDatos = true
        }
        else {
          data.forEach((element:any) => {
  
            if (element.facturable == true){
              element.facturable = 'Si'
            }
            else {
              element.facturable = 'No'
            }
  
            this.listaTecnicos.forEach((tecnico:any) => {
              if (tecnico._id == element.tecnico){
                element.tecnico = tecnico.nombre +' '+ tecnico.apellidos
              }
            });
          });
          this.noHayDatos = false

          if(this.selectionMonth.value == 'todos' && this.selectionYear.value == 'todos' && this.selection.value == 'todos'){
            this.filtrado = false
          }
          else {
            this.filtrado = true
            this.totalImporte = 0
          }

          this.totalTareas = data.length

          data.forEach((element:any) => {
            this.totalImporte = this.totalImporte + element.importe
          });
  
          this.dataSource = new MatTableDataSource<tareas>(data)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  reset(){
    window.location.reload();
  }
}
