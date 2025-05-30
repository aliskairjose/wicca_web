import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  input,
  output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { SHAPE, STYLE, WIDTH } from './button.type';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent implements AfterViewInit {
  text = input<string | number>('');
  theme = input<STYLE>('primary');
  width = input<WIDTH>(undefined);
  shape = input<SHAPE>(undefined);
  clear = input<boolean>(false);
  outline = input<boolean>(false);
  disabled = input<boolean>(false);
  icon = input<string>();

  clickHandler = output();

  #renderer = inject(Renderer2);

  @ViewChild('button') button!: ElementRef;


  onClickHandler(): void {
    this.clickHandler.emit();
  }

  ngAfterViewInit(): void {
    this.#renderer.addClass(this.button.nativeElement, `${this.theme()}`);
    (this.width() && this.#renderer.addClass(this.button.nativeElement, `b-${this.width()}`));
    (this.shape() && this.#renderer.addClass(this.button.nativeElement, `btn-${this.shape()}`));
    (this.disabled() && this.#renderer.addClass(this.button.nativeElement, 'btn-disabled'));
  }
}
