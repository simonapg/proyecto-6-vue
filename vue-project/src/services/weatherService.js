import { lugaresBase } from '../data/locations';

const OPEN_METEO_URL = 'https://api.open-meteo.com/v1/forecast';
const CACHE_MS = 10 * 60 * 1000;

let cacheLugares = [];
let cacheTimestamp = 0;

function redondear(valor, decimales = 1) {
  const factor = 10 ** decimales;
  return Math.round(valor * factor) / factor;
}

function mapearCodigoWmoAEstado(codigoWmo = 0) {
  if (codigoWmo === 0 || codigoWmo === 1) return 'Despejado';
  if (codigoWmo === 2 || codigoWmo === 3 || codigoWmo === 45 || codigoWmo === 48) return 'Nublado';
  if ((codigoWmo >= 51 && codigoWmo <= 67) || (codigoWmo >= 80 && codigoWmo <= 82)) return 'Lluvioso';
  if ((codigoWmo >= 71 && codigoWmo <= 77) || (codigoWmo >= 85 && codigoWmo <= 86)) return 'Nevado';
  if (codigoWmo >= 95) return 'Tormenta';
  return 'Nublado';
}

function formatearDiaDesdeFecha(fechaIso) {
  const dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  const fecha = new Date(`${fechaIso}T00:00:00`);
  if (Number.isNaN(fecha.getTime())) return fechaIso;
  return dias[fecha.getDay()] || fechaIso;
}

function construirParametros(dias = 7) {
  const params = new URLSearchParams({
    current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    forecast_days: String(dias),
    timezone: 'auto'
  });

  return params;
}

async function consultarOpenMeteo(params) {
  const url = `${OPEN_METEO_URL}?${params.toString()}`;
  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    throw new Error(`Open-Meteo respondio con estado ${respuesta.status}`);
  }

  const data = await respuesta.json();
  if (data.error) {
    throw new Error(data.reason || 'Error desconocido al consultar Open-Meteo');
  }

  return data;
}

function mapearPronosticoSemanal(daily = {}) {
  const fechas = daily.time || [];
  const minimas = daily.temperature_2m_min || [];
  const maximas = daily.temperature_2m_max || [];
  const codigos = daily.weather_code || [];

  const totalDias = Math.min(fechas.length, minimas.length, maximas.length, codigos.length);
  const pronostico = [];

  for (let i = 0; i < totalDias; i += 1) {
    pronostico.push({
      dia: formatearDiaDesdeFecha(fechas[i]),
      fechaIso: fechas[i],
      min: redondear(minimas[i], 1),
      max: redondear(maximas[i], 1),
      estado: mapearCodigoWmoAEstado(codigos[i])
    });
  }

  return pronostico;
}

function mapearLugarConApi(lugarBase, respuestaApi) {
  const current = respuestaApi.current || {};
  const daily = respuestaApi.daily || {};

  if (
    current.temperature_2m === undefined ||
    current.relative_humidity_2m === undefined ||
    current.wind_speed_10m === undefined ||
    current.weather_code === undefined
  ) {
    throw new Error(`Datos actuales incompletos para ${lugarBase.nombre}`);
  }

  const pronosticoSemanal = mapearPronosticoSemanal(daily);
  if (pronosticoSemanal.length === 0) {
    throw new Error(`Pronostico semanal vacio para ${lugarBase.nombre}`);
  }

  return {
    ...lugarBase,
    tempActual: redondear(current.temperature_2m, 1),
    estadoActual: mapearCodigoWmoAEstado(current.weather_code),
    humedad: redondear(current.relative_humidity_2m, 0),
    viento: redondear(current.wind_speed_10m, 1),
    pronosticoSemanal
  };
}

function cacheVigente() {
  return cacheLugares.length > 0 && Date.now() - cacheTimestamp < CACHE_MS;
}

export async function obtenerLugares() {
  if (cacheVigente()) {
    return cacheLugares.map((lugar) => ({ ...lugar, pronosticoSemanal: lugar.pronosticoSemanal.map((d) => ({ ...d })) }));
  }

  const params = construirParametros(7);
  params.set('latitude', lugaresBase.map((item) => item.latitud).join(','));
  params.set('longitude', lugaresBase.map((item) => item.longitud).join(','));

  const data = await consultarOpenMeteo(params);
  const respuestas = Array.isArray(data) ? data : [data];

  if (respuestas.length !== lugaresBase.length) {
    throw new Error('La respuesta de la API no coincide con las ubicaciones solicitadas.');
  }

  cacheLugares = lugaresBase.map((lugar, index) => mapearLugarConApi(lugar, respuestas[index]));
  cacheTimestamp = Date.now();

  return cacheLugares.map((lugar) => ({ ...lugar, pronosticoSemanal: lugar.pronosticoSemanal.map((d) => ({ ...d })) }));
}

export async function obtenerLugarPorId(id) {
  const idNumerico = Number(id);
  const lugarBase = lugaresBase.find((item) => item.id === idNumerico);

  if (!lugarBase) {
    return null;
  }

  const params = construirParametros(7);
  params.set('latitude', String(lugarBase.latitud));
  params.set('longitude', String(lugarBase.longitud));

  const data = await consultarOpenMeteo(params);
  return mapearLugarConApi(lugarBase, data);
}

export function calcularEstadisticasSemana(pronosticoSemanal) {
  if (!Array.isArray(pronosticoSemanal) || pronosticoSemanal.length === 0) {
    return {
      minSemana: null,
      maxSemana: null,
      promedioSemana: null,
      conteoPorEstado: {},
      resumen: 'Sin datos semanales disponibles.'
    };
  }

  let minSemana = Number.POSITIVE_INFINITY;
  let maxSemana = Number.NEGATIVE_INFINITY;
  let sumaPromedios = 0;
  const conteoPorEstado = {};

  for (let i = 0; i < pronosticoSemanal.length; i += 1) {
    const dia = pronosticoSemanal[i];

    if (dia.min < minSemana) minSemana = dia.min;
    if (dia.max > maxSemana) maxSemana = dia.max;

    sumaPromedios += (dia.min + dia.max) / 2;
    conteoPorEstado[dia.estado] = (conteoPorEstado[dia.estado] || 0) + 1;
  }

  const promedioSemana = redondear(sumaPromedios / pronosticoSemanal.length, 1);

  return {
    minSemana,
    maxSemana,
    promedioSemana,
    conteoPorEstado,
    resumen: generarResumenSemana(conteoPorEstado, promedioSemana)
  };
}

export function generarAlertas(estadisticas, pronosticoSemanal) {
  const alertas = [];
  const diasLluvia = pronosticoSemanal.filter((dia) => dia.estado === 'Lluvioso').length;

  if ((estadisticas.promedioSemana ?? -100) > 26) {
    alertas.push('Alerta de calor: promedio semanal sobre 26C.');
  }

  if (diasLluvia >= 3) {
    alertas.push(`Semana lluviosa: ${diasLluvia} dia(s) con lluvia.`);
  }

  if ((estadisticas.minSemana ?? 100) <= 2) {
    alertas.push('Alerta de bajas temperaturas: posible helada.');
  }

  if (alertas.length === 0) {
    alertas.push('Sin alertas climaticas relevantes para esta semana.');
  }

  return alertas;
}

export function convertirTemperatura(valor, unidad = 'C') {
  if (unidad === 'F') {
    return redondear((valor * 9) / 5 + 32, 1);
  }
  return redondear(valor, 1);
}

function generarResumenSemana(conteoPorEstado, promedioSemana) {
  const diasDespejados = conteoPorEstado.Despejado || 0;
  const diasNublados = conteoPorEstado.Nublado || 0;
  const diasLluviosos = conteoPorEstado.Lluvioso || 0;

  if (diasLluviosos >= 3 && promedioSemana <= 18) return 'Semana fresca y con lluvias.';
  if (diasDespejados > diasNublados && diasDespejados > diasLluviosos) return 'Semana mayormente soleada.';
  if (diasNublados >= 3) return 'Semana con predominio de nubosidad.';
  if (diasLluviosos >= 2) return 'Semana inestable, con jornadas de lluvia.';

  return 'Semana de clima variado.';
}
