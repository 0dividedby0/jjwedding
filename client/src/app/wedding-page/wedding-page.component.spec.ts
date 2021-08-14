import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeddingPageComponent } from './wedding-page.component';

describe('WeddingPageComponent', () => {
  let component: WeddingPageComponent;
  let fixture: ComponentFixture<WeddingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeddingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeddingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
