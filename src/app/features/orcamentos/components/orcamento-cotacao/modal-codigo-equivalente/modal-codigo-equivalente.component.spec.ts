import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCodigoEquivalenteComponent } from './modal-codigo-equivalente.component';

describe('ModalCodigoEquivalenteComponent', () => {
  let component: ModalCodigoEquivalenteComponent;
  let fixture: ComponentFixture<ModalCodigoEquivalenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCodigoEquivalenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCodigoEquivalenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
