export function getMoonPayUrl(walletAddress: string, currencyCode = 'pwrc') {
  return `https://buy.moonpay.com?apiKey=pk_test_demo&currencyCode=${currencyCode}&walletAddress=${walletAddress}`;
}
