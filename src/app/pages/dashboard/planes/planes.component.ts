import { Component, Inject, inject, OnInit, signal, OnChanges } from '@angular/core';
import { PlanesService } from './planes.service';
import { PlanInterface } from './interfaces/plan.interface';
import { CommonModule, CurrencyPipe, DatePipe, DOCUMENT } from '@angular/common';
import { HSOverlay } from 'flyonui/flyonui';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BadgeComponent, InputComponent, SwitchComponent } from '@shared/components';


@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, CommonModule, ReactiveFormsModule, InputComponent, SwitchComponent, BadgeComponent],
  templateUrl: './planes.component.html',
  styleUrl: './planes.component.scss'
})
export class PlanesComponent implements OnInit {
  form!: FormGroup;
  #fb = inject(FormBuilder);

  #service = inject(PlanesService);
  isEdit = signal(false);
  isSubmited = signal(false);
  isActive = true;

  planes: PlanInterface[] = [];
  plan = signal<PlanInterface | undefined>(undefined);

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
    this.form = this.#fb.group({
      amount: [''],
      bonus: [''],
      isActive: ['']
    })
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this._loadData();
  }

  openModal(isEdit = false, index = 0): void {
    this.isEdit.set(isEdit);

    if (isEdit) {
      this.plan.set(this.planes[index]);

      this.form.patchValue({
        amount: this.plan()!.amount,
        bonus: this.plan()!.bonus,
        isActive: this.plan()!.isActive
      });
    }

    const modal = new HSOverlay(this.document.querySelector('#plan-modal')!);
    modal.open()
  }

  closeModal(): void {
    this.form.reset();
    const modal = new HSOverlay(this.document.querySelector('#plan-modal')!);
    modal.close();
  }

  onChange(event: boolean): void {
    this.form.patchValue({ isActive: event })
  }

  onSubmit(): void {
    (this.isEdit())
      ? this._update()
      : this._create();
  }

  onDelete(): void {
    this._delete();
  }

  private _create(): void {
    this.#service.create(this.form.value).subscribe(() => {
      this.closeModal();
      this._loadData()
    });
  }

  private _update(): void {
    this.#service.update(this.plan()!._id, this.form.value).subscribe(() => {
      this.closeModal();
      this._loadData()
    });
  }

  private _delete(): void {
    this.#service.delete(this.plan()!._id).subscribe(() => {
      this.closeModal();
      this._loadData();
    })
  }

  private _loadData(): void {
    this.#service.list().subscribe((planes) => this.planes = planes);
  }


}
