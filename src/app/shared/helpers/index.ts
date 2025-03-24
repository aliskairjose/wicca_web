import { Injectable } from '@angular/core';
import { environmentDev } from '@envs/env.devs';
import { RateInterface } from '@shared/interfaces';
import { RatesType } from '@shared/types/rates.type';

type ErrorMapCallBackFn = (result: string) => void;

@Injectable()
export class Helper {
  static baseUrl = (slug: string): string => `${environmentDev.baseUrl}/${slug}`;

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

  static calculateRate(rates: RateInterface[]): RatesType {
    const _rates: RatesType = {
      rate: 0,
      votes: 0,
    };

    if (!rates || rates.length === 0) return _rates;

    _rates.votes = rates.reduce((prev, curr) => prev + curr.rate, 0);
    _rates.rate = _rates.votes / rates.length;

    return _rates;
  }
}
