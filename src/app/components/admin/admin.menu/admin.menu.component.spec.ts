import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Admin.MenuComponent } from './admin.menu.component';

describe('Admin.MenuComponent', () => {
  let component: Admin.MenuComponent;
  let fixture: ComponentFixture<Admin.MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Admin.MenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Admin.MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
