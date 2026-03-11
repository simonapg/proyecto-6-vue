export function obtenerIconoClima(estado) {
  const iconos = {
    Despejado: '☀️',
    Nublado: '☁️',
    Lluvioso: '🌧️',
    Niebla: '🌫️',
    Nevado: '❄️',
    Tormenta: '⛈️'
  };

  return iconos[estado] || '🌤️';
}
