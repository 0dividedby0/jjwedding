import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BridalPageComponent } from './bridal-page.component';

describe('BridalPageComponent', () => {
  let component: BridalPageComponent;
  let fixture: ComponentFixture<BridalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BridalPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BridalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
