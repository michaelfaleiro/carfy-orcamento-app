import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { map, Observable } from 'rxjs';
import { Cotacao } from '../../../interfaces/cotacao/cotacao';
import { RegisterCotacaoRequest } from '../../../interfaces/cotacao/registerCotacaoRequest';
import { AdicionarItemCotacaoRequest } from '../../../interfaces/cotacao/adicionarItemCotacaoRequest';
import { AdicionarPrecoItemCotacaoRequest } from '../../../interfaces/cotacao/adicionarPrecoItemCotacaoRequest';
import { AdicionarCodigoEquivalenteRequest } from '../../../interfaces/cotacao/adicionarCodigoEquivalenteRequest';
import { ItemCotacao } from '../../../interfaces/cotacao/itemCotacao';

@Injectable({
  providedIn: 'root',
})
export class CotacaoService {
  apiUrl = `${environment.apiUrl}/cotacoes`;

  constructor(private http: HttpClient) {}

  getCotacoes(
    search: string = '',
    vendedor: string = '',
    status: string = '',
    pageNumber: number = 1,
    pageSize: number = 25,
    startDate: Date | string = '',
    endDate: Date | string = '',
    sort: string | string = ''
  ): Observable<Cotacao[]> {
    return this.http
      .get<{ data: Cotacao[]; errors: string[] }>(
        `${this.apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}&status=${status}&sort=${sort}&startDate=${startDate}&endDate=${endDate}&search=${search}&vendedor=${vendedor}`
      )
      .pipe(map((response) => response.data));
  }

  getCotacaoById(id: string): Observable<Cotacao> {
    return this.http
      .get<{ data: Cotacao; errors: string[] }>(`${this.apiUrl}/${id}`)
      .pipe(map((response) => response.data));
  }

  createCotacao(cotacao: RegisterCotacaoRequest): Observable<Cotacao> {
    return this.http
      .post<{ data: Cotacao; errors: string[] }>(this.apiUrl, cotacao)
      .pipe(map((response) => response.data));
  }

  atualizarStatusCotacao(cotacaoId: string, status: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/status`, { cotacaoId, status });
  }

  getItemCotacao(itemId: string): Observable<ItemCotacao> {
    return this.http
      .get<{ data: ItemCotacao; errors: string[] }>(
        `${this.apiUrl}/itens/${itemId}`
      )
      .pipe(map((response) => response.data));
  }

  adicionarItemCotacao(item: AdicionarItemCotacaoRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/itens`, item);
  }

  atualizarItemCotacao(item: AdicionarItemCotacaoRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/itens`, item);
  }

  removerItemCotacao(cotacaoId: string, itemId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/itens`, {
      body: { cotacaoId, itemId },
    });
  }

  adicionarPrecoItemCotacao(
    preco: AdicionarPrecoItemCotacaoRequest
  ): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/precos`, preco);
  }

  atualizarPrecoItemCotacao(
    preco: AdicionarPrecoItemCotacaoRequest
  ): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/precos`, preco);
  }

  removerPrecoItemCotacao(
    cotacaoId: string,
    itemId: string,
    precoId: string
  ): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/precos`, {
      body: { cotacaoId, itemId, id: precoId },
    });
  }

  adicionarCodigoEquivalente(
    codigo: AdicionarCodigoEquivalenteRequest
  ): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/codigo-equivalentes`, codigo);
  }

  atualizarCodigoEquivalente(
    codigo: AdicionarCodigoEquivalenteRequest
  ): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/codigo-equivalentes`, codigo);
  }

  removerCodigoEquivalente(
    cotacaoId: string,
    itemId: string,
    codigoId: string
  ): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/codigo-equivalentes`, {
      body: { cotacaoId, itemId, id: codigoId },
    });
  }
}
