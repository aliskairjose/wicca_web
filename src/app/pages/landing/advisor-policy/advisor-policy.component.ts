import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { LegalService } from '../../dashboard/legal/legal.service';
import { LegalEnum } from '../../dashboard/legal/enums/legal.enum';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-advisor-policy',
  standalone: true,
  imports: [],
  templateUrl: './advisor-policy.component.html',
  styleUrl: './advisor-policy.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AdvisorPolicyComponent implements OnInit {
  #service = inject(LegalService);
  #sanitizer = inject(DomSanitizer);

  advisorPolicies: string | undefined;


  ngOnInit(): void {
    this.#service.list().subscribe((res) => {
      this.advisorPolicies = res.find(
        (legal) => legal.type === LegalEnum.AdvisorPolicies,
      )?.content;
    });
  }

  transformYourHtml(): SafeHtml {
    return this.#sanitizer.bypassSecurityTrustHtml(this.advisorPolicies!);
  }
}
