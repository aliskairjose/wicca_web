import {
  Component,
  forwardRef,
  input,
  OnChanges,
  output,
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
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgxMaskDirective],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    provideNgxMask(),
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
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  helperText = input<string>('');

  value = '';
  errorMessage = signal('');
  control = input<AbstractControl>(new FormControl());
  isSubmitted = input<boolean>(false);
  inputLabel = new Date().getTime();

  onInputChange = output<any>();

  #onChange: any = () => { };
  #onTouched: any = () => { };

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
    this.onInputChange.emit(event);
    this.#onChange(event);
    this.#onTouched();
    this.validate(this.control());
  }

  toFixed = (value: string | number | undefined | null): number => {
    const formattedValue = String(value).split(' ').join('');
    if (String(value).includes('.') && String(value).split('.').length === 2) {
      const decimal = String(value).split('.')[1]?.length;
      if (decimal && decimal > 2) {
        return Number(parseFloat(formattedValue).toFixed(2));
      }
    }
    return Number(formattedValue);
  };
}
