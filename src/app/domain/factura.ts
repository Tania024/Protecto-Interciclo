export class Factura {
    id: string = '';
    clienteUid: string = '';
    librosComprados: { titulo: string, cantidad: number, precioUnitario: number }[] = [];
    fechaCompra: Date = new Date();
    total: number = 0;
}
