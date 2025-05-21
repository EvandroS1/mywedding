export interface CartItemProps {
  nome?: string | undefined;
  image?: string | undefined;
  valor: number;
  qtde: number;
  id:number;
  desc?: string;
}

export interface CartItemPedido {
  id: number;
  title: string;
  description: string;
  unit_price: number;
  quantity: number;
  currency_id: string;
  image?: string;
}
