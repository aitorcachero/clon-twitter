export default function formatDate(date) {
  // Parsear la fecha y hora en el formato original
  var dateTime = new Date(date);

  // Obtener las partes de la fecha y hora
  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1;
  var day = ('0' + dateTime.getDate()).slice(-2);
  var hours = ('0' + dateTime.getHours()).slice(-2);
  var minutes = ('0' + dateTime.getMinutes()).slice(-2);
  var seconds = ('0' + dateTime.getSeconds()).slice(-2);

  var dayOfWeek = dateTime.getDay(date);

  const FECHA_ACTUAL = new Date();
  const FECHA_PARSEADA = new Date(date);
  const DIFERENCIA = FECHA_ACTUAL - FECHA_PARSEADA + 3600;
  const DIFERENCIA_DIAS = (DIFERENCIA / 1000 / 60 / 60 / 24).toFixed();
  const DIFERENCIA_HORAS = (DIFERENCIA / 1000 / 60 / 60).toFixed();
  const DIFERENCIA_MINUTOS = (DIFERENCIA / 1000 / 60).toFixed();
  const DIFERENCIA_SEGUNDOS = (DIFERENCIA / 1000).toFixed();

  if (DIFERENCIA_SEGUNDOS < 60) {
    if (DIFERENCIA_SEGUNDOS < '8') {
      return `Ahora mismo`;
    }
    return `Hace ${DIFERENCIA_SEGUNDOS} segundos`;
  }

  if (DIFERENCIA_MINUTOS < 60) {
    if (DIFERENCIA_MINUTOS === '1') {
      return `Hace ${DIFERENCIA_MINUTOS} minuto`;
    }
    return `Hace ${DIFERENCIA_MINUTOS} minutos`;
  }

  if (DIFERENCIA_HORAS < 24) {
    if (DIFERENCIA_HORAS === '1') {
      return `Hace ${DIFERENCIA_HORAS} hora`;
    }
    return `Hace ${DIFERENCIA_HORAS} horas`;
  }

  if (DIFERENCIA_DIAS < 3) {
    if (DIFERENCIA_DIAS === '1') {
      return `Ayer a las ${hours}:${minutes}`;
    }
    if (DIFERENCIA_DIAS === '2') {
      return `Antes de ayer a las ${hours}:${minutes}`;
    }
    return `Hace ${DIFERENCIA_DIAS} dias`;
  }

  const DAYS = {
    0: 'Dom',
    1: 'Lun',
    2: 'Mar',
    3: 'Mie',
    4: 'Jue',
    5: 'Vie',
    6: 'Sab',
  };

  const MONTHS = {
    1: 'Enero',
    2: 'Febrero',
    3: 'Marzo',
    4: 'Abril',
    5: 'Mayo',
    6: 'Junio',
    7: 'Julio',
    8: 'Agosto',
    9: 'Septiembre',
    10: 'Octubre',
    11: 'Noviembre',
    12: 'Diciembre',
  };

  // Formatear la fecha y hora en el nuevo formato
  var dateTimeFormated =
    DAYS[dayOfWeek] +
    ' ' +
    day +
    ' de ' +
    MONTHS[month] +
    ' del ' +
    year +
    ' a las ' +
    hours +
    ':' +
    minutes +
    ':' +
    seconds;

  return dateTimeFormated;
}
