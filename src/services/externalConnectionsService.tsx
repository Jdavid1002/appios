// @import_dependencies_node Import libraries
// @end

// @import_config_files
import {external_api} from '../config/globals';
// @end

class ExternalConnectionsService {
  /**
   * Metodo que obtiene la dirección de una conexion externa
   * @param key Clave de la conexión
   * @returns
   */
  public getConnection(key: string) {
    let _key: any = null;
    if (key !== '' && Object.keys(external_api).length > 0) {
      if (external_api.hasOwnProperty(key)) {
        if (
          external_api[key].hasOwnProperty('url') &&
          external_api[key].url !== ''
        ) {
          _key = external_api[key].url;
        }
      }
    }
    return _key;
  }
}

export const externalConnectionsService = new ExternalConnectionsService();
export {ExternalConnectionsService as DefaultExternalConnectionsService};
