import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateStatsComponent } from './rate-stats.component';

describe('RateStatsComponent', () => {
  let component: RateStatsComponent;
  let fixture: ComponentFixture<RateStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
