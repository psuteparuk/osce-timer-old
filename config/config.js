import * as path from 'path';
import * as _ from 'lodash';

const getEnv = (npmLifecycleEvent) => {
  if (_.isUndefined(npmLifecycleEvent)) {
    throw new Error('Do not run webpack commands directly. Use npm scripts instead.');
  }

  if (npmLifecycleEvent.indexOf(':prod') >= 0) return 'production';
  else if (npmLifecycleEvent.indexOf(':dev') >= 0) return 'development';
  else throw new Error('Invalid npm lifecycle event.');
};

export const ENV = getEnv(process.env.npm_lifecycle_event);
export const IS_PROD = ENV === 'production';
export const IS_DEV = ENV === 'development';

export const HOST = process.env.HOST || 'localhost';
export const PORT = process.env.PORT || 3001;

export const ROOT = path.resolve(__dirname, '..');
export const SRC_DIR = path.resolve(__dirname, '../src');

export const HTML_METADATA = {
  author: 'Potcharapol Suteparuk',
  basepath: '/',
  copyright: 'Copyright 2016 Potcharapol Suteparuk',
  description: 'Timer for an objective structured clinical examination (OSCE)',
  keywords: '',
  lang: 'en',
  locale: 'en_US',
  title: 'OSCE Timer',
};

export function root(...args) {
  return path.join(ROOT, args.join('/'));
}

export function src(...args) {
  return path.join(SRC_DIR, args.join('/'));
}
