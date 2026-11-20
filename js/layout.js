async function cargarComponente(selector, archivo) {
  // Busca en el DOM el primer elemento que coincida con el selector (por ejemplo, un id o clase)
  const contenedor = document.querySelector(selector);
  if (!contenedor) return; // Si no existe ese contenedor en la página, termina sin hacer nada

  // Solicita de forma asíncrona el archivo HTML del componente
  const respuesta = await fetch(archivo);

  if (respuesta.ok) {
    // Si la petición fue correcta (código HTTP 200-299), inyecta el HTML dentro del contenedor
    contenedor.innerHTML = await respuesta.text();
  } else {
    // Si hubo un error HTTP (como 404), muestra un mensaje de error en la consola con el estado
    console.error("No se pudo cargar:", archivo, respuesta.status);
  }
}

// Carga e inyecta el componente de cabecera en su contenedor correspondiente
cargarComponente("#header-placeholder", "/components/header.html");

// Carga e inyecta el componente de pie de página en su contenedor correspondiente
cargarComponente("#footer-placeholder", "/components/footer.html");