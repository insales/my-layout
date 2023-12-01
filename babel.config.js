export default () => {
  const presets = ['@babel/preset-env'];
  const plugins = ['@babel/plugin-proposal-optional-chaining'];
  return { presets, plugins };
};
