export interface ProductInterface {
  _id?: string;
  title: string;
  description: string;
  price: number;
  category: string;
  quantity:number;
  image: string;
}

export interface Category {
  category: string;
}
