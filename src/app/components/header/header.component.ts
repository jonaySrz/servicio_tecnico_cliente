import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  tecnico:boolean = false
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('rol') !== 'administrador'){
      this.tecnico = true
    }
  }

  goMenu(){
    if (localStorage.getItem('rol') == 'administrador'){
      this.router.navigate(['admin/menu'])
    }
    else {
      this.router.navigate(['tecnico/lista/tareas'])
    }
  }

  goLogin(){
    window.location.href = '/'
  }
}
