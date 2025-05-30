import { AfterViewInit, Component, ElementRef, inject, input, Renderer2, ViewChild } from '@angular/core';
import { THEME } from './icon.type';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent implements AfterViewInit {
  icon = input.required<string>()
  size = input<string>('');
  theme = input<THEME>()

  #renderer = inject(Renderer2);
  @ViewChild('iconSpan') iconSpan!: ElementRef;

  ngAfterViewInit(): void {
    const el = this.iconSpan.nativeElement;
    this.#renderer.addClass(el, `icon-[tabler--${this.icon()}]`);
    if (this.size()) {
      this.#renderer.addClass(el, `size-${this.size()}`);
    }
    if (this.theme()) {
      this.#renderer.addClass(el, `text-${this.theme()}`);
    }

  }

}
