import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Veiculo } from '../../../interfaces/veiculo/veiculo';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VeiculoService {
  private apiUrl = `${environment.apiUrl}/veiculos`;
  constructor(private http: HttpClient) {}

  create(veiculo: Veiculo): Observable<Veiculo> {
    return this.http
      .post<{ data: Veiculo; errors: string[] }>(this.apiUrl, veiculo)
      .pipe(map((response) => response.data));
  }

  update(veiculo: Veiculo): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${veiculo.id}`, veiculo);
  }

  delete(id: string): Observable<Veiculo> {
    return this.http
      .delete<{ data: Veiculo; errors: string[] }>(`${this.apiUrl}/${id}`)
      .pipe(map((response) => response.data));
  }

  getAll(
    search: string = '',
    status: string = '',
    pageNumber: number = 1,
    pageSize: number = 25,
    startDate: Date | string = '',
    endDate: Date | string = '',
    sort: string | string = ''
  ): Observable<Veiculo[]> {
    return this.http
      .get<{ data: Veiculo[]; errors: string[] }>(
        `${this.apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}&status=${status}&sort=${sort}&startDate=${startDate}&endDate=${endDate}&search=${search}`
      )
      .pipe(map((response) => response.data));
  }

  getById(id: string): Observable<Veiculo> {
    return this.http
      .get<{ data: Veiculo; errors: string[] }>(`${this.apiUrl}/${id}`)
      .pipe(map((response) => response.data));
  }
}
