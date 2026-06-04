import { expect, type APIResponse } from '@playwright/test';

export class APIAssertions {
  static assertStatusCode(response: APIResponse, expectedStatusCode: number) {
    expect(response.status()).toBe(expectedStatusCode);
  }

  static assertJsonResponse(response: APIResponse, expectedStatusCode: number) {
    expect(response.status()).toBe(expectedStatusCode);
    expect(response.headers()['content-type']).toContain('application/json');
  }
}
