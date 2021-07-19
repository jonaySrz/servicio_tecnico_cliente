import { MatTableDataSource} from '@angular/material/table';
import { Component, ViewChild, OnInit } from '@angular/core';
import { TareasService } from 'src/app/services/tareas/tareas.service';
import { tareas } from 'src/app/models/tareas.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { TecnicosService } from 'src/app/services/tecnicos/tecnicos.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-lista-tareas',
  templateUrl: './lista-tareas.component.html',
  styleUrls: ['./lista-tareas.component.css']
})
export class ListaTareasComponent implements OnInit {

  @ViewChild('paginator', {static: false}) paginator: MatPaginator
  @ViewChild(MatSort, {static: false}) sort: MatSort

  selection = new FormControl('todos');
  selectionClientes = new FormControl('todos');

  listaTecnicos:any
  listaClientes:any

  user: any
  displayedColumns: string[] = ['tecnico', 'fecha', 'cliente', 'descripcion', 'facturable', 'importe'];
  dataSource:any = null;

  tecnico:any = false

  constructor(
    private service: TareasService,
    private router: Router, 
    private tecnicosService: TecnicosService
  ) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('rol');

    this.tecnicosService.listaCompleta().subscribe(
      (data)=>{
        this.listaTecnicos = data
      },
      (err)=>{
        console.log(err);
      }
    )

    if(this.user == 'tecnico'){
      this.tecnico = localStorage.getItem('xyz');

      this.service.listaFiltro(this.tecnico).subscribe(
        (data)=>{

          if (data.mensaje){
            
            this.dataSource = new MatTableDataSource<tareas>([])
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
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

    else {
  
      this.service.listaClientes().subscribe(
        (data)=>{
          this.listaClientes = data
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
  }

  filtro(value:any){ 
    if(this.selectionClientes.value !== 'todos' && value == 'todos'){
      return this.filtroCliente(this.selectionClientes.value)
    }

    if(this.selectionClientes.value !== 'todos'){
      this.service.listaFiltroDoble({id: value, cliente: this.selectionClientes.value}).subscribe(
        (data)=>{
          if (data.mensaje){
              
            this.dataSource = new MatTableDataSource<tareas>([])
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
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
    else {
      if (value == 'todos'){
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
      else {
        this.service.listaFiltro(value).subscribe(
          (data)=>{
            if (data.mensaje){
              
              this.dataSource = new MatTableDataSource<tareas>([])
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
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
    }
  }

  filtroCliente(value:any){
    if(this.selection.value !== 'todos' && value == 'todos'){
      this.filtro(this.selection.value)
    }

    if(this.selection.value !== 'todos'){

      this.service.listaFiltroDoble({id: this.selection.value, cliente: value}).subscribe(
        (data)=>{
          if (data.mensaje){
              
            this.dataSource = new MatTableDataSource<tareas>([])
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
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
    else {
      if (value == 'todos'){
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
      else {
        this.service.filtroClientes({cliente: value}).subscribe(
          (data)=>{
            if (data.mensaje){
              
              this.dataSource = new MatTableDataSource<tareas>([])
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
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
    }
  }

  nuevo(){
    
    if (this.tecnico){
      this.router.navigate(['tecnico/ficha/tarea/nuevo'])
    }
    else {
      this.router.navigate(['admin/ficha/tarea/nuevo'])
    }
  }

  editar(row:any){
    if (this.tecnico){
      this.router.navigate(['tecnico/ficha/tarea/' + row._id])
    }
    else {
      this.router.navigate(['admin/ficha/tarea/' + row._id])
    }
    
  }

  reset(){
    window.location.reload()
  }
}
