import { MatTableDataSource} from '@angular/material/table';
import { Component, ViewChild, OnInit } from '@angular/core';
import { TecnicosService } from 'src/app/services/tecnicos/tecnicos.service';
import { tecnicos } from 'src/app/models/tecnicos.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-tecnicos',
  templateUrl: './lista-tecnicos.component.html',
  styleUrls: ['./lista-tecnicos.component.css']
})
export class ListaTecnicosComponent implements OnInit {

  @ViewChild('paginator', {static: false}) paginator: MatPaginator
  @ViewChild(MatSort, {static: false}) sort: MatSort

  user: any
  displayedColumns: string[] = ['nombre', 'apellidos', 'telefono', 'fecha_inicio', 'fecha_fin'];
  dataSource:any = null;

  constructor(
    private service: TecnicosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('rol');

    this.service.listaCompleta().subscribe(
      (data)=>{
        this.dataSource = new MatTableDataSource<tecnicos>(data)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  filtro(event:any){
    if(event.target.parentNode.id == 'todos-button'){

      this.service.listaCompleta().subscribe(
        (data)=>{
          this.dataSource = new MatTableDataSource<tecnicos>(data)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (err)=>{
          console.log(err);
        }
      )
    }

    if(event.target.parentNode.id == 'activos-button'){

      this.service.listaFiltro('activos').subscribe(
        (data)=>{
          this.dataSource = new MatTableDataSource<tecnicos>(data)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (err)=>{
          console.log(err);
        }
      )
    }

    if(event.target.parentNode.id == 'noActivos-button'){

      this.service.listaFiltro('noActivos').subscribe(
        (data)=>{
          this.dataSource = new MatTableDataSource<tecnicos>(data)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (err)=>{
          console.log(err);
        }
      )
    }
  }

nuevo(){
  this.router.navigate(['admin/ficha/tecnico/nuevo'])
}

editar(row:any){
  this.router.navigate(['admin/ficha/tecnico/' + row._id])
}
}
