import fixSnakeCase from './fixSnakeCase';

function smartFixSnakeCase(src: any): any {
  return smartFixSnakeCaseRecursive(src, 0);
}

function smartFixSnakeCaseRecursive(src: any, iteraction: number): any {
  if (src instanceof Array) {
    fixSnakeCaseChildren(src, iteraction);
  } else if (src instanceof Object) {
    src = fixSnakeCase(src);
    fixSnakeCaseChildren(src, iteraction);
  }
  return src;
}

function fixSnakeCaseChildren(src: any, iteraction: number) {
  if (iteraction < 1000) {
    for (const key in src) {
      src[key] = smartFixSnakeCaseRecursive(src[key], iteraction + 1);
    }
  }
}

export default smartFixSnakeCase;
