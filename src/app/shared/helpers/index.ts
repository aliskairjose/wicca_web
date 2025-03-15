import { Injectable } from '@angular/core';

type ErrorMapCallBackFn = (result: string) => void;
interface Rates {
  rate: number;
  votes: number;
}

@Injectable()
export class Helper {

  static controlErrorMap(errorKey: string, errorValue: any, callbackfn: ErrorMapCallBackFn): void {

    const ERRORS_MESSAGE =
      {
        required: 'El campo es obligatorio',
        minlength: `El campo debe tener al menos ${errorValue.requiredLength}`,
        pattern: `El campo debe tener al menos ${errorValue.requiredLength}`,
        email: 'Email no válido',
        max: `El valor no debe ser superior a ${errorValue.max}`,
        min: `El valor no debe ser inferior a ${errorValue.min}`,
      }[errorKey] || 'Error desconocido';

    callbackfn(ERRORS_MESSAGE);
  }

  static deleteDiacriticosEs(query: string) {
    return query
      .normalize('NFD')
      .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, '$1')
      .normalize();
  }
}
