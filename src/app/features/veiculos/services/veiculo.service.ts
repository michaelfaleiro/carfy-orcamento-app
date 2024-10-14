import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Veiculo } from '../../../interfaces/veiculo/veiculo';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VeiculoService {
  private url = `${environment.apiUrl}/veiculos`;
  constructor(private http: HttpClient) {}

  create(veiculo: Veiculo): Observable<Veiculo> {
    return this.http
      .post<{ data: Veiculo; errors: string[] }>(this.url, veiculo)
      .pipe(map((response) => response.data));
  }

  update(veiculo: Veiculo): Observable<void> {
    return this.http.put<void>(`${this.url}/${veiculo.id}`, veiculo);
  }

  delete(id: string): Observable<Veiculo> {
    return this.http
      .delete<{ data: Veiculo; errors: string[] }>(`${this.url}/${id}`)
      .pipe(map((response) => response.data));
  }

  getAll(): Observable<Veiculo[]> {
    return this.http
      .get<{ data: Veiculo[]; errors: string[] }>(this.url)
      .pipe(map((response) => response.data));
  }

  getById(id: string): Observable<Veiculo> {
    return this.http
      .get<{ data: Veiculo; errors: string[] }>(`${this.url}/${id}`)
      .pipe(map((response) => response.data));
  }
}
