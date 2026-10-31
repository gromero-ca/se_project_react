function getUserId(user) {
  return typeof user === "object" && user !== null ? user._id : user;
}

function isItemOwnedBy(item, userId) {
  return Boolean(userId) && getUserId(item?.owner) === userId;
}

function isItemLikedBy(item, userId) {
  return (
    Boolean(userId) &&
    (item?.likes || []).some((user) => getUserId(user) === userId)
  );
}

export { isItemLikedBy, isItemOwnedBy };
