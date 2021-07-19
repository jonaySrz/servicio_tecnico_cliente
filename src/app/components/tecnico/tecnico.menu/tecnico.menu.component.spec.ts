import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tecnico.MenuComponent } from './tecnico.menu.component';

describe('Tecnico.MenuComponent', () => {
  let component: Tecnico.MenuComponent;
  let fixture: ComponentFixture<Tecnico.MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tecnico.MenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tecnico.MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
