

export  interface AgriculturalBoxPartner {
  IdPartnerIfcoNo: number;
  Partner: string;
}

export interface OpenOrder {
  IdPedido: number;
  Folio: string;
  Nombre: string;
  Fecha: string;
  Bloqueo: boolean;
  Observaciones: string;
}
