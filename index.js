// Cargar y mostrar los yates desde el archivo JSON
fetch('yates.json')
    .then(response => response.json())
    .then(data => {
        const contenedorYates = document.getElementById('lista-yates');

        data.forEach(yate => {
            // Crear el contenedor de cada yate
            const divYate = document.createElement('div');
            divYate.classList.add('contenedor-yate');
            
            // Establecer la imagen de fondo desde el archivo JSON
            divYate.style.backgroundImage = `url(${yate.imagen})`;

            // Título del yate
            const h2Yate = document.createElement('h2');
            h2Yate.textContent = yate.nombre;
            divYate.appendChild(h2Yate);
            
            // Descripción corta del yate
            const pDescripcion = document.createElement('p');
            pDescripcion.classList.add('descripcion-yate');
            pDescripcion.textContent = yate.descripcionCorta;
            divYate.appendChild(pDescripcion);
            
            // Enlace "Descubre más"
            const enlaceYate = document.createElement('a');
            enlaceYate.classList.add('descubre-mas');
            enlaceYate.textContent = 'Descubre más >';
            enlaceYate.href = `yate.html?yate=${encodeURIComponent(yate.nombre)}`; // Pasar el nombre del yate por la URL
            divYate.appendChild(enlaceYate);

            // Agregar el contenedor del yate al contenedor principal
            contenedorYates.appendChild(divYate);
        });
    })
    .catch(error => {
        console.error('Error al cargar los yates:', error);
    });

// Función para gestionar el carrito
function agregarAlCarrito(yateNombre) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(yateNombre);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`${yateNombre} añadido al carrito`);
}

// Función para filtrar yates
function filtrarYates() {
    const input = document.getElementById('buscador').value.toLowerCase();
    const contenedorYates = document.getElementById('lista-yates');
    const yates = contenedorYates.getElementsByClassName('contenedor-yate');

    Array.from(yates).forEach(yate => {
        const titulo = yate.querySelector('h2').textContent.toLowerCase();
        if (titulo.includes(input)) {
            yate.style.display = '';
        } else {
            yate.style.display = 'none';
        }
    });
}
