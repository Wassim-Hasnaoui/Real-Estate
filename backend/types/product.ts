// types/product.ts
export interface Product {
    productName: string;
    description: string;
    category: string;
    price: number;
    status: string;
    current_status: string;
    countryID: number;
    userID: number;
    imageURLs?: string[]; // Optional if used in some cases
  }
  