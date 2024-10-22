import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterOrcamentoRequest } from '../../../interfaces/orcamento/register-orcamento-request';
import { environment } from '../../../../environments/environment';
import { map, Observable } from 'rxjs';
import { Orcamento } from '../../../interfaces/orcamento/orcamento';
import { AdicionarItemAvulsoOrcamentoRequest } from '../../../interfaces/orcamento/adicionarItemAvulsoOrcamentoRequest';
import { AlterarStatusRequest } from '../../../interfaces/orcamento/alterarStatusRequest';

@Injectable({
  providedIn: 'root',
})
export class OrcamentoService {
  private url = `${environment.apiUrl}/orcamentos`;
  constructor(private http: HttpClient) {}

  create(register: RegisterOrcamentoRequest): Observable<Orcamento> {
    return this.http
      .post<{ data: Orcamento; errors: string[] }>(this.url, register)
      .pipe(map((response) => response.data));
  }

  getAll(status?: string): Observable<Orcamento[]> {
    return this.http
      .get<{ data: Orcamento[] }>(
        `${this.url}?pageNumber=1&pageSize=30&status=${status}&orderBy=CreatedAt`
      )
      .pipe(map((response) => response.data));
  }

  getById(id: string): Observable<Orcamento> {
    return this.http
      .get<{ data: Orcamento }>(`${this.url}/${id}`)
      .pipe(map((response) => response.data));
  }

  alterarStatus(status: AlterarStatusRequest): Observable<void> {
    return this.http.put<void>(`${this.url}/status`, status);
  }

  adicionarItemAvulso(
    itemAvulso: AdicionarItemAvulsoOrcamentoRequest
  ): Observable<void> {
    return this.http.post<void>(`${this.url}/itens-avulsos`, itemAvulso);
  }

  updateItemAvulso(
    itemAvulso: AdicionarItemAvulsoOrcamentoRequest
  ): Observable<void> {
    return this.http.put<void>(`${this.url}/itens-avulsos`, itemAvulso);
  }

  deleteItemAvulso(
    orcamentoId: string,
    itemAvulsoId: string
  ): Observable<void> {
    return this.http.delete<void>(`${this.url}/itens-avulsos`, {
      body: { orcamentoId, itemAvulsoId },
    });
  }

  atualizarFrete(id: string, valorFrete: number): Observable<void> {
    return this.http.post<void>(`${this.url}/frete`, {
      id,
      valorFrete,
    });
  }

  atualizarDesconto(id: string, valorDesconto: number): Observable<void> {
    return this.http.post<void>(`${this.url}/desconto`, {
      id,
      valorDesconto,
    });
  }

  atualizarCupomDesconto(id: string, cupomDesconto: number): Observable<void> {
    return this.http.post<void>(`${this.url}/cupom`, {
      id,
      cupomDesconto,
    });
  }

  atualizarObservacao(id: string, observacao: string): Observable<void> {
    return this.http.post<void>(`${this.url}/observacao`, {
      id,
      observacao,
    });
  }

  atualizarObservacaoInterna(
    id: string,
    observacaoInterna: string
  ): Observable<void> {
    return this.http.post<void>(`${this.url}/observacao-interna`, {
      id,
      observacaoInterna,
    });
  }
}
