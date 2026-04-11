import { Component } from '@angular/core';
import EditorJS from '@editorjs/editorjs';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [],
  templateUrl: './legal.component.html',
  styleUrl: './legal.component.scss',
})
export class LegalComponent {
  editor = new EditorJS('editorjs');
}
