import { CommonModule } from '@angular/common';
import { Component, forwardRef, input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Helper } from '@shared/helpers';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
})
export class TextareaComponent implements ControlValueAccessor, Validators, OnChanges {
  value = '';
  label = input<string>('');
  placeholder = input<string>('');
  errorMessage = signal('');
  control = input<AbstractControl>(new FormControl());
  isSubmitted = input<boolean>(false);

  #onChange: any = () => { };
  #onTouched: any = () => { };

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isSubmitted']?.currentValue) {
      this.validate(this.control());
    }
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
