import InvalidApiTokenException from '../exception/InvalidApiTokenException';

export default function getApiToken(): string {
  const token = process.env.TELBOT_TOKEN;
  if (token) {
    return token;
  }
  throw new InvalidApiTokenException();
};
