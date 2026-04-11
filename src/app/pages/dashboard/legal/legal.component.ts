import { Component, inject, OnInit } from '@angular/core';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [EditorComponent, ReactiveFormsModule],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: '/tinymce/tinymce.min.js' },
  ],
  templateUrl: './legal.component.html',
  styleUrl: './legal.component.scss',
})
export class LegalComponent implements OnInit {
  termAndCondForm!: FormGroup;
  advisorPoliciesForm!: FormGroup;

  #fb = inject(FormBuilder);

  ngOnInit(): void {
    this.termAndCondForm = this.#fb.group({
      content: ['']
    });
    this.advisorPoliciesForm = this.#fb.group({
      content: ['']
    });
  }


  init: EditorComponent['init'] = {
    menubar: false,
    plugins: 'advlist autolink lists link image table code help wordcount',
    base_url: '/tinymce', // Root for resources
    suffix: '.min',
    toolbar:
      'undo redo | blocks | bold italic underline | alignleft aligncenter alignright | bullist numlist | help',
  };

  onSaveTermAndCond() {
    const content = this.termAndCondForm.value.content;
    console.log(content);
  }

  onSaveAdvisorPolicies() {
    const content = this.advisorPoliciesForm.value.content;
    console.log(content);
  }
}
