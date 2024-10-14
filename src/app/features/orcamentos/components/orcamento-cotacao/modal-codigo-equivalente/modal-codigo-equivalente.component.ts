import { Component, Input } from '@angular/core';
import { CotacaoService } from '../../../../cotacoes/services/cotacao.service';
import { MessageService } from '../../../../../shared/services/message/message.service';
import { FormControl, FormGroup } from '@angular/forms';
import { CodigoEquivalente } from '../../../../../interfaces/cotacao/codigoEquivalente';
import { AdicionarCodigoEquivalenteRequest } from '../../../../../interfaces/cotacao/adicionarCodigoEquivalenteRequest';
import { ItemCotacao } from '../../../../../interfaces/cotacao/itemCotacao';

@Component({
  selector: 'app-modal-codigo-equivalente',
  standalone: true,
  imports: [],
  templateUrl: './modal-codigo-equivalente.component.html',
  styleUrl: './modal-codigo-equivalente.component.css',
})
export class ModalCodigoEquivalenteComponent {
  @Input() item: ItemCotacao = {} as ItemCotacao;
  codigoEquivalente: CodigoEquivalente[] = [];

  codigoEquivalenteForm = new FormGroup({
    sku: new FormControl(''),
    fabricante: new FormControl(''),
    tipoProdutoEquivalente: new FormControl(1),
  });

  constructor(
    private cotacaoService: CotacaoService,
    private messageService: MessageService
  ) {}

  ngOnInit() {}

  submit() {}

  create() {
    const codigoEquivalente: AdicionarCodigoEquivalenteRequest =
      this.criarCodigoEquivalente();

    this.cotacaoService
      .adicionarCodigoEquivalente(codigoEquivalente)
      .subscribe({
        next: () => {
          this.messageService.success(
            'Código equivalente adicionado com sucesso!'
          );
        },
        error: (error) => {
          this.messageService.error(error.error.errors[0]);
        },
      });
  }

  criarCodigoEquivalente() {
    return {
      itemId: this.item.id,
      cotacaoId: this.item.cotacaoId,
      fabricanteId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      sku: this.codigoEquivalenteForm.get('sku')?.value || '',
      fabricante: this.codigoEquivalenteForm.get('fabricante')?.value || '',
      tipoProdutoEquivalente: Number(
        this.codigoEquivalenteForm.get('tipoProdutoEquivalente')?.value || 1
      ),
    };
  }
}
