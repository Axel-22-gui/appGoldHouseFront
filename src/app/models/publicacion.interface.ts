import { DetallesCasa } from './detallesCasa.interface';

export interface Publicacion {
  publiid?: number;
  publiUsuid?: number;
  publiDescripcion?: string;
  publilocalizacion?: string;
  publilongitud?: number;
  publilatitud?: number;
  publiprecio?: number;
  publitipo?: string;
  publiarea?: number;
  publiStatus?: number;
  publitituloanuncio?: string;
  publifavoritos?: boolean;
  detallesCasa?: DetallesCasa[];
  imagenes?: ArchivoRequest[];
  documentos?: ArchivoRequest[];
  fechapostVenta?: Date;
  publiMaximoPrecio?: number;
  publiMinimoPrecio?: number;
  publiMaximaArea?: number;
  publiMinimaArea?: number;
  publicantBanios?: number;
  publicantCuarto?: number;
  publipiscina?: number;
  publipet?: number;
  publifechaentera?: number;
  publicochera?: number;
  publiProvincia?: string;
}
export interface VistaSeg {
  misPublis: Publicacion[];
  misPubliscompras: Compras[];
  misPublisculminadas: Compras[];
  misPublisenproceso: Compras[];
}
export interface ArchivoRequest {
  nombre?: string;
  extension?: string;
  imagensrc?: string;
}
export interface Compras {
  publiid?: number;
  publilocalizacion?: string;
  publiprecio?: number;
  publiarea?: number;
  publitituloanuncio?: string;
  imagenes?: ArchivoRequest;
  publiidusu?: number;
  ofertasusu?: number;
}
