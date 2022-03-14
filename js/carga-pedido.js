const costoKg = 5;
let costoEnvio;

const btnNuevoPedido = document.querySelector("#nuevo-pedido");

btnNuevoPedido.addEventListener("click", () => {
  /*solicito al usuario cuantos bultos desea despachar. valido que sea un número mayor a 0.*/

  let cantBultos = parseInt(prompt("Ingrese la cantidad de bultos que desea despachar:"));

  while (cantBultos <= 0 || isNaN(cantBultos)) {
    alert("Ingrese un número mayor a 0");
    cantBultos = parseInt(prompt("Ingrese el número de bultos que desea despachar"));
  }

  // imprimo en pantalla la cantidad de bultos cargados
  console.log("Cantidad de bultos a despachar: " + cantBultos);

  //solicito id del pedido
  let idPedido = prompt("Ingrese el ID con el que desea identificar su pedido:");

  //imprimo en consola el ID
  console.log(idPedido);

  //creación objeto "pedido"
  class Pedido {
    constructor(cantBultos, idPedido) {
      this.idPedido = idPedido;
      this.cantBultos = cantBultos;
      this.listaBultos = [];
      this.pesoReal = 0;
      this.pesoVolumetrico = 0;
      this.volumenTotal = 0;
      this.costoEnvio = 0;
    }

    calculoPesoVolumetrico(volumen) {
      return (volumen * 1000000) / 5000;
    }
  }

  class Bulto {
    constructor(idBulto) {
      this.idBulto = idBulto;
      this.pesoRealBulto = 0;
      this.largoBulto = 0;
      this.anchoBulto = 0;
      this.altoBulto = 0;
      this.volumenBulto = this.largoBulto * this.anchoBulto * this.altoBulto;
    }

    agregarAListaBultos(bulto) {
      pedido.listaBultos.push(bulto);
    }

    calcularVolumen(largo, ancho, alto) {
      return largo * ancho * alto;
    }
  }

  //calculo volumen del bulto cargado y lo sumo al volumen total del pedido
  function pasarCm3AM3(volumen) {
    return volumen / 1000000;
  }

  let pedido = new Pedido(cantBultos, idPedido);

  for (let i = 0; i < cantBultos; i++) {
    let bulto = new Bulto(i + 1);

    bulto.agregarAListaBultos(bulto);

    //carga de peso real del bulto
    bulto.pesoRealBulto = parseFloat(prompt("Ingrese el peso real del bulto nro." + (i + 1) + " en kg."));

    while (bulto.pesoRealBulto <= 0 || isNaN(bulto.pesoRealBulto)) {
      alert("Ingrese un número mayor a 0");
      bulto.pesoRealBulto = parseFloat(prompt("Ingrese el peso real del bulto nro." + (i + 1) + " en kg."));
    }

    console.log("Peso real del bulto " + (i + 1) + ": " + bulto.pesoRealBulto + " kg.");

    //   ingreso medidas del bulto y las sumo al pedido total
    bulto.largoBulto = parseFloat(prompt("Ingreso el largo del bulto nro." + (i + 1) + " en cm."));

    while (bulto.largoBulto <= 0 || isNaN(bulto.largoBulto)) {
      alert("Ingrese un número mayor a 0");
      bulto.largoBulto = parseFloat(prompt("Ingreso el largo del bulto nro." + (i + 1) + " en cm."));
    }

    console.log("Largo del bulto nro " + (i + 1) + ": " + bulto.largoBulto + " cm");

    bulto.anchoBulto = parseFloat(prompt("Ingreso el ancho del bulto nro." + (i + 1) + " en cm."));

    while (this.anchoBulto <= 0 || isNaN(bulto.anchoBulto)) {
      alert("Ingrese un número mayor a 0");
      bulto.anchoBulto = parseFloat(prompt("Ingreso el ancho del bulto nro." + (i + 1) + " en cm."));
    }

    console.log("Ancho del bulto nro " + (i + 1) + ": " + bulto.anchoBulto + " cm");

    bulto.altoBulto = parseFloat(prompt("Ingreso el alto del bulto nro." + (i + 1) + " en cm."));

    while (bulto.altoBulto <= 0 || isNaN(bulto.altoBulto)) {
      alert("Ingrese un número mayor a 0");
      bulto.altoBulto = parseFloat(prompt("Ingreso el alto del bulto nro." + (i + 1) + " en cm."));
    }

    console.log("Alto del bulto nro " + (i + 1) + ": " + bulto.altoBulto + " cm");

    //sumo medidas del bulto al pedido total
    bulto.volumenBulto = bulto.calcularVolumen(bulto.largoBulto, bulto.anchoBulto, bulto.altoBulto);

    pedido.volumenTotal += bulto.volumenBulto;

    pedido.pesoReal += bulto.pesoRealBulto;
  }

  pedido.volumenTotal = pasarCm3AM3(pedido.volumenTotal);

  pedido.pesoVolumetrico = pedido.calculoPesoVolumetrico(pedido.volumenTotal);

  console.log("Peso volumétrico: " + pedido.pesoVolumetrico + " kg.");

  //calculo de volumen para cotizar y costo de envios

  if (pedido.pesoReal >= pedido.pesoVolumetrico) {
    pedido.costoEnvio = pedido.pesoReal * costoKg;
  } else {
    pedido.costoEnvio = pedido.pesoVolumetrico * costoKg;
  }

  console.log("Costo del envio: $" + pedido.costoEnvio);

  // imprimo en pantalla resumen del pedido y el costo

  const tituloResumen = document.createElement("h2");

  const seccionResumen = document.querySelector(".carga-pedidos");

  tituloResumen.textContent = `Resumen pedido ID:${pedido.idPedido}`;

  seccionResumen.appendChild(tituloResumen);

  for (bulto of pedido.listaBultos) {
    let nroBulto = pedido.listaBultos.indexOf(bulto) + 1;

    const resumenBulto = document.createElement("h3");

    resumenBulto.textContent = `Detalle de bulto nro.${nroBulto}:`;

    seccionResumen.appendChild(resumenBulto);

    const ulBultos = document.createElement("ul");
    seccionResumen.appendChild(ulBultos);

    let detalleBultoKg = document.createElement("li");
    detalleBultoKg.textContent = `Peso real: ${bulto.pesoRealBulto}kg.`;
    ulBultos.appendChild(detalleBultoKg);

    let detalleBultolargo = document.createElement("li");
    detalleBultolargo.textContent = `Largo: ${bulto.largoBulto} cm.`;
    ulBultos.appendChild(detalleBultolargo);

    let detalleBultoAncho = document.createElement("li");
    detalleBultoAncho.textContent = `Ancho: ${bulto.anchoBulto} cm.`;
    ulBultos.appendChild(detalleBultoAncho);

    let detalleBultoAlto = document.createElement("li");
    detalleBultoAlto.textContent = `Alto: ${bulto.altoBulto} cm.`;
    ulBultos.appendChild(detalleBultoAlto);

    let detalleBultoVolumen = document.createElement("li");
    detalleBultoVolumen.textContent = `Volumen: ${bulto.volumenBulto / 1000000} m3.`;
    ulBultos.appendChild(detalleBultoVolumen);
  }

  let detallePedido = document.createElement("h3");

  detallePedido.textContent = "Detalle consolidado de pedido:";

  seccionResumen.appendChild(detallePedido);

  const ulPedido = document.createElement("ul");
  seccionResumen.appendChild(ulPedido);

  let detallePedidoKg = document.createElement("li");
  detallePedidoKg.textContent = `Peso real: ${pedido.pesoReal} kg.`;
  ulPedido.appendChild(detallePedidoKg);

  let detallePedidoPesoVolumetrico = document.createElement("li");
  detallePedidoPesoVolumetrico.textContent = `Peso volumétrico: ${pedido.pesoVolumetrico} kg.`;
  ulPedido.appendChild(detallePedidoPesoVolumetrico);

  let detallePedidoVolumen = document.createElement("li");
  detallePedidoVolumen.textContent = `Volumen: ${pedido.volumenTotal} m3.`;
  ulPedido.appendChild(detallePedidoVolumen);

  let detalleCostoEnvio = document.createElement("li");
  detalleCostoEnvio.textContent = `Costo de envío: $${pedido.costoEnvio}`;
  ulPedido.appendChild(detalleCostoEnvio);
});
