import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from '@envs/environment';
import { Helper } from '@shared/helpers';
import { firstValueFrom } from 'rxjs';
import { WidgetCheckoutPayloadInterface } from './interfaces/widget-checkout.interface';
declare var WidgetCheckout: any;


@Component({
  selector: 'app-wompi',
  standalone: true,
  imports: [],
  templateUrl: './wompi.component.html',
  styleUrl: './wompi.component.scss'
})
export class WompiComponent implements OnInit {

  #publicKey = environment.wompiPublicKey;
  #integrationKey = environment.wompiIntegrityKey;

  #route = inject(ActivatedRoute);

  ngOnInit() {
    const payload: string = this.#route.snapshot.paramMap.get('id')!;
    this._openWompi(payload);
  }

  private async _openWompi(_payload: string) {
    const payload: WidgetCheckoutPayloadInterface = JSON.parse(atob(_payload));

    const integrity = await Helper.generateIntegrityFirm(_payload, this.#integrationKey);

    const {
      amountInCents,
      customerData: { email, fullName, phoneNumberPrefix, phoneNumber },
      reference
    } = payload;

    const checkout = new WidgetCheckout({
      currency: "COP",
      amountInCents,
      reference,
      publicKey: this.#publicKey,
      signature: { integrity },
      customerData: {
        email,
        fullName,
        phoneNumberPrefix,
        phoneNumber,
      },
      redirectUrl: "https://orbeapp.net",
    });


    checkout.open(function (result: any) {
      var transaction = result.transaction;
      console.log("Transaction object: ", transaction);
      if (result.transaction.status === 'APPROVED') {
        console.log('Pago aprobado');
      }
    });
  }
}
