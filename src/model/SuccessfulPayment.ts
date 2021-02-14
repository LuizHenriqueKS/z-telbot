import {
  OrderInfo
} from '../index';

class SuccessfulPayment {
  currency!: string;
  totalAmount!: number;
  invoicePayload!: string;
  shippingOptionId?: string;
  orderInfo?: OrderInfo;
  telegramPaymentChargeId!: string;
  providerPaymentChargeId!: string;
}

export default SuccessfulPayment;
