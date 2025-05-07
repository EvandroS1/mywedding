import { CartItemProps } from "@/components/ModalAnimado";

export default interface IUsers {
  id?: string;
  nome?: string | null;
  email?: string | null;
  ProfilePic?: string | null;
  typeAuth?: string | null;
  carrinho: CartItemProps[];
  favoritos?: [];
  createdAt?: string;
}