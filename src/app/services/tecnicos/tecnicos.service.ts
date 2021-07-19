import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TecnicosService {

  constructor(private http: HttpClient) { }


  listaCompleta(): Observable<any>{
    return this.http.get('http://localhost:3000/tecnicos')
  }

  listaUno(id: any): Observable<any>{
    return this.http.get('http://localhost:3000/tecnicos/lista/' + id)
  }

  contar (): Observable<any>{
    return this.http.get('http://localhost:3000/tecnicos/count')
  }

  listaFiltro(estado:string): Observable<any>{
    return this.http.get('http://localhost:3000/tecnicos/filtro/' + estado)
  }

  nuevoID():Observable<any>{
    return this.http.get('http://localhost:3000/tecnicos/nuevo/id')
  }

  nuevoTecnico(body:any):Observable<any>{
    return this.http.post('http://localhost:3000/tecnicos/guardar/nuevo', body)
  }

  editarTecnico(body:any):Observable<any>{
    return this.http.post('http://localhost:3000/tecnicos/guardar/editar', body)
  }

}
