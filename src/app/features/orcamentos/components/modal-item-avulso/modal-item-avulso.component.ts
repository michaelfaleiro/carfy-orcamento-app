import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MessageService } from '../../../../shared/services/message/message.service';
import { OrcamentoService } from '../../services/orcamento.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ItemAvulso } from '../../../../interfaces/item/itemAvulso';
import { AdicionarItemAvulsoOrcamentoRequest } from '../../../../interfaces/orcamento/adicionarItemAvulsoOrcamentoRequest';
import { NgxCurrencyDirective } from 'ngx-currency';
import { Fabricante } from '../../../../interfaces/item/fabricante';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-item-avulso',
  standalone: true,
  imports: [ReactiveFormsModule, NgxCurrencyDirective, CommonModule],
  templateUrl: './modal-item-avulso.component.html',
  styleUrl: './modal-item-avulso.component.css',
})
export class ModalItemAvulsoComponent {
  @ViewChild('quantidadeInput') quantidadeInput!: ElementRef;
  @Input() orcamentoId: string = '';
  @Input() itemAvulso: ItemAvulso = {} as ItemAvulso;
  @Output() close = new EventEmitter();
  @Output() updateItem = new EventEmitter();
  fabricantes: Fabricante[] = [];

  itemForm = new FormGroup({
    quantidade: new FormControl(1),
    sku: new FormControl(''),
    fabricanteId: new FormControl(''),
    descricao: new FormControl(''),
    valorVenda: new FormControl(0),
  });

  constructor(
    private orcamentoService: OrcamentoService,
    private message: MessageService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.carregarFabricantes();
    if (this.itemAvulso.id) {
      this.itemForm.patchValue({
        quantidade: this.itemAvulso.quantidade,
        sku: this.itemAvulso.sku,
        fabricanteId: this.itemAvulso.fabricanteId,
        descricao: this.itemAvulso.descricao,
        valorVenda: this.itemAvulso.valorVenda,
      });
    }
  }

  ngAfterViewInit() {
    this.quantidadeInput.nativeElement.focus();
  }

  carregarFabricantes() {
    this.http
      .get<Fabricante[]>('../../../../../assets/dados/fabricanteProdutos.json')
      .subscribe({
        next: (fabricantes) => {
          this.fabricantes = fabricantes;
        },
      });
  }

  submit() {
    if (this.itemAvulso.id) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    const item: AdicionarItemAvulsoOrcamentoRequest = this.criarItem();
    this.orcamentoService.adicionarItemAvulso(item).subscribe({
      next: (item) => {
        this.message.success('Item adicionado com sucesso!');
        this.closeModal();
        this.updateItem.emit(item);
      },
      error: (error) => {
        this.message.error(error.error.errors[0]);
      },
    });
  }

  update() {
    const item: AdicionarItemAvulsoOrcamentoRequest = this.criarItem();
    item.itemAvulsoId = this.itemAvulso.id;
    this.orcamentoService.updateItemAvulso(item).subscribe({
      next: (item) => {
        this.message.success('Item atualizado com sucesso!');
        this.closeModal();
        this.updateItem.emit(item);
      },
      error: (error) => {
        this.message.error(error.error.errors[0]);
      },
    });
  }

  getById() {}

  closeModal() {
    this.itemAvulso = {} as ItemAvulso;
    this.itemForm.reset();
    this.close.emit();
  }

  criarItem() {
    return {
      orcamentoId: this.orcamentoId,
      sku: this.itemForm.get('sku')?.value || '',
      fabricanteId: this.itemForm.get('fabricanteId')?.value || '',
      fabricante: this.getDescricaoFabricante(),
      descricao: this.itemForm.get('descricao')?.value || '',
      valorVenda: Number(this.itemForm.get('valorVenda')?.value),
      quantidade: Number(this.itemForm.get('quantidade')?.value),
    };
  }

  getDescricaoFabricante(): string {
    const fabricanteId = this.itemForm.get('fabricanteId')?.value;
    const fabricante = this.fabricantes.find((f) => f.id === fabricanteId);
    return fabricante ? fabricante.fabricante : '';
  }
}
