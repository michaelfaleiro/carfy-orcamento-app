import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MessageService } from '../../../../../shared/services/message/message.service';
import { CotacaoService } from '../../../../cotacoes/services/cotacao.service';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { AdicionarItemCotacaoRequest } from '../../../../../interfaces/cotacao/adicionarItemCotacaoRequest';
import { ItemCotacao } from '../../../../../interfaces/cotacao/itemCotacao';

@Component({
  selector: 'app-modal-item-cotacao',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-item-cotacao.component.html',
  styleUrl: './modal-item-cotacao.component.css',
})
export class ModalItemCotacaoComponent {
  @ViewChild('quantidadeInput') quantidadeInput!: ElementRef;
  @Input() item: ItemCotacao = {} as ItemCotacao;
  @Input() cotacaoId = '';
  @Output() close = new EventEmitter<void>();
  @Output() updateCotacao = new EventEmitter<void>();
  itemId = '';

  itemForm = new FormGroup({
    sku: new FormControl(''),
    descricao: new FormControl(''),
    quantidade: new FormControl(1),
    tipoProduto: new FormControl('1'),
  });

  constructor(
    private cotacaoService: CotacaoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    if (this.item.id) {
      this.itemForm.patchValue({
        sku: this.item.sku,
        descricao: this.item.descricao,
        quantidade: this.item.quantidade,
        tipoProduto: this.item.tipoProduto.toString(),
      });
    }
  }

  ngAfterViewInit(): void {
    this.quantidadeInput.nativeElement.focus();
  }

  submit() {
    if (this.item.id) {
      this.updateItem();
    } else {
      this.createItem();
    }
  }

  createItem(): void {
    const item: AdicionarItemCotacaoRequest = this.criarItem();
    this.cotacaoService.adicionarItemCotacao(item).subscribe({
      next: () => {
        this.messageService.success('Item adicionado com sucesso!');
        this.closeModal();
        this.updateCotacao.emit();
      },
      error: (error) => {
        this.messageService.error(error.error.errors[0]);
      },
    });
  }

  updateItem(): void {
    const item: AdicionarItemCotacaoRequest = this.criarItem();
    this.cotacaoService.atualizarItemCotacao(item).subscribe({
      next: () => {
        this.messageService.success('Item atualizado com sucesso!');
        this.closeModal();
        this.updateCotacao.emit();
      },
      error: (error) => {
        this.messageService.error(error.error.errors[0]);
      },
    });
  }

  criarItem() {
    return {
      id: this.item.id,
      cotacaoId: this.cotacaoId,
      sku: this.itemForm.get('sku')?.value ?? '',
      descricao: this.itemForm.get('descricao')?.value ?? '',
      quantidade: this.itemForm.get('quantidade')?.value ?? 1,
      tipoProduto: Number(this.itemForm.get('tipoProduto')?.value ?? 1),
    };
  }

  closeModal(): void {
    this.itemForm.reset();
    this.close.emit();
  }
}
