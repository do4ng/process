let index = 1;
setInterval(() => {
  if (index % 5 === 0) {
    process.exit(1);
  } else console.log(index);
  index += 1;
}, 250);
