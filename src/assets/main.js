function hello(...args) {
  return args.reduce((accu, curr) => `Hello Helo! ${accu} ${curr}`);
}
