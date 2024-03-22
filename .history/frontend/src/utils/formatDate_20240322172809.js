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
