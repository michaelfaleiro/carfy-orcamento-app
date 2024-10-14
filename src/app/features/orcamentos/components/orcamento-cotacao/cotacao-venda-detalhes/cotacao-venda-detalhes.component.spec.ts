import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotacaoVendaDetalhesComponent } from './cotacao-venda-detalhes.component';

describe('CotacaoVendaDetalhesComponent', () => {
  let component: CotacaoVendaDetalhesComponent;
  let fixture: ComponentFixture<CotacaoVendaDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CotacaoVendaDetalhesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CotacaoVendaDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
