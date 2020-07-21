import config from './config';
import common from 'utils/common';

let api;


if (common.isPc) {
  api = config.pc;
} else {
  api = config.m
}


export default api;


