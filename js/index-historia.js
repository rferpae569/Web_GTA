async function incrustarHistoriaEnIndex() {
  // Busca el contenedor donde se inyectará el bloque de historia en index.html
  const destino = document.getElementById("historia-placeholder");
  if (!destino) return; // Sale si no existe el contenedor en el documento actual

  try {
    // Solicita el archivo HTML del componente de historia de forma asíncrona
    const respuesta = await fetch("components/historia.html");
    if (!respuesta.ok) {
      // Registra en consola si falla la petición HTTP (por ejemplo, archivo no encontrado)
      console.error("No se pudo cargar components/historia.html:", respuesta.status);
      return;
    }

    // Inserta el contenido HTML recibido dentro del contenedor de destino
    destino.innerHTML = await respuesta.text();
  } catch (error) {
    // Captura errores de red o problemas inesperados al cargar o insertar el HTML
    console.error("Error al incrustar historia en index:", error);
  }
}

// Ejecuta la función cuando el DOM inicial de la página ha terminado de cargarse
document.addEventListener("DOMContentLoaded", incrustarHistoriaEnIndex);