import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Empleado } from './interfaces/empleado';
import { EmpleadoService } from './services/empleado.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public empleados: Empleado[] = [];

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.getEmpleados();
  }

  public getEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe(
      (res: Empleado[]) => {
        this.empleados = res;
      },
        (err: HttpErrorResponse) => {
          alert(err.message);
        }
    )
  }

  public abrirModal(empleado: Empleado, mode: string): void {
    const contenedor = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if(mode == 'añadir') {
      button.setAttribute('data-bs-target', '#añadirEmpleadoModal');
    }

    if(mode == 'editar') {
      button.setAttribute('data-bs-target', '#editarEmpleadoModal');
    }

    if(mode == 'eliminar') {
      button.setAttribute('data-bs-target', '#eliminarEmpleadoModal');
    }

    contenedor?.appendChild(button);
    button.click();
  }


}
