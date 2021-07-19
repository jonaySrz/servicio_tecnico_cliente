import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TecnicosService } from 'src/app/services/tecnicos/tecnicos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialogs/dialog/dialog.component';
import { TareasService } from 'src/app/services/tareas/tareas.service';
import { createHostListener } from '@angular/compiler/src/core';

@Component({
  selector: 'app-ficha-tarea',
  templateUrl: './ficha-tarea.component.html',
  styleUrls: ['./ficha-tarea.component.css']
})
export class FichaTareaComponent implements OnInit {

  user:any
  tarea:any = {}

  nuevo:boolean
  hide:boolean = true

  listaTecnicos:any
  listaClientes:any

  fin: boolean

  factura:any

  tecnico:any = false

  tareaForm: FormGroup = new FormGroup({
    tecnico: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required]),
    cliente: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    facturable: new FormControl('', [Validators.required]),
    importe: new FormControl('', [Validators.required]),
    _id: new FormControl('')
  })

  constructor(
    private activatedRoute: ActivatedRoute,
    private tecnicosService: TecnicosService,
    private service: TareasService,
    private router: Router,
    private modal: MatDialog
  ) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('rol')

    if(this.user == 'tecnico'){
      this.tecnico = localStorage.getItem('xyz');
    }

    this.tecnicosService.listaCompleta().subscribe(
      (data)=>{
        this.listaTecnicos = data
      },
      (err)=>{
        console.log(err);
      }
    )

    this.service.listaClientes().subscribe(
      (data)=>{
        this.listaClientes = data
      },
      (err)=>{
        console.log(err);
      }
    )

    if (this.activatedRoute.snapshot.paramMap.get('id') == 'nuevo'){
      this.nuevo = true

      this.tareaForm.patchValue({'tecnico': localStorage.getItem('xyz')})
    }
    else {

      this.service.listaUno(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
        (data)=>{
          
          this.nuevo = false
          this.tarea = data

          data.fecha = new Date(data.fecha).toISOString().substring(0, 10);
          
          this.tareaForm.patchValue(data)

          if(data.facturable){
            this.factura = 'true'
          }
          else {
            this.factura = 'false'
          }
        },
        (err)=>{
          console.log(err);
        })
    }
  }

  guardar(){
    if (this.nuevo){

      this.service.nuevaTarea(this.tareaForm.value).subscribe(
        (data)=>{
          if (data.success == true){
            let dialogRef = this.modal.open(DialogComponent, {data: {name: this.tareaForm.value.descripcion, accion: 'nuevo'}})
  
            dialogRef.afterClosed().subscribe(
              ()=>{
                this.router.navigate(['/admin/lista/tareas'])
              }
            )
  
            setTimeout(() => {
              this.modal.closeAll()
            }, 3000);
          }
  
          if(data.error){
            let dialogRef = this.modal.open(DialogComponent, {data: {accion: 'error'}})
  
            dialogRef.afterClosed().subscribe(
              ()=>{
                window.location.reload()
              }
            )
          }
        },
        (err)=>{
          console.log(err);
        }
      )
    }

    else {
      this.tareaForm.patchValue({'_id': this.tarea._id})

      this.service.editar(this.tareaForm.value).subscribe(
        (data)=>{
          if (data.success == true){
            let dialogRef = this.modal.open(DialogComponent, {data: {name: this.tareaForm.value.descripcion, accion: 'edit'}})
  
            dialogRef.afterClosed().subscribe(
              ()=>{
                this.router.navigate(['/admin/lista/tareas'])
              }
            )
  
            setTimeout(() => {
              this.modal.closeAll()
            }, 3000);
          }
  
          if(data.error){
            let dialogRef = this.modal.open(DialogComponent, {data: {accion: 'error'}})
  
            dialogRef.afterClosed().subscribe(
              ()=>{
                window.location.reload()
              }
            )
          }
        },
        (err)=>{
          console.log(err)
        }
      )
    }
  }

  reset(){
    window.location.reload();
  }

  atras(){
    if (this.tecnico){
      this.router.navigate(['/tecnico/lista/tareas'])
    }
    else {  
      this.router.navigate(['/admin/lista/tareas'])
    }
    
  }

  borrar(){

    let pregunta = this.modal.open(DialogComponent, {data: {name: this.tareaForm.value.descripcion, accion: 'borrar'}})

    pregunta.afterClosed().subscribe(
      (result)=>{
        if (result){

          this.service.borrar(this.tareaForm.value).subscribe(
            (data)=>{
              if (data.success == true){
                let dialogRef = this.modal.open(DialogComponent, {data: {name: this.tareaForm.value.nombre, accion: 'borrarTrue'}})

                dialogRef.afterClosed().subscribe(
                  ()=>{
                    this.router.navigate(['/admin/lista/tareas'])
                  }
                )

                setTimeout(() => {
                  this.modal.closeAll()
                }, 3000);
              }

              if(data.error){
                let dialogRef = this.modal.open(DialogComponent, {data: {accion: 'error'}})

                dialogRef.afterClosed().subscribe(
                  ()=>{
                    window.location.reload()
                  }
                )
              }
            },
            (err)=>{
              console.log(err)
            }
          )
        }
        else {
          pregunta.close();
        }
      }
    )
  }
}
