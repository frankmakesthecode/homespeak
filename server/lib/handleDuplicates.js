function handleDuplicates(list) {
  const lookup = {};

  return list.filter((item) => {
    if (!lookup[item.link]) {
      lookup[item.link] = true;
      return item;
    }
  });
}

module.exports = handleDuplicates;
