import fixCamelCase from './fixCamelCase';

function smartFixCamelCase(src: any): any {
  return smartFixCamelCaseRecursive(src, 0);
}

function smartFixCamelCaseRecursive(src: any, iteraction: number): any {
  if (src instanceof Array) {
    fixCamelCaseChildren(src, iteraction);
  } else if (src instanceof Object) {
    src = fixCamelCase(src);
    fixCamelCaseChildren(src, iteraction);
  }
  return src;
}

function fixCamelCaseChildren(src: any, iteraction: number) {
  if (iteraction < 1000) {
    for (const key in src) {
      src[key] = smartFixCamelCaseRecursive(src[key], iteraction + 1);
    }
  }
}

export default smartFixCamelCase;
