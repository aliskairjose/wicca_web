import {
  Component,
  forwardRef,
  input,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { Type } from './input.types';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Helper } from '@shared/helpers';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor, Validators, OnChanges {
  placeholder = input<string>('');
  type = input<Type>('text');
  label = input<string>('');
  helperText = input<string>('');

  value = '';
  errorMessage = signal('');
  control = input<AbstractControl>(new FormControl());
  isSubmitted = input<boolean>(false);
  inputLabel = new Date().getTime();

  #onChange: any = () => {};
  #onTouched: any = () => {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isSubmitted']?.currentValue) {
      this.validate(this.control());
    }
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

      Helper.controlErrorMap(keyError, errorValue, (res: string) =>
        this.errorMessage.set(res)
      );
    }
    return null;
  }

  registerOnValidatorChange?(): void {
    throw new Error('Method not implemented.');
  }

  writeValue(value: string): void {
    this.value = value ? value : '';
  }
  registerOnChange(fn: any): void {
    this.#onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.#onTouched = fn;
  }

  onValueChange(event: any) {
    this.#onChange(event);
    this.#onTouched();
    this.validate(this.control());
  }
}
