import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalItemAvulsoComponent } from './modal-item-avulso.component';

describe('ModalItemAvulsoComponent', () => {
  let component: ModalItemAvulsoComponent;
  let fixture: ComponentFixture<ModalItemAvulsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalItemAvulsoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalItemAvulsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
