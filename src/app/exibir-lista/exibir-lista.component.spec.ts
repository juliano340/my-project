import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibirListaComponent } from './exibir-lista.component';

describe('ExibirListaComponent', () => {
  let component: ExibirListaComponent;
  let fixture: ComponentFixture<ExibirListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExibirListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExibirListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
