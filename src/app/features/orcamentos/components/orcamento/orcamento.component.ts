import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Orcamento } from '../../../../interfaces/orcamento/orcamento';
import { MessageService } from '../../../../shared/services/message/message.service';
import { OrcamentoService } from '../../services/orcamento.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalItemAvulsoComponent } from '../modal-item-avulso/modal-item-avulso.component';
import { ItemAvulso } from '../../../../interfaces/item/itemAvulso';
import { NgxMaskPipe } from 'ngx-mask';
import { NgxCurrencyDirective } from 'ngx-currency';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  FormsModule,
} from '@angular/forms';
import { CotacaoComponent } from '../orcamento-cotacao/cotacao/cotacao.component';

@Component({
  selector: 'app-orcamento',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ModalItemAvulsoComponent,
    CotacaoComponent,
    NgxMaskPipe,
    NgxCurrencyDirective,
  ],

  templateUrl: './orcamento.component.html',
  styleUrl: './orcamento.component.css',
})
export class OrcamentoComponent {
  orcamento$ = new Observable<Orcamento>();
  itemAvulso = {} as ItemAvulso;
  valorTotalOrcamento = 0;
  orcamentoId: string = '';
  isModalItemAvulso = false;
  isModalCotacao = false;
  valorFrete = 0;
  valorDesconto = 0;
  valorCupomDesconto = 0;
  isPercent: boolean = false;
  observacao: string = '';
  observacaoInterna: string = '';
  statusForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private orcamentoService: OrcamentoService,
    private message: MessageService,
    private route: ActivatedRoute
  ) {
    this.statusForm = this.fb.group({
      status: [''],
    });
  }

  ngOnInit() {
    this.orcamentoId = this.route.snapshot.paramMap.get('id')!;
    if (this.orcamentoId) {
      this.getOrcamento(this.orcamentoId);
    } else {
      this.message.error('Orçamento não encontrado!');
    }
  }

  getOrcamento(orcamentoId: string) {
    this.orcamento$ = this.orcamentoService.getById(orcamentoId);
    this.orcamento$.subscribe({
      next: (orcamento: Orcamento) => {
        this.statusForm.get('status')?.setValue(orcamento.status);
        this.valorFrete = orcamento.valorFrete;
        this.valorDesconto = orcamento.valorDesconto;
        this.valorCupomDesconto = orcamento.cupomDesconto;
        this.observacao = orcamento.observacao; // Adicione esta linha
        this.observacaoInterna = orcamento.observacaoInterna;
        this.valorTotalOrcamento = this.totalOrcamento(orcamento);
      },
      error: (error) => {
        this.message.error(error.error.errors[0]);
      },
    });
  }

  alterarStatus() {
    const novoStatus = this.statusForm.get('status')?.value;
    this.orcamentoService
      .alterarStatus({ id: this.orcamentoId, status: novoStatus })
      .subscribe({
        next: () => {
          this.getOrcamento(this.orcamentoId);
          this.message.success('Status alterado com sucesso!');
        },
        error: (error) => {
          this.message.error(error.error.errors[0]);
        },
      });
  }

  atualizarFrete(event: any) {
    this.removeFocus(event);
    this.orcamentoService
      .atualizarFrete(this.orcamentoId, this.valorFrete)
      .subscribe({
        next: () => {
          this.message.success('Frete atualizado com sucesso!');
          this.getOrcamento(this.orcamentoId);
        },
        error: (error) => {
          this.message.error(error.error.errors[0]);
        },
      });
  }

  atualizarDesconto(event: any) {
    this.removeFocus(event);
    this.orcamentoService
      .atualizarDesconto(this.orcamentoId, this.valorDesconto)
      .subscribe({
        next: () => {
          this.message.success('Desconto atualizado com sucesso!');
          this.getOrcamento(this.orcamentoId);
        },
        error: (error) => {
          this.message.error(error.error.errors[0]);
        },
      });
  }

  atualizarCupomDesconto(event: any) {
    this.removeFocus(event);
    this.orcamentoService
      .atualizarCupomDesconto(this.orcamentoId, this.valorCupomDesconto)
      .subscribe({
        next: () => {
          this.message.success('Cupom de desconto atualizado com sucesso!');
          this.getOrcamento(this.orcamentoId);
        },
        error: (error) => {
          this.message.error(error.error.errors[0]);
        },
      });
  }

  salvarObservacao() {
    this.orcamentoService
      .atualizarObservacao(this.orcamentoId, this.observacao)
      .subscribe({
        next: () => {
          this.message.success('Observação atualizada com sucesso!');
          this.getOrcamento(this.orcamentoId); // Atualize o orçamento após a atualização da observação
        },
        error: (error) => {
          this.message.error(error.error.errors[0]);
        },
      });
  }

  salvarObservacaoInterna() {
    this.orcamentoService
      .atualizarObservacaoInterna(this.orcamentoId, this.observacaoInterna)
      .subscribe({
        next: () => {
          this.message.success('Observação interna atualizada com sucesso!');
          this.getOrcamento(this.orcamentoId);
        },
        error: (error) => {
          this.message.error(error.error.errors[0]);
        },
      });
  }

  editarItemAvulso(itemAvulso: ItemAvulso) {
    this.itemAvulso = itemAvulso;
    this.showModalItemAvulso();
  }

  removerItemAvulso(itemAvulso: ItemAvulso) {
    this.orcamentoService
      .deleteItemAvulso(this.orcamentoId, itemAvulso.id)
      .subscribe({
        next: (response) => {
          this.getOrcamento(this.orcamentoId);
          this.message.success('Item removido com sucesso!');
        },
        error: (error) => {
          this.message.error(error.error.errors[0]);
        },
      });
  }

  totalOrcamento(orcamento: Orcamento) {
    return (
      orcamento.totalProdutos -
      orcamento.cupomDesconto -
      orcamento.valorDesconto +
      orcamento.valorFrete
    );
  }

  showModalItemAvulso() {
    this.isModalItemAvulso = !this.isModalItemAvulso;
    if (!this.isModalItemAvulso) {
      this.itemAvulso = {} as ItemAvulso;
    }
  }

  showModalCotacao() {
    this.isModalCotacao = !this.isModalCotacao;
  }

  removeFocus(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    inputElement.blur();
  }
}
