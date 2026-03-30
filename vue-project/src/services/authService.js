const USERS_STORAGE_KEY = 'weather_app_users';
const SESSION_STORAGE_KEY = 'weather_app_session';

const DEFAULT_USERS = [
  {
    id: 1,
    nombre: 'Simon',
    usuario: 'simonp',
    email: 'simon@clima.app',
    password: '123456',
    preferencias: {
      unidad: 'C',
      tema: 'claro'
    },
    favoritos: [1, 3]
  }
];

function esperar(ms = 280) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function leerStorage(clave, fallback) {
  try {
    const valor = localStorage.getItem(clave);
    if (!valor) return fallback;
    return JSON.parse(valor);
  } catch (error) {
    return fallback;
  }
}

function guardarStorage(clave, data) {
  localStorage.setItem(clave, JSON.stringify(data));
}

function limpiarPassword(user) {
  if (!user) return null;
  const { password, ...sinPassword } = user;
  return sinPassword;
}

function clonarUsuario(user) {
  return {
    ...user,
    preferencias: {
      ...user.preferencias
    },
    favoritos: [...(user.favoritos || [])]
  };
}

function asegurarUsuarios() {
  const usuarios = leerStorage(USERS_STORAGE_KEY, null);
  if (Array.isArray(usuarios) && usuarios.length > 0) {
    return usuarios;
  }

  guardarStorage(USERS_STORAGE_KEY, DEFAULT_USERS);
  return DEFAULT_USERS.map((user) => ({ ...user }));
}

function obtenerUsuarios() {
  return asegurarUsuarios().map((user) => clonarUsuario(user));
}

function guardarUsuarios(usuarios) {
  guardarStorage(USERS_STORAGE_KEY, usuarios);
}

function crearMensajeCredenciales() {
  return new Error('Usuario o contrasena incorrectos');
}

function buscarPorIdentificador(usuarios, identificador) {
  const termino = String(identificador || '').trim().toLowerCase();
  return usuarios.find((user) => user.email.toLowerCase() === termino || user.usuario.toLowerCase() === termino);
}

function setSesionUsuarioId(id) {
  guardarStorage(SESSION_STORAGE_KEY, { userId: id });
}

function limpiarSesion() {
  localStorage.removeItem(SESSION_STORAGE_KEY);
}

export async function iniciarSesion({ identificador, password }) {
  await esperar();

  const usuarios = obtenerUsuarios();
  const user = buscarPorIdentificador(usuarios, identificador);

  if (!user || user.password !== password) {
    throw crearMensajeCredenciales();
  }

  setSesionUsuarioId(user.id);
  return limpiarPassword(user);
}

export async function registrarUsuario(payload) {
  await esperar();

  const usuarios = obtenerUsuarios();
  const emailNormalizado = String(payload.email || '').trim().toLowerCase();
  const usuarioNormalizado = String(payload.usuario || '').trim().toLowerCase();

  const emailDuplicado = usuarios.some((item) => item.email.toLowerCase() === emailNormalizado);
  if (emailDuplicado) {
    throw new Error('El correo ya esta registrado');
  }

  const usuarioDuplicado = usuarios.some((item) => item.usuario.toLowerCase() === usuarioNormalizado);
  if (usuarioDuplicado) {
    throw new Error('El nombre de usuario ya existe');
  }

  const ultimoId = usuarios.reduce((max, item) => Math.max(max, item.id), 0);
  const nuevoUsuario = {
    id: ultimoId + 1,
    nombre: String(payload.nombre || '').trim(),
    usuario: usuarioNormalizado,
    email: emailNormalizado,
    password: payload.password,
    preferencias: {
      unidad: 'C',
      tema: 'claro'
    },
    favoritos: []
  };

  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);

  return limpiarPassword(nuevoUsuario);
}

export function obtenerSesionActiva() {
  const sesion = leerStorage(SESSION_STORAGE_KEY, null);
  if (!sesion?.userId) {
    return null;
  }

  const usuarios = obtenerUsuarios();
  const user = usuarios.find((item) => item.id === sesion.userId);
  return limpiarPassword(user || null);
}

export async function cerrarSesion() {
  await esperar(80);
  limpiarSesion();
}

function actualizarUsuario(userId, updater) {
  const usuarios = obtenerUsuarios();
  const indice = usuarios.findIndex((item) => item.id === userId);

  if (indice < 0) {
    throw new Error('No existe el usuario activo');
  }

  const actualizado = updater(usuarios[indice]);
  usuarios[indice] = actualizado;
  guardarUsuarios(usuarios);

  return limpiarPassword(actualizado);
}

export async function alternarFavorito(userId, lugarId) {
  await esperar(100);

  return actualizarUsuario(userId, (user) => {
    const favoritos = Array.isArray(user.favoritos) ? [...user.favoritos] : [];
    const idLugar = Number(lugarId);
    const existe = favoritos.includes(idLugar);

    return {
      ...user,
      favoritos: existe ? favoritos.filter((item) => item !== idLugar) : [...favoritos, idLugar]
    };
  });
}

export async function actualizarPreferencias(userId, preferenciasParciales) {
  await esperar(100);

  return actualizarUsuario(userId, (user) => ({
    ...user,
    preferencias: {
      ...user.preferencias,
      ...preferenciasParciales
    }
  }));
}
