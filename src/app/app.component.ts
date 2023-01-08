import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Empleado } from './interfaces/empleado';
import { EmpleadoService } from './services/empleado.service';
import { NgForm }   from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public empleados: Empleado[] = [];
  public editEmpleado: Empleado;

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

  public buscarEmpleado(key: string): void {
    const resultado: Empleado[] = [];
    
    for(const empleado of this.empleados){
      if(empleado.nombre.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || empleado.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || empleado.telefono.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || empleado.trabajo.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        resultado.push(empleado);
      }
    }

    this.empleados = resultado;
  
    if(resultado.length == 0 || !key) {
      this.getEmpleados();
    }
  }

  public abrirModal(empleado: Empleado, mode: string): void {
    const contenedor = document.getElementById('main-container')!;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if(mode == 'añadir') {
      button.setAttribute('data-target', '#añadirEmpleadoModal');
    }

    if(mode == 'editar') {
      this.editEmpleado = empleado;
      button.setAttribute('data-target', '#editarEmpleadoModal');
    }

    if(mode == 'eliminar') {
      this.editEmpleado = empleado;
      button.setAttribute('data-target', '#eliminarEmpleadoModal');
    }

    contenedor.appendChild(button);
    button.click();
  }

  public addEmpleado(form: NgForm): void {
    document.getElementById('add-empleado-form').click();
    this.empleadoService.addEmpleados(form.value).subscribe(
      (res: Empleado) => {
        console.log(res);
        this.getEmpleados();
      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      }
    );
  }

  public updateEmpleado(empleado: Empleado): void {
    document.getElementById('add-empleado-form').click();
    this.empleadoService.updateEmpleado(empleado).subscribe(
      (res: Empleado) => {
        console.log(res);
        this.getEmpleados();
      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      }
    );
  }

  public deleteEmpleado(id: number): void  {
    this.empleadoService.deleteEmpleado(id).subscribe(
      (res) => {
        console.log(res);
        this.getEmpleados();
      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      }
    );
  }

}
