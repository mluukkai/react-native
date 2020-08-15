module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['module:babel-preset-expo'],
  };
};
