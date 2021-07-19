import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaTecnicoComponent } from './ficha-tecnico.component';

describe('FichaTecnicoComponent', () => {
  let component: FichaTecnicoComponent;
  let fixture: ComponentFixture<FichaTecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaTecnicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
