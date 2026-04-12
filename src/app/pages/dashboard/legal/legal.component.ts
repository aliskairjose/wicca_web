import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LegalService } from './legal.service';
import { LegalInterface } from './interfaces/legal.interface';
import { LegalType } from './types/legal.type';
import { LegalEnum } from './enums/legal.enum';

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

  legals = signal<LegalInterface[]>([]);

  #service = inject(LegalService);
  #fb = inject(FormBuilder);


  #onSave = {
    termAndCond: () => this._onSaveTermsAndConditions(),
    advisorPolicies: () => this._onSaveAdvisorPolicies(),
  }

  ngOnInit(): void {
    this._loadData();
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
      'undo redo | blocks | bold italic underline | alignleft aligncenter alignright | bullist numlist | outdent indent | help',
  };

  onSubmit(type: LegalType): void {
    this.#onSave[type]();
  }

  private _onSaveTermsAndConditions(): void {
    const exist = this.legals().find(legal => legal.type === LegalEnum.TermAndCond);
    (exist !== undefined)
      ? this._update(exist._id, this.termAndCondForm.value.content)
      : this._create({ ...this.termAndCondForm.value, type: LegalEnum.TermAndCond });
  }

  private _onSaveAdvisorPolicies(): void {
    const exist = this.legals().find(legal => legal.type === LegalEnum.AdvisorPolicies);
    (exist !== undefined)
      ? this._update(exist._id, this.advisorPoliciesForm.value.content)
      : this._create({ ...this.advisorPoliciesForm.value, type: LegalEnum.AdvisorPolicies });
  }

  private _update(id: string, content: string): void {
    this.#service.update(id, { content }).subscribe(() => this._loadData());
  }
  private _create(legal: Omit<LegalInterface, '_id'>): void {
    this.#service.create(legal).subscribe(() => this._loadData());
  }

  private _loadData(): void {
    this.#service.list().subscribe((res) => {
		this.legals.set(res);
		const termAndCond = res.find(legal => legal.type === LegalEnum.TermAndCond);
		const advisorPolicies = res.find(legal => legal.type === LegalEnum.AdvisorPolicies);
		if (termAndCond) {
			this.termAndCondForm.patchValue({ content: termAndCond.content });
		}
		if (advisorPolicies) {
			this.advisorPoliciesForm.patchValue({ content: advisorPolicies.content });
		}
	});
  }
}
