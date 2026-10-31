import assert from "node:assert/strict";
import { test } from "node:test";
import { isItemLikedBy, isItemOwnedBy } from "../src/utils/itemIdentity.js";

test("ownership works for string and populated owner IDs", () => {
  assert.equal(isItemOwnedBy({ owner: "user1" }, "user1"), true);
  assert.equal(isItemOwnedBy({ owner: { _id: "user1" } }, "user1"), true);
  assert.equal(isItemOwnedBy({ owner: { _id: "user2" } }, "user1"), false);
  assert.equal(isItemOwnedBy({}, undefined), false);
});

test("likes work for string and populated user IDs", () => {
  assert.equal(isItemLikedBy({ likes: ["user1"] }, "user1"), true);
  assert.equal(isItemLikedBy({ likes: [{ _id: "user1" }] }, "user1"), true);
  assert.equal(isItemLikedBy({ likes: [{ _id: "user2" }] }, "user1"), false);
  assert.equal(isItemLikedBy({ likes: [null] }, undefined), false);
  assert.equal(isItemLikedBy({}, "user1"), false);
});
