function iniciarTarjetasCuriosidades() {
  // Selecciona todas las portadas clicables, las tarjetas desplegables y los botones de cerrar (X)
  const portadas = document.querySelectorAll(".portada-card");
  const detalles = document.querySelectorAll(".detalle-juego");
  const botonesCerrar = document.querySelectorAll(".cerrar-detalle");

  // Cierra todas las tarjetas abiertas y quita el estado activo de todas las portadas
  function cerrarTodo() {
    detalles.forEach((d) => d.classList.remove("is-open"));
    portadas.forEach((p) => p.classList.remove("is-selected"));
  }

  // Asigna el comportamiento de abrir/cerrar a cada portada al hacer clic
  portadas.forEach((portada) => {
    portada.addEventListener("click", () => {
      // Obtiene el ID de la tarjeta asociada desde el atributo data-target="... "
      const targetId = portada.dataset.target;
      const tarjeta = document.getElementById(targetId);
      if (!tarjeta) return; // Si no existe la tarjeta, sale sin error

      // Comprueba si la tarjeta pulsada ya estaba abierta
      const yaAbierta = tarjeta.classList.contains("is-open");

      // Cierra cualquier tarjeta abierta antes de decidir si abrir esta
      cerrarTodo();

      // Si no estaba abierta, la marca como seleccionada y despliega su tarjeta
      if (!yaAbierta) {
        portada.classList.add("is-selected");
        tarjeta.classList.add("is-open");
      }
    });
  });

  // Permite cerrar las tarjetas al pulsar cualquiera de los botones de cerrar
  botonesCerrar.forEach((btn) => {
    btn.addEventListener("click", cerrarTodo);
  });
}

async function cargarCuriosidades() {
  // Busca el contenedor vacío donde se inyectará el HTML del componente
  const contenedor = document.getElementById("curiosidades-placeholder");
  if (!contenedor) return;

  try {
    // Solicita el archivo HTML de curiosidades de forma asíncrona
    const respuesta = await fetch("/components/curiosidades.html");
    if (!respuesta.ok) {
      console.error("No se pudo cargar /components/curiosidades.html:", respuesta.status);
      return;
    }

    // Inserta el HTML recibido dentro del contenedor
    contenedor.innerHTML = await respuesta.text();

    // Activa los eventos de las portadas y tarjetas una vez que ya existen en el DOM
    iniciarTarjetasCuriosidades();
  } catch (error) {
    // Captura fallos de red o problemas inesperados durante la carga
    console.error("Error cargando curiosidades:", error);
  }
}

// Espera a que el HTML base esté cargado para inyectar el componente de curiosidades
document.addEventListener("DOMContentLoaded", cargarCuriosidades);