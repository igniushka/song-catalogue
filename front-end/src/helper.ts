// export function createBasicAuthHeader(username: string, password: string): string {
//     const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');
//     return `Basic ${encodedCredentials}`;
//   }

export function createBasicAuthHeader(username: string, password: string): string {
    const encodedCredentials = btoa(`${username}:${password}`);
    return `Basic ${encodedCredentials}`;
  }