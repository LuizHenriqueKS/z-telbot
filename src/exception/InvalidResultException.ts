class InvalidResultException {
  response?: any;
  constructor(response?: any) {
    this.response = response;
  }
}

export default InvalidResultException;
