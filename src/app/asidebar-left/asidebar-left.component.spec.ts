import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsidebarLeftComponent } from './asidebar-left.component';

describe('AsidebarLeftComponent', () => {
  let component: AsidebarLeftComponent;
  let fixture: ComponentFixture<AsidebarLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsidebarLeftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsidebarLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
