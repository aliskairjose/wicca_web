import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WompiComponent } from './wompi.component';

describe('WompiComponent', () => {
  let component: WompiComponent;
  let fixture: ComponentFixture<WompiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WompiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WompiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
