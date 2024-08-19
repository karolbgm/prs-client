import { Product } from "../products/Product";

export class Requestline {
  id: number | undefined;
  quantity: number | undefined;
  requestId: number | undefined;
  productId: number | undefined;
  product: Product | undefined;

  get isNew(): boolean {
    return this.id === undefined;
  }

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.quantity) this.quantity = initializer.quantity;
    if (initializer.requestId) this.requestId = initializer.requestId;
    if (initializer.productId) this.productId = initializer.productId;
    if (initializer.product) this.product = initializer.product;
  }
}
