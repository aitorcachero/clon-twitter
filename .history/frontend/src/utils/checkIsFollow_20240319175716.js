const checkIsFollow = (USER_ID, ARRAY_FOLLOWS) => {
  return ARRAY_FOLLOWS.includes(USER_ID);
};

export default checkIsFollow;
