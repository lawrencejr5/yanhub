const convert = async (wallet, curr, amount) => {
  try {
    const res = await fetch(
      `https://api.coinconvert.net/convert/${curr}/${wallet}?amount=${amount}`
    );
    const data = await res.json();
    const test = Object.values(data);
    const val = test[2];
    if (!val) {
      return amount;
    }
    return val;
  } catch (error) {
    console.log(error);
  }
};
