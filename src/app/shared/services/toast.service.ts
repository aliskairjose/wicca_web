import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';
import { ToastTypeEnum } from '@shared/enums';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  /**
   *
   *
   * @param {string} message
   * @param {ToastTypeEnum} [type=ToastTypeEnum.Success]
   * @memberof ToastService
   */
  show(message: string, type: ToastTypeEnum = ToastTypeEnum.Success): void {
    const notyf = new Notyf({
      duration: 3000,
      ripple: true,
      dismissible: true,
      position: {
        x: 'right',
        y: 'top',
      },
    });
    notyf.open({
      type,
      message,
    });
  }
}
