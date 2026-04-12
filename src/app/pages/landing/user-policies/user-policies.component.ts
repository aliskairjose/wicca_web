import { Component, inject, ViewEncapsulation } from '@angular/core';
import { LegalService } from '../../dashboard/legal/legal.service';
import { LegalEnum } from '../../dashboard/legal/enums/legal.enum';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-user-policies',
  standalone: true,
  imports: [],
  templateUrl: './user-policies.component.html',
  styleUrl: './user-policies.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class UserPoliciesComponent {
  #service = inject(LegalService);
  #sanitizer = inject(DomSanitizer);

  userPolicies: string | undefined;

  constructor() {
    this.#service.list().subscribe((res) => {
      this.userPolicies = res.find(
        (legal) => legal.type === LegalEnum.UserPolicies,
      )?.content;
    });
  }

  transformYourHtml(): SafeHtml {
    return this.#sanitizer.bypassSecurityTrustHtml(this.userPolicies!);
  }
}
