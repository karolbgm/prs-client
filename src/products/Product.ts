import { Vendor } from "../vendors/Vendor";

export class Product {
    id: number | undefined;
    partNbr = "";
    name = "";
    price: number | undefined;
    unit = "";
    photoPath: string | null = null;
    vendorId: number = 0;
    vendor: Vendor | undefined;
    
    get isNew(): boolean {
        return this.id === undefined;
    }

    constructor(initializer?: any) {
        if (!initializer) return;
        if (initializer.id) this.id = initializer.id;
        if (initializer.partNbr) this.partNbr = initializer.partNbr;
        if (initializer.price) this.price = initializer.price;
        if (initializer.unit) this.unit = initializer.unit;
        if (initializer.photoPath) this.photoPath = initializer.photoPath;
        if (initializer.vendorId) this.vendorId = initializer.vendorId;
        if (initializer.vendor) this.vendor = initializer.vendor;
      }
}