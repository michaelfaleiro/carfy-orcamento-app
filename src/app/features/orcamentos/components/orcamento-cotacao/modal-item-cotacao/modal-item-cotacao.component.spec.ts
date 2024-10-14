import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalItemCotacaoComponent } from './modal-item-cotacao.component';

describe('ModalItemCotacaoComponent', () => {
  let component: ModalItemCotacaoComponent;
  let fixture: ComponentFixture<ModalItemCotacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalItemCotacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalItemCotacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
