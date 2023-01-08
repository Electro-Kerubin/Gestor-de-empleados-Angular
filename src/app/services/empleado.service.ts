import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../interfaces/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.apiServerUrl}/empleado/listar`);
  }

  public addEmpleados(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(`${this.apiServerUrl}/empleado/agregar`, empleado);
  }

  public updateEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.apiServerUrl}/empleado/actualizar`, empleado);
  }

  public deleteEmpleado(empleadoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/empleado/borrar/${empleadoId}`);
  }
}
