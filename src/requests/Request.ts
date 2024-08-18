export class Request {
    id: number | undefined;
    requestname = "";
    password = "";
    firstname = "";
    lastname = "";
    phone: string | null = null;
    email: string | null = null;
    isReviewer = false;
    isAdmin = false;
    
    get isNew(): boolean {
        return this.id === undefined;
    }

    constructor(initializer?: any) {
        if (!initializer) return;
        if (initializer.id) this.id = initializer.id;
        if (initializer.requestname) this.requestname = initializer.requestname;
        if (initializer.password) this.password = initializer.password;
        if (initializer.firstname) this.firstname = initializer.firstname;
        if (initializer.lastname) this.lastname = initializer.lastname;
        if (initializer.phone) this.phone = initializer.phone;
        if (initializer.email) this.email = initializer.email;
        if (initializer.isReviewer) this.isReviewer = initializer.isReviewer;
        if (initializer.isAdmin) this.isAdmin = initializer.isAdmin;
      }
}