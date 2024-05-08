const handleThousands = (value) => {
  return value >= 1000
    ? (Math.round((value * 10) / 1000) / 10).toLocaleString() + 'k'
    : value.toLocaleString();
};

export default handleThousands;
