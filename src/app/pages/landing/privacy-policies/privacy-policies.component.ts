import { Component, inject, ViewEncapsulation } from '@angular/core';
import { LegalService } from '../../dashboard/legal/legal.service';
import { LegalEnum } from '../../dashboard/legal/enums/legal.enum';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-policies',
  standalone: true,
  imports: [],
  templateUrl: './privacy-policies.component.html',
  styleUrl: './privacy-policies.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PrivacyPoliciesComponent {
  #service = inject(LegalService);
  #sanitizer = inject(DomSanitizer);

  privacyPolicies: string | undefined;

  constructor() {
    this.#service.list().subscribe((res) => {
      this.privacyPolicies = res.find(
        (legal) => legal.type === LegalEnum.PrivacyPolicies,
      )?.content;
    });
  }

  transformYourHtml(): SafeHtml {
    return this.#sanitizer.bypassSecurityTrustHtml(this.privacyPolicies!);
  }
}
