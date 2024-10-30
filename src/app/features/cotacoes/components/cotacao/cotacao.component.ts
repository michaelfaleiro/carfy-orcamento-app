import { Component } from '@angular/core';
import { CotacaoService } from '../../services/cotacao.service';
import { MessageService } from '../../../../shared/services/message/message.service';
import { Observable } from 'rxjs';
import { Cotacao } from '../../../../interfaces/cotacao/cotacao';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalItemCotacaoComponent } from '../../../orcamentos/components/orcamento-cotacao/modal-item-cotacao/modal-item-cotacao.component';
import { ItemCotacao } from '../../../../interfaces/cotacao/itemCotacao';
import { ModalCodigoEquivalenteComponent } from '../../../orcamentos/components/orcamento-cotacao/modal-codigo-equivalente/modal-codigo-equivalente.component';
import { ModalPrecoFornecedorComponent } from '../modal-preco-fornecedor/modal-preco-fornecedor.component';
import { PrecoItem } from '../../../../interfaces/cotacao/precoItem';
import { HttpClient } from '@angular/common/http';
import { Status } from '../../../../interfaces/status';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cotacao',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalItemCotacaoComponent,
    ModalCodigoEquivalenteComponent,
    ModalPrecoFornecedorComponent,
    RouterLink,
  ],
  templateUrl: './cotacao.component.html',
  styleUrl: './cotacao.component.css',
})
export class CotacaoComponent {
  cotacaoId = '';
  itemId = '';
  cotacao$ = new Observable<Cotacao>();
  item: ItemCotacao = {} as ItemCotacao;
  precoItem = {} as PrecoItem;
  precos: PrecoItem[] = [];
  statusList: Status[] = [];
  itemDescricao = '';
  isModalItemCotacao = false;
  isModalCodigoEquivalente = false;
  isModalPrecoFornecedor = false;
  statusForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cotacaoService: CotacaoService,
    private messageService: MessageService,
    private router: ActivatedRoute,
    private http: HttpClient
  ) {
    this.statusForm = this.fb.group({
      status: [''],
    });
  }

  ngOnInit() {
    this.cotacaoId = this.router.snapshot.paramMap.get('id')!;
    this.carregarListaStatus();
    if (this.cotacaoId) {
      this.getCotacaoId();
    } else {
      this.messageService.error('Cotacao não encontrada');
    }
  }

  getCotacaoId() {
    this.cotacao$ = this.cotacaoService.getCotacaoById(this.cotacaoId);
    this.cotacao$.subscribe({
      next: (cotacao: Cotacao) => {
        this.statusForm.patchValue({ status: cotacao.status });
      },
      error: (error) => {
        this.messageService.error(error.error.errors[0]);
      },
    });
  }

  updatePrecoItem() {
    this.getCotacaoId();
    this.getPrecoItem(this.item);
  }

  getPrecoItem(item: ItemCotacao) {
    this.cotacaoService.getItemCotacao(item.id).subscribe({
      next: (itemCotacao: ItemCotacao) => {
        this.item = itemCotacao;
        this.precos = itemCotacao.precos;
      },
      error: (error) => {
        this.messageService.error(error.error.errors[0]);
      },
    });
  }

  editarItem(item: ItemCotacao) {
    this.item = item;
    this.showModalItemCotacao();
  }

  novoPrecoFornecedor(item: ItemCotacao) {
    this.precoItem = {} as PrecoItem;
    this.item = item;
    this.itemDescricao = item.descricao;
    this.isModalPrecoFornecedor = true;
  }

  editarPrecoItem(precoItem: PrecoItem) {
    this.precoItem = precoItem;

    this.showModalPrecoFornecedor(this.item);
  }

  removerPrecoItem(precoItem: PrecoItem) {
    this.cotacaoService
      .removerPrecoItemCotacao(this.cotacaoId, precoItem.itemId, precoItem.id)
      .subscribe({
        next: () => {
          this.messageService.success('Preço removido com sucesso');
          this.updatePrecoItem();
        },
        error: (error) => {
          this.messageService.error(error.error.errors[0]);
        },
      });
  }

  alterarStatus() {
    const novoStatus = Number(this.statusForm.get('status')?.value);
    this.cotacaoService
      .atualizarStatusCotacao(this.cotacaoId, novoStatus)
      .subscribe({
        next: () => {
          this.getCotacaoId();
          this.messageService.success('Status alterado com sucesso');
        },
        error: (error) => {
          this.messageService.error(error.error.errors[0]);
        },
      });
  }

  novoItem() {
    this.item = {} as ItemCotacao;
    this.showModalItemCotacao();
  }

  showModalItemCotacao() {
    this.isModalItemCotacao = !this.isModalItemCotacao;
  }

  showModalCodigoEquivalente(itemId: string) {
    this.itemId = itemId;
    this.isModalCodigoEquivalente = !this.isModalCodigoEquivalente;
    if (!this.isModalCodigoEquivalente) {
      this.itemId = '';
    }
  }

  showModalPrecoFornecedor(item: ItemCotacao) {
    this.cotacaoService.getItemCotacao(item.id).subscribe({
      next: (itemCotacao: ItemCotacao) => {
        this.item = itemCotacao;
        this.isModalPrecoFornecedor = true;
      },
      error: (error) => {
        this.messageService.error(error.error.errors[0]);
      },
    });
  }

  closeModalPrecoFornecedor() {
    this.isModalPrecoFornecedor = false;
  }

  carregarListaStatus() {
    this.http
      .get<Status[]>('../../../../../assets/dados/statusCotacao.json')
      .subscribe((statusList) => {
        this.statusList = statusList;
      });
  }
}
