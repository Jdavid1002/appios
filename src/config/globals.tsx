//@import_config_files
const env = require('./env.json')
//@end

//@export_this_env
export const external_api         = (env.hasOwnProperty('external_api')) ? env['external_api'] : {}
export const main_external_api    = (env.hasOwnProperty('main_external_api')) ? env['main_external_api'] : null
export const main_external_socket = (env.hasOwnProperty('main_external_socket')) ? env['main_external_socket'] : null
