import { Directive, ElementRef, inject, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStatus]',
  standalone: true,
})
export class StatusDirective implements OnInit {
  @Input() appStatus = false;

  #el = inject(ElementRef);
  #renderer = inject(Renderer2);

  ngOnInit(): void {
    const text = this.appStatus ? 'Activo' : 'Inactivo';
    const statusClass = this.appStatus ? 'badge-success' : 'badge-error';
    const status = this.#renderer.createText(text);

    this.#renderer.appendChild(this.#el.nativeElement, status);
    this.#renderer.addClass(this.#el.nativeElement, 'badge');
    this.#renderer.addClass(this.#el.nativeElement, 'badge-sm');
    this.#renderer.addClass(this.#el.nativeElement, 'badge-outline');
    this.#renderer.addClass(this.#el.nativeElement, statusClass);
  }
}
