let index = 1;
setInterval(() => {
  if (index % 2 === 0) console.error(index);
  else console.log(index);

  index += 1;
}, 500);
