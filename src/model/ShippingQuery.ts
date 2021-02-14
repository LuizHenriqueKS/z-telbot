import {
  User,
  ShippingAddress
} from '../index';

class ShippingQuery {
  id!: string;
  from!: User;
  invoicePayload!: string;
  shippingAddress!: ShippingAddress;
}

export default ShippingQuery;
