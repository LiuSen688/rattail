export const objectToString: typeof Object.prototype.toString = Object.prototype.toString

export function toTypeString(value: unknown): string {
  return objectToString.call(value)
}

export function isString(val: unknown): val is string {
  return typeof val === 'string'
}

export function isBoolean(val: unknown): val is boolean {
  return typeof val === 'boolean'
}

export function isNumber(val: unknown): val is number {
  return typeof val === 'number'
}

export function isSymbol(val: unknown): val is symbol {
  return typeof val === 'symbol'
}

export function isNumeric(val: unknown): val is number | string {
  return isNumber(val) || (isString(val) && /^[-+]?\d+$/.test(val))
}

export function isPlainObject(val: unknown): val is Record<string, any> {
  return toRawType(val) === 'Object'
}

export function isObject(val: unknown): val is Record<string, any> {
  return typeof val === 'object' && val !== null
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export function isMap(val: unknown): val is Map<any, any> {
  return toRawType(val) === 'Map'
}

export function isSet(val: unknown): val is Set<any> {
  return toRawType(val) === 'Set'
}

export function isDate(val: unknown): val is Date {
  return toRawType(val) === 'Date'
}

export function isRegExp(val: unknown): val is RegExp {
  return toRawType(val) === 'RegExp'
}

export function isWeakMap(val: unknown): val is WeakMap<any, any> {
  return toRawType(val) === 'WeakMap'
}

export function isWeakSet(val: unknown): val is WeakSet<any> {
  return toRawType(val) === 'WeakSet'
}

export function isArrayBuffer(val: unknown): val is ArrayBuffer {
  return toRawType(val) === 'ArrayBuffer'
}

export function isTypedArray(val: unknown) {
  return [
    'Int8Array',
    'Uint8Array',
    'Uint8ClampedArray',
    'Int16Array',
    'Uint16Array',
    'Int32Array',
    'Uint32Array',
    'Float32Array',
    'Float64Array',
    'BigInt64Array',
    'BigUint64Array',
  ].includes(toRawType(val))
}

export function isDataView(val: unknown): val is DataView {
  return toRawType(val) === 'DataView'
}

export function toRawType(value: unknown): string {
  return toTypeString(value).slice(8, -1)
}

// eslint-disable-next-line
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}

export function isArray(val: unknown): val is Array<any> {
  return Array.isArray(val)
}

export function isNullish<T>(val: T | null | undefined): val is NonNullable<T> {
  return val == null
}

export function isTruthy<T>(v: T): v is NonNullable<T> {
  return Boolean(v)
}

export function isEmpty(val: unknown) {
  return val === undefined || val === null || val === '' || (isArray(val) && !val.length)
}

export function isWindow(val: unknown): val is Window {
  return val === window
}

export function supportTouch() {
  return inBrowser() && 'ontouchstart' in window
}

export function inBrowser() {
  return typeof window !== 'undefined'
}

export function inMobile() {
  return inBrowser() && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

const { hasOwnProperty } = Object.prototype

export function hasOwn<T extends object>(val: T, key: PropertyKey): key is keyof T {
  return hasOwnProperty.call(val, key)
}

export function getGlobalThis() {
  if (typeof globalThis !== 'undefined') {
    return globalThis
  }

  if (inBrowser()) {
    return window
  }

  return typeof global !== 'undefined' ? global : self
}

export function isNonEmptyArray(val: unknown): val is Array<any> {
  return isArray(val) && !!val.length
}
