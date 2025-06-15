import { jest } from "@jest/globals";

beforeAll(async () => {
  // Set test environment variables
  Object.defineProperty(process.env, "NODE_ENV", {
    value: "test",
    writable: true,
  });
  Object.defineProperty(process.env, "DATABASE_URL", {
    value: "file:./test.db",
    writable: true,
  });
});

afterAll(async () => {
  // Clean up any test resources if needed
});

beforeEach(() => {
  // Reset all mocks before each test
  jest.clearAllMocks();
});

afterEach(() => {
  // Clean up after each test
});
