function convertir() {
  const valor = parseFloat(document.getElementById("valor").value);
  const de = document.getElementById("de").value;
  const a = document.getElementById("a").value;

  if (isNaN(valor)) {
    alert("Por favor ingrese un valor numérico válido");
    return;
  }

  let resultado = convertirTemperatura(valor, de, a);

  document.getElementById("resultado").textContent =
    `Resultado: ${resultado.toFixed(2)} °${a}`;

  guardarEnHistorial(valor, de, a, resultado);
  mostrarHistorial();
}

function convertirTemperatura(valor, de, a) {
  if (de === a) return valor;

  switch (de + "→" + a) {
    case "C→K": return valor + 273.15;
    case "C→F": return valor * 9/5 + 32;
    case "K→C": return valor - 273.15;
    case "K→F": return (valor - 273.15) * 9/5 + 32;
    case "F→C": return (valor - 32) * 5/9;
    case "F→K": return (valor - 32) * 5/9 + 273.15;
    default: return valor;
  }
}

function guardarEnHistorial(valor, de, a, resultado) {
  let historial = JSON.parse(localStorage.getItem("historial")) || [];
  historial.push({ valor, de, a, resultado });
  localStorage.setItem("historial", JSON.stringify(historial));
}

function mostrarHistorial() {
  const historial = JSON.parse(localStorage.getItem("historial")) || [];
  const tabla = document.getElementById("tabla-historial");
  tabla.innerHTML = "";

  historial.forEach((item) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${item.valor} °${item.de}</td>
      <td>${item.de}</td>
      <td>${item.a}</td>
      <td>${item.resultado.toFixed(2)} °${item.a}</td>
    `;
    tabla.appendChild(fila);
  });
}

function limpiarHistorial() {
  if (confirm("¿Estás seguro de que deseas borrar el historial?")) {
    localStorage.removeItem("historial");
    mostrarHistorial();
    document.getElementById("resultado").textContent = "";
  }
}

window.onload = mostrarHistorial;