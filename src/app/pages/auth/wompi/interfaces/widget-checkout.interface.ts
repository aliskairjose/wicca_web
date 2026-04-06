export interface WidgetCheckoutPayloadInterface {
  currency: string;
  amountInCents: number;
  reference: string;
  publicKey: string;
  signature: {
    integrity: string
  };
  customerData: {
    email: string;
    fullName: string;
    phoneNumberPrefix: string;
    phoneNumber: string;
  };
}
