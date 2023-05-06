module.exports = {
    launch: {
      headless: true,
      slowMo: false,
      devTools: false,
      args: [
        "--headless", 
        "--no-sandbox", 
        "--disable-dev-shm-usage",
        "--disable-gpu"
      ],
      product: 'chrome'
    },
}