import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotacoesComponent } from './cotacoes.component';

describe('CotacoesComponent', () => {
  let component: CotacoesComponent;
  let fixture: ComponentFixture<CotacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CotacoesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CotacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
