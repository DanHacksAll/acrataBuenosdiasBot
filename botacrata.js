const TelegramBot = require("node-telegram-bot-api");

// Token de acceso de tu bot de Telegram
const token = "";

// Rutas de las imágenes que deseas enviar para cada día de la semana
const imagenes = {
  0: "./img/snapshot.jpg",
  1: "./img/snapshot.jpg",
  2: "./img/snapshot.jpg",
  3: "./img/snapshot.jpg",
  4: "./img/snapshot.jpg",
  5: "./img/snapshot.jpg",
  6: "./img/snapshot.jpg",
};

// Hora a la que deseas enviar las imágenes
const horaDeEnvio = "06:00:00"; // Cambia esto por la hora que desees

// Crea un nuevo bot de Telegram
const bot = new TelegramBot(token, { polling: true });

// Maneja los comandos "/start" y "/help"
bot.onText(/\/(start|help)/, (msg, match) => {
  // Guarda el chatId del usuario en una variable global
  global.chatId = msg.chat.id;

  // Envía un mensaje de bienvenida al usuario
  bot.sendMessage(global.chatId, "Hola, este es un bot de prueba.");

  // Función que se ejecutará para enviar la imagen correspondiente
  function enviarImagenDelDia() {
    // Obtiene el día de la semana actual
    const diaActual = new Date().getDay();

    // Ruta de la imagen correspondiente al día de la semana actual
    const imagen = imagenes[diaActual];

    // Envia la imagen al chat
    bot.sendPhoto(global.chatId, imagen);
  }

  // Programa la ejecución de la función a la hora especificada cada día
  setInterval(() => {
    const ahora = new Date();
    const horaActual = ahora.getHours();
    const minutoActual = ahora.getMinutes();
    const segundoActual = ahora.getSeconds();

    if (horaActual === 06 && minutoActual === 00 && segundoActual === 0) {
      // Cambia esto por la hora a la que desees enviar las imágenes
      enviarImagenDelDia();
    }
  }, 1000); // Revisa cada segundo si es hora de enviar la imagen
});
