'use strict'

const SEPARATOR = '&';
const EMPTY_OBJECT = '{}';
const EMPTY_STRING = "";

function objectToQueryString(object) {
  if (!isParseable(object))
    return EMPTY_STRING;
  return generatePairs([], object);
}

function isParseable(object) {
  return typeof object === 'object' && JSON.stringify(object) !== EMPTY_OBJECT;
}

function generatePairs(initialKeys, object) {
  return Object.keys(generateValue(initialKeys, object))
                  .map(key => initialKeys.concat(key))
                  .map(keys => generatePair(keys, object)).join(SEPARATOR);
}

function generatePair(keys, object) {
  let currentValue = generateValue(keys, object);
  let keyPath = generatePath(keys);
  if (isParseable(currentValue)) {
    return generatePairs(keys, object);
  }
  return `${keyPath}=${currentValue}`;
}

function generatePath(keys) {
  return keys.slice(1).reduce((acc, k) => acc + `[${k}]`, keys[0]);
}

function generateValue(keyPath, object) {
  return keyPath.reduce((acc, key) => acc[key], object);
}

module.exports = objectToQueryString;
