import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TransaccionService {
  constructor(private http: HttpClient) {}
  public send(obj) {
    return this.http.post<boolean>(`${environment.rutaApi}transaccion`, obj);
  }
}
