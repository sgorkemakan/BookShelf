import { Book } from "./Book";

export interface InitialState {
  cartItems: Book[];
  quantity: number;
  total: number;
}
