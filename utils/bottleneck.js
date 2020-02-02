const Bottleneck = require("bottleneck");
const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 1000
});

function wrapFunction(fn) {
  return limiter.wrap(fn);
}

module.exports = wrapFunction;