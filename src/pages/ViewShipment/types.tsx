export type OrderProps = {
  IdPallet: number;
  Ejercicio: number;
  IdMes: number;
  Dia: number;
  IdPedido: number;
  Observaciones: string;
  Folio: string;
  Nombre: string;
  Partner: string;
  TipoPedido: string;
};

export type detailRequest = {
  IdPedidoDetalle: number,
  IdPedido: number,
  Pallets: number,
  IdProducto: number,
  Cajas: number,
  Kilogramos: number,
  Producto: string,
  Presentacion: string
};
