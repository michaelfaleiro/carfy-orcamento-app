import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Cliente } from '../../../interfaces/cliente/cliente';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private url = `${environment.apiUrl}/clientes`;
  constructor(private http: HttpClient) {}

  search(query: string): Observable<Cliente[]> {
    if (!query) {
      return of([]);
    }

    return this.http
      .get<{ data: Cliente[]; errors: string[] }>(
        `${this.url}/search?search=${query}`
      )
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
  ): Observable<Cliente[]> {
    return this.http
      .get<{ data: Cliente[]; errors: string[] }>(
        `${this.url}?pageNumber=${pageNumber}&pageSize=${pageSize}&status=${status}&sort=${sort}&startDate=${startDate}&endDate=${endDate}&search=${search}`
      )
      .pipe(map((response) => response.data));
  }

  getById(id: string): Observable<Cliente> {
    return this.http
      .get<{ data: Cliente; errors: string[] }>(`${this.url}/${id}`)
      .pipe(map((response) => response.data));
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post<{ data: Cliente; errors: string[] }>(this.url, cliente)
      .pipe(map((response) => response.data));
  }

  update(cliente: Cliente): Observable<void> {
    return this.http.put<void>(`${this.url}/${cliente.id}`, cliente);
  }

  delete(id: string): Observable<Cliente> {
    return this.http
      .delete<{ data: Cliente; errors: string[] }>(`${this.url}/${id}`)
      .pipe(map((response) => response.data));
  }
}
