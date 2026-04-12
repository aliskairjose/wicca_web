import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { PlanesService } from './planes.service';
import { PlanInterface } from './interfaces/plan.interface';
import { CommonModule, CurrencyPipe, DatePipe, DOCUMENT } from '@angular/common';
import { HSOverlay } from 'flyonui/flyonui';


@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, CommonModule],
  templateUrl: './planes.component.html',
  styleUrl: './planes.component.scss'
})
export class PlanesComponent implements OnInit {
  #service = inject(PlanesService);
  isEdit = signal(false);

  planes: PlanInterface[] = [];
  plan = signal<PlanInterface | undefined>(undefined);

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.#service.list().subscribe((planes) => this.planes = planes);
  }

  openModal(isEdit = false, index?: number): void {
    this.isEdit.set(isEdit);
    (index && isEdit) && this.plan.set(this.planes[index]);
    const modal = new HSOverlay(this.document.querySelector('#plan-modal')!);
    modal.open()
  }

  closeModal(): void {
    const modal = new HSOverlay(this.document.querySelector('#plan-modal')!);
    modal.close();
  }

}
