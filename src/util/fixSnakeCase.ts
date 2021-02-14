function fixSnakeCase(obj: any): any {
  const result: any = {};
  for (const key in obj) {
    const newKey = key.replace(/[A-Z]/g, val => `_${val.toLowerCase()}`);
    result[newKey] = obj[key];
  }
  return result;
}

export default fixSnakeCase;
