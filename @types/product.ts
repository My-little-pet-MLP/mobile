export interface Product {
    id: string;
    title: string;
    slug: string;
    imageUrl: string;
    description: string;
    priceInCents: number;
    stock: number;
    categoryId: string;
    storeId: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }