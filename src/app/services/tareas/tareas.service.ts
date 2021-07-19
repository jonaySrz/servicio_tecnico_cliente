import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor(private http: HttpClient) { }


  listaCompleta(): Observable<any>{
    return this.http.get('http://localhost:3000/tareas')
  }

  listaUno(id: any): Observable<any>{
    return this.http.get('http://localhost:3000/tareas/lista/' + id)
  }

  nuevaTarea(body:any): Observable<any>{
    return this.http.post('http://localhost:3000/tareas/guardar/nueva', body)
  }

  editar(body:any): Observable<any>{
    return this.http.post('http://localhost:3000/tareas/guardar/editar', body)
  }

  borrar(body:any): Observable<any>{
    return this.http.post('http://localhost:3000/tareas/guardar/borrar', body)
  }

  contar(): Observable<any>{
    return this.http.get('http://localhost:3000/tareas/count')
  }

  listaFiltro(idTecnico:any): Observable<any>{
    return this.http.get('http://localhost:3000/tareas/filtro/unico/' + idTecnico)
  }

  listaFiltroDoble(body:any): Observable<any>{
    return this.http.post('http://localhost:3000/tareas/filtro/doble', body)
  }

  listaClientes(): Observable<any>{
    return this.http.get('http://localhost:3000/tareas/clientes/lista')
  }

  filtroClientes(body:any): Observable<any>{
    return this.http.post('http://localhost:3000/tareas/filtro/clientes', body)
  }

  filtroStats(body:any): Observable<any>{
    return this.http.post('http://localhost:3000/tareas/filtro/stats', body)
  }

}

