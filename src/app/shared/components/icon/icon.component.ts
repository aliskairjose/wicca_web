import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  icon = input.required<string>()
  size = input<string>('');

  iconClass = computed(() => {
    const size = this.size() ? `size-${this.size()}` : '';
    return `icon-[tabler--${this.icon()}] ${size}`;
  });
}
