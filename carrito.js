document.addEventListener('DOMContentLoaded', () => {
    const yatesCarrito = document.getElementById('yates-carrito');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    const informacionPago = document.getElementById('informacion-pago');
    const precioTotalElem = document.getElementById('precio-total');
    const primerPagoElem = document.getElementById('primer-pago');
    const cuotasMensualesElem = document.getElementById('cuotas-mensuales');

    const primerPagoPorcentaje = 0.20; // 20% del total
    const cuotasMensuales = 32; // Valor predeterminado, se puede ajustar si es necesario

    function calcularPagos(total) {
        const primerPago = total * primerPagoPorcentaje;
        const montoCuota = (total - primerPago) / cuotasMensuales;
        return {
            primerPago: primerPago.toFixed(0),
            montoCuota: montoCuota.toFixed(0)
        };
    }

    function cargarCarrito() {
        yatesCarrito.innerHTML = ''; // Limpiar el contenido actual
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        
        if (carrito.length === 0) {
            yatesCarrito.innerHTML = '<p>No hay yates en el carrito.</p>';
            informacionPago.style.display = 'none'; // Ocultar sección de información de pago
        } else {
            let total = 0;
            let primerPagoTotal = 0;
            let mesesPago = 0;

            Promise.all(carrito.map(yateNombre => {
                return fetch('yates.json')
                    .then(response => response.json())
                    .then(data => {
                        const yate = data.find(y => y.nombre === yateNombre);
                        if (yate) {
                            const divYate = document.createElement('div');
                            divYate.classList.add('contenedor-yate-carrito');
                            divYate.innerHTML = `
                                <img src="${yate.imagen}" alt="${yate.nombre}" class="imagen-yate-carrito">
                                <h2 class="tamaño">${yate.nombre}</h2>
                                <p class="bold">$${yate.precio} Millones COP</p>
                            `;
                            yatesCarrito.appendChild(divYate);
                            primerPagoTotal += yate.reserva; // Acumulamos el primer pago
                            total += primerPagoTotal;
                            mesesPago = yate.mesesPago; // Usar el número de meses del último yate, o ajustar si necesario
                        }
                    })
                    .catch(error => console.error('Error al cargar el yate:', error));
            })).then(() => {
                // Actualizamos la UI después de que todas las promesas se hayan resuelto
                const { primerPago, montoCuota } = calcularPagos(total);
                primerPagoElem.textContent = `$${primerPagoTotal.toFixed(0)} Millones COP`;
                cuotasMensualesElem.textContent = `$${montoCuota} Millones COP`;
                precioTotalElem.textContent = `$${total.toFixed(0)} Millones COP`;

                informacionPago.style.display = 'flex'; // Mostrar sección de información de pago
            });
        }
    }

    function vaciarCarrito() {
        localStorage.removeItem('carrito');
        cargarCarrito();
    }

    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    cargarCarrito();
});