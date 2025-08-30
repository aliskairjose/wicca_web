import { Component, forwardRef, input, OnChanges, output, signal, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { Helper } from '@shared/helpers';
import { CommonModule } from '@angular/common';

export interface OPTION_DATA {
  val: string | number | null;
  title: string;
}
@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements Validator, ControlValueAccessor, OnChanges {
  errorMessage = signal('');
  isSubmitted = input<boolean>(false);
  data = input.required<OPTION_DATA[]>();
  control = input<AbstractControl>(new FormControl());
  changeHandler = output<any>();
  value = '';
  label = input<string>('');
  defaultValue = input<string | number>();

  #onChange: any = () => { };
  #onTouched: any = () => { };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isSubmitted']) {
      this.validate(this.control());
    }
  }

  onValueChange({ value }: any): void {
    this.#onChange(value);
    this.#onTouched();
    this.validate(this.control());
    this.changeHandler.emit(value);
  }

  writeValue(value: any): void {
    this.value = value ? value : '';
  }

  registerOnChange(fn: any): void {
    this.#onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.#onTouched = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const controlErrors: ValidationErrors | null = control.errors;
    if (controlErrors !== null) {
      let keyError = '';
      let errorValue = '';
      Object.keys(controlErrors).forEach((_keyError) => {
        keyError = _keyError;
        errorValue = controlErrors[keyError];
      });

      Helper.controlErrorMap(keyError, errorValue, (res: string) => this.errorMessage.set(res));
    }
    return null;
  }
}
