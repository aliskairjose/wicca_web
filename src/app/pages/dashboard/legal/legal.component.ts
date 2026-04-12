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
  userPoliciesForm!: FormGroup;
  advisorPoliciesForm!: FormGroup;
  privacyPoliciesForm!: FormGroup;

  legals = signal<LegalInterface[]>([]);

  #service = inject(LegalService);
  #fb = inject(FormBuilder);


  #onSave = {
    userPolicies: () => this._onSaveUserPolicies(),
    advisorPolicies: () => this._onSaveAdvisorPolicies(),
    privacyPolicies: () => this._onSavePrivacyPolicies(),
  }

  ngOnInit(): void {
    this._loadData();
    this.userPoliciesForm = this.#fb.group({
      content: ['']
    });
    this.advisorPoliciesForm = this.#fb.group({
      content: ['']
    });
    this.privacyPoliciesForm = this.#fb.group({
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

  private _onSaveUserPolicies(): void {
    const exist = this.legals().find(legal => legal.type === LegalEnum.UserPolicies);
    (exist !== undefined)
      ? this._update(exist._id, this.userPoliciesForm.value.content)
      : this._create({ ...this.userPoliciesForm.value, type: LegalEnum.UserPolicies });
  }

  private _onSavePrivacyPolicies(): void {
    const exist = this.legals().find(legal => legal.type === LegalEnum.PrivacyPolicies);
    (exist !== undefined)
      ? this._update(exist._id, this.privacyPoliciesForm.value.content)
      : this._create({ ...this.privacyPoliciesForm.value, type: LegalEnum.PrivacyPolicies });
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
		const userPolicies = res.find(legal => legal.type === LegalEnum.UserPolicies);
		const advisorPolicies = res.find(legal => legal.type === LegalEnum.AdvisorPolicies);
		const privacyPolicies = res.find(legal => legal.type === LegalEnum.PrivacyPolicies);
    
		if (userPolicies) {
			this.userPoliciesForm.patchValue({ content: userPolicies.content });
		}
		if (advisorPolicies) {
			this.advisorPoliciesForm.patchValue({ content: advisorPolicies.content });
		}
		if (privacyPolicies) {
			this.privacyPoliciesForm.patchValue({ content: privacyPolicies.content });
		}
	});
  }
}
