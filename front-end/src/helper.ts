export function createBasicAuthHeader(username: string, password: string): string {
    const encodedCredentials = btoa(`${username}:${password}`);
    return `Basic ${encodedCredentials}`;
}