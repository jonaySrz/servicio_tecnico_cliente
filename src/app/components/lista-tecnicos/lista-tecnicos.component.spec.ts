import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTecnicosComponent } from './lista-tecnicos.component';

describe('ListaTecnicosComponent', () => {
  let component: ListaTecnicosComponent;
  let fixture: ComponentFixture<ListaTecnicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTecnicosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTecnicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
