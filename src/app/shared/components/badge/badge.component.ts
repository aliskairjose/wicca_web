import { AfterViewInit, Component, ElementRef, inject, input, Renderer2, ViewChild } from '@angular/core';
import { SHAPE, SIZE, STYLE } from './type';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss'
})
export class BadgeComponent implements AfterViewInit {
  text = input<string>();
  theme = input<STYLE>('neutral');
  size = input<SIZE>(undefined);
  shape = input<SHAPE>(undefined)
  icon = input<string>();
  avatar = input<string>();
  outline = input<boolean>(false);

  #renderer = inject(Renderer2);
  @ViewChild('badge') badge!: ElementRef;
  @ViewChild('iconSpan') iconSpan!: ElementRef;

  ngAfterViewInit(): void {
    this.#renderer.addClass(this.badge.nativeElement, `${this.theme()}`);
    (this.size() && !this.shape()) && this.#renderer.addClass(this.badge.nativeElement, `${this.size()}`);
    (this.shape()) && this.#renderer.addClass(this.badge.nativeElement, this.shape()!);
    (this.icon()) && this.#renderer.addClass(this.iconSpan.nativeElement, `icon-[tabler--${this.icon()}]`);
    (this.outline()) && this.#renderer.addClass(this.badge.nativeElement, `badge-outline`);
  }

}
