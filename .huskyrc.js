const tasks = (task) => task.join(' && ');

module.exports = {
  hooks: {
    'pre-commit': tasks(['test', 'pageSpeedTest'])
  }
};
