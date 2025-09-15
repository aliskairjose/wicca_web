import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorPolicyComponent } from './advisor-policy.component';

describe('AdvisorPolicyComponent', () => {
  let component: AdvisorPolicyComponent;
  let fixture: ComponentFixture<AdvisorPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvisorPolicyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvisorPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
