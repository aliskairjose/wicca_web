import { Component, input, OnChanges, output } from '@angular/core';

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss'
})
export class SwitchComponent {
  text = input<string>();
  isChecked = input<boolean>(false);
  onChange = output<boolean>();

  get id(): number {
    return Math.random();
  }

  change(event: any) {
    this.onChange.emit(event.target.checked);
  }

}
