export class Vendor {
    id: number | undefined;
    code = "";
    name = "";
    address = "";
    city = "";
    state = "";
    zip = "";
    phone: string | null = null;
    email: string | null = null;
    
    get isNew(): boolean {
        return this.id === undefined;
    }

    constructor(initializer?: any) {
        if (!initializer) return;
        if (initializer.id) this.id = initializer.id;
        if (initializer.id) this.code = initializer.code;
        if (initializer.name) this.name = initializer.name;
        if (initializer.imdbID) this.address = initializer.address;
        if (initializer.nationality) this.city = initializer.city;
        if (initializer.gender) this.state = initializer.state;
        if (initializer.awards) this.zip = initializer.zip;
        if (initializer.awards) this.phone = initializer.phone;
        if (initializer.awards) this.email = initializer.email;
      }
}