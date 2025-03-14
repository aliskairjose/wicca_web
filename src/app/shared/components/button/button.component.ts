import { AfterViewInit, Component, input, output } from '@angular/core';
import { SHAPE, STYLE, WIDTH } from './button.type';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent implements AfterViewInit {

  text = input<string>('');
  width = input<WIDTH>();
  style = input<STYLE>('primary');
  shape = input<SHAPE>();
  clear = input<boolean>(false);
  icon = input<string>();
  classList = '';

   clickHandler = output();

  ngAfterViewInit(): void {
    this.classList = `
      btn-${this.width()}
      btn-${this.style() }
      btn-${this.shape() }
    `;
  }

    onClickHandler(): void {
    this.clickHandler.emit();
  }
}
