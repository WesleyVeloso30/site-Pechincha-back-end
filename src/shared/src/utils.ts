// /* eslint-disable @typescript-eslint/no-explicit-any */
// import crypto from 'crypto';
// import CryptoJS from 'crypto-js';
// import { ParserOptionsArgs, parseString } from 'fast-csv';
// import { DateTime } from 'luxon';
// import Masker from 'vanilla-masker';

// import { Constants, getEnv } from '@core/constants';
// import DocumentEntity from '@core/entities/document';
// import {
//   KPIData,
//   Locale,
//   SearchParameterBase,
// } from '@core/models';

// import { CompanyType } from './cnab/def_cnab_240';
// import BusinessError, { ErrorCodes } from './errors/business';
// import Bucket from './mechanisms/bucket';
// import { IResponseCitiesData, IResponseStatesData } from './models/ibge';

// const ConstantsEnv: Constants = getEnv();

// export async function findAsync<T>(array: T[], asyncCallback: (t: T) => Promise<T>): Promise<T | undefined> {
//   const promises = array.map(asyncCallback);
//   const results = await Promise.all(promises);
//   const index = results.findIndex((result) => result);
//   return array[index];
// }

// export function controllerPaginationHelper(query: qs.ParsedQs): SearchParameterBase {
//   return {
//     offset: query.offset ? parseInt(query.offset as string, 10) * parseInt((query.limit as string) || '10', 10) : 0,
//     orderBy: (query.orderBy as string) || 'createdAt',
//     isDESC: query.isDESC === 'true',
//     limit: Math.min(parseInt((query.limit as string) || '10', 10), 200),
//     sort: query.sort === 'ASC' || query.sort === 'asc' ? 'ASC' : 'DESC',
//   };
// }

// export function generatePassword(
//   length = 8,
//   charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
// ): string {
//   return new Array(length)
//     .fill(null)
//     .map(() => charset.charAt(Math.floor(Math.random() * charset.length)))
//     .join('');
// }

// // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// export function stringReplace(base: string, params: any): string {
//   Object.keys(params).forEach((opt) => {
//     base = base.replace(new RegExp(`\\{${opt}\\}`, 'g'), params[opt]);
//   });

//   return base;
// }

// export function cryptToken(token: string): string {
//   return crypto
//     .pbkdf2Sync(
//       token,
//       ConstantsEnv.credential.secretPass,
//       ConstantsEnv.credential.iterations,
//       ConstantsEnv.credential.keylen,
//       ConstantsEnv.credential.digest,
//     )
//     .toString('hex');
// }

// export function removeMaskCpfCnpj(cpfOuCnpj: string): string {
//   return cpfOuCnpj?.replace(/[^\d]+/g, '');
// }

// export function cryptPin(pin: string): string {
//   return crypto
//     .pbkdf2Sync(
//       pin,
//       ConstantsEnv.credential.secretPin,
//       ConstantsEnv.credential.iterations,
//       ConstantsEnv.credential.keylen,
//       ConstantsEnv.credential.digest,
//     )
//     .toString('hex');
// }

// export function calculatePercentage(value: number, percentage: number): number {
//   return parseFloat(((value * percentage) / 100).toFixed(2));
// }

// // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// export function handleNestedFields(body: any, field: string): string | number {
//   const fields: string[] = field.split('.');
//   let response: string | number = '';

//   if (body[fields[0]]) {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//     response = fields.reduce((a: string, b: string): string | number => a[b], body);
//     if (fields[0] === 'amount' && typeof response === 'number') {
//       response *= 100;
//     }
//   }

//   return response;
// }

// export const toJSON = (raw: string): any => {
//   let response = null;

//   try {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//     response = JSON.parse(raw);
//   } catch (err) {
//     // nothing
//   }

//   return response;
// };

// export const formatCellphone = (value: string, ddd = true): string => {
//   if (ddd && value.length !== 11) {
//     return value;
//   }
//   if (!ddd && value.length !== 9) {
//     return value;
//   }

//   if (ddd) {
//     return value
//       .replace(/\D/g, '')
//       .replace(/(\d{2})(\d)/, '($1) $2')
//       .replace(/(\d{5})(\d)/, '$1-$2')
//       .replace(/(\d{4})\d+?$/, '$1');
//   }

//   return value
//     .replace(/\D/g, '')
//     .replace(/(\d{5})(\d)/, '$1-$2')
//     .replace(/(\d{4})\d+?$/, '$1');
// };

// export const sleep = async (milliseconds: number): Promise<void> => {
//   // eslint-disable-next-line no-promise-executor-return
//   return new Promise((resolve) => setTimeout(resolve, milliseconds));
// };

// export const toCurrency = (value: number): string => {
//   return new Intl.NumberFormat('pt-br', { useGrouping: false }).format(value).toString().replace(/\./g, ',');
// };

// export const formatMoney = (value: number, fix = true): string => {
//   let formatted = '';
//   if (!value) {
//     if (fix) {
//       formatted = '0.00';
//     } else {
//       formatted = '0';
//     }
//   } else {
//     formatted = value.toFixed(fix ? 2 : 0).toString();
//   }
//   formatted = formatted.replace('.', ',');
//   formatted = formatted.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
//   return formatted;
// };

// export const formatCNPJ = (number: string): string => {
//   return number.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
// };

// export const formatCPF = (number: string): string => {
//   return number.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
// };

// export function removeCurrencySymbol(value: string): number {
//   const cleanedValue = value.replace(/[R$.]/g, '').replace(/[,]/g, '.');
//   return parseFloat(cleanedValue);
// }

// export const maskHiddenCpf = (value: string) =>
//   value ? `***.${value.substring(3, 6)}.${value.substring(6, 9)}-**` : '';

// export const maskHiddenCnpj = (value: string) => {
//   const cleanValue = value.replace(/\D/g, '');
//   return cleanValue ? `${cleanValue.substring(0, 2)}.***.***/****-${cleanValue.substring(12)}` : '';
// };
// export const hiddenIdentifier = (value: string) => {
//   if (value.length === 11) {
//     return maskHiddenCpf(value);
//   }
//   if (value.length === 14) {
//     return maskHiddenCnpj(value);
//   }
//   return value;
// };

// export function formatAccountBank(bankAccount: string): string {
//   if (bankAccount.length !== 6) {
//     return bankAccount;
//   }

//   return `${bankAccount.slice(0, -1)}-${bankAccount.slice(-1)}`;
// }

// export function formatCnpjCpf(cnpjCpf: string): string {
//   // Remove todos os caracteres que não são dígitos
//   const cleaned = cnpjCpf.replace(/\D/g, '');

//   if (cleaned.length === 11) {
//     return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
//   }
//   if (cleaned.length === 14) {
//     return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
//   }
//   return cnpjCpf;
// }
// export const formatZipCode = (number: string): string => {
//   if (!number) return '';

//   number = number.replace(/\D/g, '');
//   number = number.replace(/(\d{5})(\d)/, '$1-$2');

//   return number;
// };

// export const removeZipCodeMask = (zipCode: string): string => {
//   return zipCode ? zipCode.replace('-', '') : '';
// };
// const cnpjCheckInvalid = (numberParam: string) => {
//   const cnpj = numberParam.toString();

//   if (
//     cnpj === '00000000000000' ||
//     cnpj === '11111111111111' ||
//     cnpj === '22222222222222' ||
//     cnpj === '33333333333333' ||
//     cnpj === '44444444444444' ||
//     cnpj === '55555555555555' ||
//     cnpj === '66666666666666' ||
//     cnpj === '77777777777777' ||
//     cnpj === '88888888888888' ||
//     cnpj === '99999999999999' ||
//     cnpj.length !== 14
//   ) {
//     return false;
//   }
//   return true;
// };

// const checkCPFDV = (numberParam: string, dv: string) => {
//   const check = numberParam
//     .split('')
//     .map((item: any, i) => {
//       const res = item * (numberParam.length + 1 - i);

//       return res;
//     })
//     .reduce((x, y) => x + y);

//   let result = 11 - (check % 11);

//   if (result === 10 || result === 11) {
//     result = 0;
//   }

//   return result.toString() === dv;
// };

// const checkInvalid = (numberParam: string) => {
//   const cpf = numberParam.toString();

//   if (
//     cpf.length !== 11 ||
//     cpf === '00000000000' ||
//     cpf === '11111111111' ||
//     cpf === '22222222222' ||
//     cpf === '33333333333' ||
//     cpf === '44444444444' ||
//     cpf === '55555555555' ||
//     cpf === '66666666666' ||
//     cpf === '77777777777' ||
//     cpf === '88888888888' ||
//     cpf === '99999999999'
//   ) {
//     return false;
//   }
//   return true;
// };
// export function isNullOrWhiteSpace(value: string): boolean {
//   return value == null || value.trim() === '';
// }

// export const isCpf = (cpf: string): boolean => {
//   if (!cpf) {
//     return false;
//   }
//   const cpfParsed: string = cpf.replace(/\D/g, '');

//   if (checkInvalid(cpfParsed)) {
//     const numberValue = cpfParsed.toString().slice(0, -2);
//     const dv1 = cpfParsed.toString()[9];
//     const dv2 = cpfParsed.toString()[10];
//     if (checkCPFDV(numberValue, dv1) && checkCPFDV(numberValue + dv1, dv2)) {
//       return true;
//     }
//     return false;
//   }
//   return false;
// };

// const checkCNPJDV = (numberParam: string, dv: string) => {
//   const check = numberParam
//     .split('')
//     .reverse()
//     .map((item, i) => ((i % 8) + 2) * parseInt(item, 10))
//     .reduce((x, y) => x + y);

//   let result = check % 11;

//   if (result < 2) {
//     result = 0;
//   } else {
//     result = 11 - result;
//   }

//   return result.toString() === dv;
// };

// export const isCNPJ = (cnpj: string): boolean => {
//   const cnpjParsed = cnpj.replace(/\D/g, '');
//   if (cnpjCheckInvalid(cnpjParsed)) {
//     const numberValue = cnpjParsed.toString().slice(0, -2);
//     const dv1 = cnpjParsed.toString()[12];
//     const dv2 = cnpjParsed.toString()[13];

//     if (checkCNPJDV(numberValue, dv1) && checkCNPJDV(numberValue + dv1, dv2)) {
//       return true;
//     }
//     return false;
//   }
//   return false;
// };

// export const maskCnpj = (value: string): string =>
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-call
//   value ? Masker.toPattern(value, '99.999.999/9999-99') : '';

// export const maskCpf = (value: string): string =>
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-call
//   value ? Masker.toPattern(value, '999.999.999-99') : '';

// export const maskCpfOrCnpj = (value: string): string => (isCpf(value) ? maskCpf(value) : maskCnpj(value));

// export const hideTaxId = (value: string): string => {
//   const array = value.split('');

//   if (array.length === 14) {
//     array[4] = '*';
//     array[5] = '*';
//     array[6] = '*';
//     array[8] = '*';
//     array[9] = '*';
//     array[10] = '*';
//   } else if (array.length === 18) {
//     array[3] = '*';
//     array[4] = '*';
//     array[5] = '*';
//     array[7] = '*';
//     array[8] = '*';
//     array[9] = '*';
//   }
//   return array.join('');
// };

// export const hideCellphone = (value: string): string => {
//   const array = value.split('');

//   for (let i = 0; i < 12; i += 1) {
//     if (array[i] !== ' ' && array[i] !== ')' && array[i] !== '(' && array[i] !== '-') {
//       array[i] = '*';
//     }
//   }
//   return array.join('');
// };

// export const normalizeString = (value: string): string =>
//   value
//     ? value
//         .normalize('NFD')
//         .replace(/[\u0300-\u036f]/gi, '')
//         .replace(/[^\w\s]/gi, '')
//         .replace(/\s\s+/g, ' ')
//         .trim()
//     : undefined;

// export const removeNumbers = (value: string): string => value.normalize('NFD').replace(/[\d+]/gi, '');

// export const removeSpecialCharacters = (value: string): string =>
//   value ? value.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';

// export const removeLetters = (value: string): string => value.replace(/[^0-9]/g, '') || '0';

// export const toLocaleDateWithLocale = (date: string, format: string, locale: Locale): string =>
//   DateTime.fromISO(date).setLocale(locale).toFormat(format);
// export const maskCellphone = (value: string): string =>
//   value ? Masker.toPattern(value.substring(2, 13), '(99) 9 9999-9999') : '';

// export const censorWord = (str: string): string => {
//   return str[0] + '*'.repeat(str.length - 2) + str.slice(-1);
// };

// export const hideEmail = (email: string): string => {
//   const arr = email.split('@');
//   return `${censorWord(arr[0])}@${arr[1]}`;
// };

// export const concatName = (name: string): string => {
//   return name.split(' ').join('-').toLowerCase();
// };

// export const validateEmail = (email: string): boolean => {
//   const re = /\S+@\S+\.\S+/;
//   return re.test(email);
// };

// export const validateCellphone = (phone: string): boolean => {
//   if (phone.length !== 11 && phone.length !== 13) return false;

//   const re = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})?(\d{4}))$/;
//   return re.test(phone);
// };

// export const shortName = (name: string): string => {
//   const names = name.split(' ');
//   const firstLetters = names.reduce((otherNames, current, index) => {
//     if (`${names[0]} ${names[names.length - 1]}`.length < 19) {
//       return `${names[0]} ${names[names.length - 1]}`;
//     }
//     if (index === names.length - 1) {
//       return `${otherNames} ${current}`;
//     }

//     return `${otherNames} ${current.substr(0, 1)}`;
//   });
//   return firstLetters;
// };

// export const HashMetadata = (fields: string[], secret: string): string => {
//   const values = fields.reduce((result, field) => {
//     let fieldParsed = field;
//     if (field === '') fieldParsed = null;
//     if (fieldParsed)
//       fieldParsed = field
//         .toString()
//         .normalize('NFD')
//         .replace(/[\u0300-\u036f]/g, '');
//     return result + fieldParsed;
//   });
//   return CryptoJS.HmacSHA256(values, secret).toString();
// };

// export const roundDown = (number: number, decimals: number): number => {
//   const decimalsParsed = decimals || 0;
//   return Math.floor(number * 10 ** decimalsParsed) / 10 ** decimals;
// };

// export const chunkArray = (array: unknown[], size: number): unknown[] => {
//   const arrayOfArrays = [];
//   for (let i = 0; i < array.length; i += size) {
//     arrayOfArrays.push(array.slice(i, i + size));
//   }
//   return arrayOfArrays;
// };

// export const generateAlphanumericCode = (size: number): string => {
//   return Math.random().toString(36).slice(-size).toUpperCase();
// };

// export const generateCode = (): string => Math.random().toString().substring(3, 9);

// // RETORNA O NÚMERO FORMATADO PARA O PADRÃO BRASILEIRO
// export const formatMoneyBr = (number: number): string => {
//   const crc = { style: 'currency', currency: (getEnv().currency as string) || 'BRL' };
//   const formatted = new Intl.NumberFormat(getEnv().language || 'pt-BR', crc);
//   return formatted.format(number);
// };

// export const isUUID = (uuid: string): boolean => {
//   return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(uuid);
// };

// export const getStates = async (): Promise<IResponseStatesData[]> => {
//   const { data } = await axios.get<IResponseStatesData[]>(`${ConstantsEnv.ibge.baseUrl}/v1/localidades/estados`);
//   return data;
// };

// export const getCities = async (): Promise<IResponseCitiesData[]> => {
//   const { data } = await axios.get<IResponseCitiesData[]>(`${ConstantsEnv.ibge.baseUrl}/v1/localidades/municipios`);
//   return data;
// };

// /**
//  *
//  * @param name full name
//  * @returns a string without the first name
//  */
// export const familyName = (name: string): string => name.trim().split(' ').slice(1).toString().replace(',', ' ');

// /**
//  *
//  * @param document
//  * @returns string in base64 format from the buffer of the given image downloaded from aws bucket
//  */
// export const imageFromBucketToBase64 = async (document: DocumentEntity): Promise<string> => {
//   const filename: string = document.bucket.slice(document.bucket.lastIndexOf('/') + 1);
//   const bucket: string = document.bucket.slice(0, document.bucket.lastIndexOf('/'));

//   const object = (await Bucket.getObject(filename, bucket)) as { Body: Buffer };
//   return `data:image/jpeg;base64,${Buffer.from(object.Body).toString('base64')}`;
// };

// export const isValidDate = (object: any): boolean => {
//   return object instanceof Date && !Number.isNaN(object.getTime());
// };
// // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// export const invertArrayOrder = (array: any[]) => {
//   const arrayLenght = array.length - 1;
//   const orderedArray = [];
//   for (let i = arrayLenght; i >= 0; i -= 1) {
//     orderedArray.push(array[i]);
//   }
//   return orderedArray;
// };

// export const numberToBrCurrency = (num: number): string => {
//   const num2 = num.toFixed(2).split('.');
//   num2[0] = `R$ ${num2[0].split(/(?=(?:...)*$)/).join('.')}`;
//   return num2.join(',');
// };

// export const firstCharToUpperCase = (str: string): string => {
//   return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
// };

// export const formatterQueryFieldTypeJsonPostgres = (column: string, keyJson: string, operation: string): string => {
//   const result = column
//     .split('.')
//     .map((item) => `"${item}"`)
//     .join('.');
//   return `${result}->>'${keyJson}' ${operation}`;
// };

// const moduleOf10 = (numero: string): number => {
//   numero = numero.replace(/[^0-9]/g, '');

//   let sum = 0;
//   let weight = 2;
//   let counter = numero.length - 1;

//   while (counter >= 0) {
//     let multiplication = Number(numero.substr(counter, 1)) * weight;

//     if (multiplication >= 10) {
//       multiplication = 1 + (multiplication - 10);
//     }

//     sum += multiplication;

//     if (weight === 2) {
//       weight = 1;
//     } else {
//       weight = 2;
//     }

//     counter -= 1;
//   }

//   let digit = 10 - (sum % 10);

//   if (digit === 10) {
//     digit = 0;
//   }

//   return digit;
// };

// export const barcodeToTypeable = (barcode: string): string => {
//   const line = barcode.replace(/[^0-9]/g, '');

//   const firstField = `${line.substr(0, 4) + line.substr(19, 1)}.${line.substr(20, 4)}`;
//   const secondField = `${line.substr(24, 5)}.${line.substr(24 + 5, 5)}`;
//   const thirdField = `${line.substr(34, 5)}.${line.substr(34 + 5, 5)}`;
//   const fourthField = line.substr(4, 1);
//   let fifthField = line.substr(5, 14);

//   if (fifthField === '0') fifthField = '000';

//   const typleableLine = `${firstField + moduleOf10(firstField)} ${secondField}${moduleOf10(
//     secondField,
//   )} ${thirdField}${moduleOf10(thirdField)} ${fourthField} ${fifthField}`;

//   return typleableLine.replace('.', '').replace(' ', '');
// };

// export const verifyAndSliceTaxId = (taxId: string, taxIdType: string, cpfSlice: number, cnpjSlice = 0): string => {
//   if (Number(taxIdType) === CompanyType.CPF) return taxId.slice(cpfSlice);

//   return taxId.slice(cnpjSlice);
// };

// export function stringToCsv<T>(fileString: string, options: ParserOptionsArgs): Promise<T[]> {
//   return new Promise((resolve, reject) => {
//     const rowProcessor = (row: T) => ({
//       ...Object.keys(row).reduce(
//         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//         (previousValue, key) => ({ ...previousValue, [key]: row[key] === '' ? null : row[key] }),
//         {},
//       ),
//     });
//     const data = [];
//     parseString(fileString, options)
//       .on('error', reject)
//       .on('data', (row: T) => {
//         const obj = rowProcessor(row);
//         if (obj) data.push(obj);
//       })
//       .on('end', () => {
//         resolve(data);
//       });
//   });
// }

// export function formatDuration(days: number): { unit: number; label: string } {
//   if (days < 1) {
//     return { unit: 0, label: 'dias' };
//   }

//   if (days === 1) {
//     return { unit: 1, label: 'dia' };
//   }

//   if (days < 365) {
//     return { unit: days, label: 'dias' };
//   }

//   const years = Math.floor(days / 365);

//   if (years === 1) {
//     return { unit: 1, label: 'ano' };
//   }

//   return { unit: years, label: 'anos' };
// }

// export function extractPhoneNumberInfo(phoneNumber: string): {
//   ddi: string;
//   ddd: string;
//   number: string;
// } {
//   const ddi = phoneNumber.slice(0, 2);
//   const ddd = phoneNumber.slice(2, 4);
//   const number = phoneNumber.slice(4);

//   return {
//     ddi,
//     ddd,
//     number: `${number.slice(0, 4)}-${number.slice(4)}`,
//   };
// }
// export const handleOptionalVariable = (value: string, replaceTo = 'Informação ausente'): string => {
//   return value ?? replaceTo;
// };

// export const isWeakPIN = (pin: string, dateOfBirth?: string): boolean => {
//   for (let i = 0; i < pin.length - 1; i++) {
//     if (pin[i] === pin[i + 1]) {
//       return true;
//     }
//   }

//   if (dateOfBirth) {
//     const dateParts = dateOfBirth.split('/');
//     const day = dateParts[0];
//     const month = dateParts[1];
//     const year = dateParts[2];

//     if (
//       (pin.includes(day + month) && day + month !== dateOfBirth) ||
//       (pin.includes(month + year) && month + year !== dateOfBirth)
//     ) {
//       return true;
//     }
//   }

//   return false;
// };
