// Obtener el nombre del yate desde la URL
const params = new URLSearchParams(window.location.search);
const yateSeleccionado = params.get('yate'); // Ejemplo: M48

// Cargar la información del yate desde el archivo yates.json
fetch('yates.json')
    .then(response => response.json())
    .then(data => {
        const yate = data.find(y => y.nombre === yateSeleccionado);

        if (yate) {
            // Actualizar la información de la página
            document.getElementById('nombre-yate').textContent = yate.nombre;
            document.getElementById('descripcion-yate').textContent = yate.descripcionCompleta;
            document.getElementById('video-yate').src = yate.videoSrc;

            // Formatear los precios y reservas con los símbolos y texto necesarios
            document.getElementById('precio-yate').textContent = `$${yate.precio.toLocaleString()} Millones (COP)`;
            document.getElementById('reserva-info').textContent = `Resérvalo con: $${yate.reserva.toLocaleString()} Millones (COP)`;
            document.getElementById('pago-info').textContent = `Y paga el resto durante los próximos ${yate.mesesPago} meses`;

            // Añadir las especificaciones
            const contenedorEspecificaciones = document.getElementById('contenedor-especificaciones');
            yate.especificaciones.forEach(especificacion => {
                const divEspecificacion = document.createElement('div');
                divEspecificacion.classList.add('especificacion');

                const imgEspecificacion = document.createElement('img');
                imgEspecificacion.src = especificacion.icono;
                imgEspecificacion.alt = especificacion.titulo;
                imgEspecificacion.classList.add('imagen-especificaciones');

                const pEspecificacion = document.createElement('p');
                pEspecificacion.textContent = especificacion.titulo;

                const bEspecificacion = document.createElement('b');
                bEspecificacion.textContent = especificacion.valor;

                divEspecificacion.appendChild(imgEspecificacion);
                divEspecificacion.appendChild(pEspecificacion);
                divEspecificacion.appendChild(bEspecificacion);

                contenedorEspecificaciones.appendChild(divEspecificacion);
            });

            // Funcionalidad del botón de reservar
            document.getElementById('reservar-btn').addEventListener('click', () => {
                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                carrito.push(yate.nombre);
                localStorage.setItem('carrito', JSON.stringify(carrito));
                alert(`${yate.nombre} añadido al carrito`);
            });
        } else {
            alert('Yate no encontrado');
        }
    })
    .catch(error => console.error('Error al cargar el yate:', error));
