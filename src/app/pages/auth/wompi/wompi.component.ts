import { Component, OnInit } from '@angular/core';
import { environment } from '@envs/environment';
declare var WidgetCheckout: any;


@Component({
  selector: 'app-wompi',
  standalone: true,
  imports: [],
  templateUrl: './wompi.component.html',
  styleUrl: './wompi.component.scss'
})
export class WompiComponent implements OnInit {

  publicKey = environment.wompiPublicKey;

  ngOnInit() {
    this.openWompi();
  }

  openWompi() {
    console.log('Opening Wompi checkout...');
    const checkout = new WidgetCheckout({
      currency: "COP",
      amountInCents: 2490000,
      reference: "3b4393bafed398ba4",
      publicKey: "pub_test_W2AG0iuu4cMtL2w64njejkl5lLj4aVxL",
      signature: {
        integrity:
          "737875286dfe2e5655c840464f0988db9004ab1bf5f22e4e83479dc61e10aab1",
      },
      customerData: {
        email: 'user1@test.com',
        fullName: 'Juan Perez',
        phoneNumberPrefix: '+58',
        phoneNumber: '4122419616',
      },
      defaultLanguage: 'en',
      redirectUrl: "https://orbeapp.net",
    });

    checkout.open(function (result: any) {
      if (result.status === 'APPROVED') {
        console.log('Pago aprobado');
      }
    });
  }
}
