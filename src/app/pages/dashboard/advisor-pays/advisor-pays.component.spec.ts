import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorPaysComponent } from './advisor-pays.component';

describe('AdvisorPaysComponent', () => {
  let component: AdvisorPaysComponent;
  let fixture: ComponentFixture<AdvisorPaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvisorPaysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvisorPaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
