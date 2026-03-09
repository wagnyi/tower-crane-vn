export interface Product {
  id: string;
  model: string;
  brand: string;
  capacity: number; // tons
  height: number; // meters
  year: number;
  condition: 'excellent' | 'good' | 'fair';
  price: number;
  currency: 'VND' | 'USD' | 'CNY';
  location: string;
  images: string[];
  specifications: {
    maxRadius: number;
    maxLoad: number;
    tipLoad: number;
    jibLength: number;
    mastHeight: number;
  };
  description: {
    vi: string;
    en: string;
    zh: string;
  };
  features: {
    vi: string[];
    en: string[];
    zh: string[];
  };
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  productId?: string;
}
