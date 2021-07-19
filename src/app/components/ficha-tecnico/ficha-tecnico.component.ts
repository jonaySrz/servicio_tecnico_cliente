import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TecnicosService } from 'src/app/services/tecnicos/tecnicos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialogs/dialog/dialog.component';

@Component({
  selector: 'app-ficha-tecnico',
  templateUrl: './ficha-tecnico.component.html',
  styleUrls: ['./ficha-tecnico.component.css']
})
export class FichaTecnicoComponent implements OnInit {

  user:any
  empleado:any = {}
  despedido:boolean

  nuevo:boolean
  hide:boolean = true

  id: number;
  fin: boolean

  tecnicoForm: FormGroup = new FormGroup({
    _id: new FormControl(''),
    usuario: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    fecha_inicio: new FormControl('', [Validators.required]),
    fecha_fin: new FormControl('')
  })

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: TecnicosService,
    private router: Router,
    private modal: MatDialog
  ) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('rol')

    if (this.activatedRoute.snapshot.paramMap.get('id') == 'nuevo'){

      this.service.nuevoID().subscribe(
        (data)=>{
            this.nuevo = true

            this.id = parseInt(data._id) + 1 
            this.tecnicoForm.patchValue({_id: this.id})
          }
          ,
        (err)=>{
          console.log(err);
        })
    }
    else {

      this.service.listaUno(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
        (data)=>{
          
          this.nuevo = false
          this.empleado = data

          data.fecha_inicio = new Date(data.fecha_inicio).toISOString().substring(0, 10);

          this.tecnicoForm.patchValue(data)
          this.tecnicoForm.patchValue({password: data.contraseña})

          if(data.fecha_fin == ''){
            this.despedido = false
          }
          else {
            this.despedido = true
          }
        },
        (err)=>{
          console.log(err);
        })
    }
  }

  guardar(){
    if (this.nuevo){

      this.service.nuevoTecnico(this.tecnicoForm.value).subscribe(
        (data)=>{
          if (data.success == true){
            let dialogRef = this.modal.open(DialogComponent, {data: {name: this.tecnicoForm.value.nombre +' '+ this.tecnicoForm.value.apellidos, accion: 'nuevo'}})
  
            dialogRef.afterClosed().subscribe(
              ()=>{
                this.router.navigate(['/admin/lista/tecnicos'])
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
      this.service.editarTecnico(this.tecnicoForm.value).subscribe(
        (data)=>{
          if (data.success == true){
            let dialogRef = this.modal.open(DialogComponent, {data: {name: this.tecnicoForm.value.nombre +' '+ this.tecnicoForm.value.apellidos, accion: 'edit'}})
  
            dialogRef.afterClosed().subscribe(
              ()=>{
                this.router.navigate(['/admin/lista/tecnicos'])
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
    this.router.navigate(['/admin/lista/tecnicos'])
  }

  finalizar(){

    let pregunta = this.modal.open(DialogComponent, {data: {name: this.tecnicoForm.value.nombre +' '+ this.tecnicoForm.value.apellidos, accion: 'finContrato'}})

    pregunta.afterClosed().subscribe(
      (result)=>{
        if (result){

          let hoy = new Date().toISOString()
          this.tecnicoForm.patchValue({fecha_fin: hoy})

          this.service.editarTecnico(this.tecnicoForm.value).subscribe(
            (data)=>{
              if (data.success == true){
                let dialogRef = this.modal.open(DialogComponent, {data: {name: this.tecnicoForm.value.nombre +' '+ this.tecnicoForm.value.apellidos, accion: 'finTrue'}})

                dialogRef.afterClosed().subscribe(
                  ()=>{
                    this.router.navigate(['/admin/lista/tecnicos'])
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

  reactivar(){
    let pregunta = this.modal.open(DialogComponent, {data: {name: this.tecnicoForm.value.nombre +' '+ this.tecnicoForm.value.apellidos, accion: 'reactivar'}})
    
    pregunta.afterClosed().subscribe(
      (result)=>{
        if (result){

          this.tecnicoForm.patchValue({fecha_fin: ''})

          this.service.editarTecnico(this.tecnicoForm.value).subscribe(
            (data)=>{
              if (data.success == true){
                let dialogRef = this.modal.open(DialogComponent, {data: {name: this.tecnicoForm.value.nombre +' '+ this.tecnicoForm.value.apellidos, accion: 'reactivarTrue'}})

                dialogRef.afterClosed().subscribe(
                  ()=>{
                    this.router.navigate(['/admin/lista/tecnicos'])
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
