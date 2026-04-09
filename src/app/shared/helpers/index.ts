import { Injectable } from '@angular/core';
import { WidgetCheckoutPayloadInterface } from 'src/app/pages/auth/wompi/interfaces/widget-checkout.interface';

type ErrorMapCallBackFn = (result: string) => void;

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

  static generatePassword(length: number = 12): string {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()-_=+[]{}|;:,.<>?";

    let availableChars = lowercaseChars; // Start with lowercase by default

    availableChars += uppercaseChars;
    availableChars += numberChars;
    availableChars += symbolChars;

    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * availableChars.length);
      password += availableChars[randomIndex];
    }

    return password;
  }

  static async generateIntegrityFirm(_payload: string, integrationKey: string): Promise<string> {
    const payload: WidgetCheckoutPayloadInterface = JSON.parse(atob(_payload));

    const currency = "COP";

    const { reference, amountInCents } = payload;

    const encode = `${reference}${amountInCents}${currency}${integrationKey}`;

    const ckecsum = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(encode));

    const hashArray = Array.from(new Uint8Array(ckecsum));

    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return hashHex;

  }

}
