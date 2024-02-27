import {ParamsDictionary} from 'express-serve-static-core';

export type TParamCity = {
  city: string;
} | ParamsDictionary;
