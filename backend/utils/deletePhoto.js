// Importamos las dependencias.
import fs from 'fs/promises';
import path from 'path';
import url from 'url';

// Importamos la constante que contiene el nombre del directorio de subida de archivos.
import { UPLOADS_DIR } from '../config.js';

// Importamos las funciones de error.
// import { deleteFileError } from '../errors/errorService.js';

// Función que se encargará de eliminar una imagen del disco.
const deletePhoto = async (imgName, folder) => {
  const dirname = path.dirname(url.fileURLToPath(import.meta.url));
  console.log('dirname', dirname);
  try {
    // Creamos la ruta absoluta al archivo que queremos eliminar.
    const imgPath = path.join(dirname, '..', UPLOADS_DIR, folder, `${imgName}`);
    console.log('imgPath', imgPath);

    try {
      // El método "access" lanza un error si la ruta especificada no existe.
      await fs.access(imgPath);
    } catch {
      // Si no existe finalizamos la función.
      return;
    }

    // Eliminamos la imagen.
    const deletePhoto = await fs.unlink(imgPath);
    console.log('Photo deleted', deletePhoto);
  } catch (err) {
    console.error(err);
  }
};

export default deletePhoto;
