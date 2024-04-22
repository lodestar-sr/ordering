import { API_HOST, API_VERSION } from '../config';

export const buildApiUrl = (object = '', id = '') =>
  `${API_HOST}/api/${API_VERSION}/${object}${id ? '/' + id : ''}`;
