import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { LegalService } from '../../dashboard/legal/legal.service';
import { LegalEnum } from '../../dashboard/legal/enums/legal.enum';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class FaqComponent {
  #service = inject(LegalService);
  #sanitizer = inject(DomSanitizer);

  faq: string | undefined;

  ngOnInit(): void {
    this.#service.list().subscribe((res) => {
      this.faq = res.find(
        (legal) => legal.type === LegalEnum.FAQ,
      )?.content;
    });
  }

  transformYourHtml(): SafeHtml {
    return this.#sanitizer.bypassSecurityTrustHtml(this.faq!);
  }
}
