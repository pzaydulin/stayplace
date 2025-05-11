module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],
    browsers: ["Chrome"],
    singleRun: true,
    files: ["src/**/*.spec.ts"],
    preprocessors: {
      "src/**/*.spec.ts": ["webpack"],
    },
    reporters: ["progress", "kjhtml", "coverage"],
    coverageReporter: {
      type: "html",
      dir: "coverage/",
    },
  });
};
