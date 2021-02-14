class InvalidResultException {
  message?: string;
  constructor(message?: string) {
    this.message = message;
  }
}

export default InvalidResultException;
