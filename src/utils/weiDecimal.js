const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  
  const getToWeiUnitFromDecimal = (decimals) => {
    switch (decimals) {
      case 18:
      case "18":
        return "ether"
      case 15:
      case "15":
        return "milli"
      case 12:
      case "12":
        return "micro"
      case 9:
      case "9":
        return "gwei"
      case 6:
      case "6":
        return "mwei"
      case 3:
      case "3":
        return "kwei"
      case 0:
      case "0":
      default:
        return "wei"
    }
  }
  
  module.exports = {
    sleep,
    getToWeiUnitFromDecimal,
  }
  