import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import * as api from "../src/utils/api.js";
import * as auth from "../src/utils/auth.js";

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("authentication requests use the expected endpoints and credentials", async () => {
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url, ...options });
    return { ok: true, json: async () => ({ token: "token" }) };
  };
  const credentials = { email: "person@example.com", password: "secret" };
  await auth.signup({
    ...credentials,
    name: "Gabriel",
    avatar: "https://example.com/avatar",
  });
  await auth.signin(credentials);
  await auth.getCurrentUser("token");
  assert.deepEqual(
    calls.map((call) => new URL(call.url).pathname),
    ["/signup", "/signin", "/users/me"],
  );
  assert.deepEqual(JSON.parse(calls[1].body), credentials);
  assert.equal(calls[2].headers.Authorization, "Bearer token");
});

test("failed API responses reject instead of reporting success", async () => {
  globalThis.fetch = async () => ({ ok: false, status: 401 });
  await assert.rejects(
    auth.signin({ email: "person@example.com", password: "wrong" }),
  );
  await assert.rejects(api.getItems());
});

test("protected item and profile requests carry the bearer token", async () => {
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url, ...options });
    return { ok: true, json: async () => ({ _id: "item" }) };
  };

  await api.addItem(
    { name: "Hat", imageUrl: "https://example.com/a", weather: "warm" },
    "token",
  );
  await api.deleteItem("item", "token");
  await api.addCardLike("item", "token");
  await api.removeCardLike("item", "token");
  await api.updateProfile(
    { name: "Gabriel", avatar: "https://example.com/a" },
    "token",
  );

  assert.deepEqual(
    calls.map((call) => call.method),
    ["POST", "DELETE", "PUT", "DELETE", "PATCH"],
  );
  calls.forEach((call) =>
    assert.equal(call.headers.Authorization, "Bearer token"),
  );
});
