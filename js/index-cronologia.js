async function incrustarCronologiaEnIndex() {
  // Busca el contenedor del index.html donde se cargará la cronología
  const destino = document.getElementById("cronologia-placeholder");
  if (!destino) return; // Si no existe en la página actual, no hace nada

  try {
    // Pide de forma asíncrona el fragmento HTML del componente de cronología
    const respuesta = await fetch("components/cronologia.html");
    if (!respuesta.ok) {
      // Si el servidor responde con error (ej. 404), lo registra y corta la ejecución
      console.error("No se pudo cargar components/cronologia.html:", respuesta.status);
      return;
    }

    // Inserta el HTML descargado dentro del contenedor de destino
    destino.innerHTML = await respuesta.text();

    // Si existe la función cargarCuriosidades, la ejecuta tras inyectar la cronología
    if (typeof cargarCuriosidades === "function") {
      cargarCuriosidades();
    }
  } catch (error) {
    // Captura fallos de red o errores inesperados durante la petición o inserción
    console.error("Error al incrustar cronología en index:", error);
  }
}

// Ejecuta la carga cuando el DOM base del index.html está listo
document.addEventListener("DOMContentLoaded", incrustarCronologiaEnIndex);