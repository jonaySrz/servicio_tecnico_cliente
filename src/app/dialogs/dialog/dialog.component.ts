import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  nuevo: boolean
  error: boolean
  edit: boolean
  fin: boolean
  finTrue: boolean
  borrar:boolean
  borrarTrue:boolean
  reactivar:boolean
  reactivarTrue:boolean

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {name: string, accion:string}
  ) { }

  ngOnInit(){
    if (this.data.accion == 'nuevo'){
      this.nuevo = true
    }
    if (this.data.accion == 'error'){
      this.error = true
    }
    if (this.data.accion == 'edit'){
      this.edit = true
    }
    if (this.data.accion == 'finContrato'){
      this.fin = true
    }
    if (this.data.accion == 'finTrue'){
      this.finTrue = true
    }
    if (this.data.accion == 'borrar'){
      this.borrar = true
    }
    if (this.data.accion == 'borrarTrue'){
      this.borrarTrue = true
    }
    if (this.data.accion == 'reactivar'){
      this.reactivar = true
    }
    if (this.data.accion == 'reactivarTrue'){
      this.reactivarTrue = true
    }
  }
}
