import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPrecoFornecedorComponent } from './modal-preco-fornecedor.component';

describe('ModalPrecoFornecedorComponent', () => {
  let component: ModalPrecoFornecedorComponent;
  let fixture: ComponentFixture<ModalPrecoFornecedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPrecoFornecedorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalPrecoFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
