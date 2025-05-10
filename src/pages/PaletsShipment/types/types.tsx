export type pallet ={
  IdPalletDistribucion: number;
  IdPallet: number;
  Identificador: string;
  NumeroPallet: string;
  Cajas: number;
  Kilogramos: number;
  Temperatura: number;
  Termografo: string;
  FechaOriginal: string;
  FechaPropuesta: string;
}

export type Producto = {
  IdPallet: number;
  IdPedido: number;
  IdNoPallet: number;
  IdLote: number;
  Cajas: number;
  Producto: string;
  IdProducto: number;
  Codigo: string;
  Calibre: string;
  IdPalletDistribucion: number[];
  Identificador: string;
  Expr1: number;
  IdDetallePallet: number;
};

export type Dato = {
  IdPalletDistribucion: number;
  IdPallet: number;
  Identificador: string;
  NumeroPallet: number;
  Cajas: number;
  Kilogramos: number;
  Temperatura: number;
  Termografo: number;
  FechaOriginal: string;
  FechaPropuesta: string;
  products: Producto[];
};

export type Pedido = {
  Pallets: number;
  Calibre: string;
  Cajas: number;
  kilogramos: number;
};

export type Conteo = {
  IdPallet: number;
  Pallets: number;
  Cajas: number;
  Kilogramos: number;
};

export type PaletsShipmentResponse = {
  datos: Dato[];
  pedido: Pedido[];
  conteo: Conteo[];
};
export type PalletProps = {
  pallet: string;
  Cant: number;
  Kilogramos: number;
  Farenheit: number;
  Id: number;
};

export type PaletsShipmentResponses = {
  conteo: {
    Pallets: number;
    Cajas: number;
    Kilogramos: number;
  }[];
  datos: any[];
  pedido: any[];
};

