function fixCamelCase(obj: any) {
  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    const camelCaseKey = getCamelCaseKey(key);
    result[camelCaseKey] = value;
  }
  return result;
}

function getCamelCaseKey(key: string): string {
  return key.replace(/_\w/g, (value) => value.substr(1).toUpperCase());
}

export default fixCamelCase;
