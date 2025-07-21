const countryList = {
  AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  AQD: "AQ",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  XOF: "BE",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  NOK: "BV",
  BWP: "BW",
  BYR: "BY",
  BZD: "BZ",
  CAD: "CA",
  CDF: "CD",
  XAF: "CF",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CYP: "CY",
  CZK: "CZ",
  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",
  ECS: "EC",
  EEK: "EE",
  EGP: "EG",
  ETB: "ET",
  EUR: "FR",
  FJD: "FJ",
  FKP: "FK",
  GBP: "GB",
  GEL: "GE",
  GGP: "GG",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",
  HKD: "HK",
  HNL: "HN",
  HRK: "HR",
  HTG: "HT",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  JOD: "JO",
  JPY: "JP",
  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LTL: "LT",
  LVL: "LV",
  LYD: "LY",
  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRO: "MR",
  MTL: "MT",
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MYR: "MY",
  MZN: "MZ",
  NAD: "NA",
  XPF: "NC",
  NGN: "NG",
  NIO: "NI",
  NPR: "NP",
  NZD: "NZ",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",
  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SKK: "SK",
  SLL: "SL",
  SOS: "SO",
  SRD: "SR",
  STD: "ST",
  SVC: "SV",
  SYP: "SY",
  SZL: "SZ",
  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",
  VEF: "VE",
  VND: "VN",
  VUV: "VU",
  YER: "YE",
  ZAR: "ZA",
  ZMK: "ZM",
  ZWD: "ZW",
}

const base_url =
  "https://api.currencyapi.com/v3/latest?apikey=cur_live_eKRjyKDnDxNJLsbYzmTA9oiCbMzm6wlrP1WrWgdt&base_currency="

let fromCurrency = "USD"
let toCurrency = "INR"


function initializeDropdowns() {
  const fromSelect = document.getElementById("from-select")
  const toSelect = document.getElementById("to-select")

  populateDropdown(fromSelect, "from")
  populateDropdown(toSelect, "to")

  setupDropdownEvents(fromSelect, "from")
  setupDropdownEvents(toSelect, "to")
}

function populateDropdown(selectElement, type) {
  const optionsContainer = selectElement.querySelector(".select-options")
  optionsContainer.innerHTML = ""

  Object.keys(countryList).forEach((currency) => {
    const option = document.createElement("div")
    option.className = "select-option"
    option.innerHTML = `
            <img src="https://flagsapi.com/${countryList[currency]}/flat/64.png" alt="${currency} flag">
            ${currency}
        `
    option.addEventListener("click", () => selectCurrency(currency, type))
    optionsContainer.appendChild(option)
  })
}

function setupDropdownEvents(selectElement, type) {
  const selected = selectElement.querySelector(".select-selected")
  const items = selectElement.querySelector(".select-items")
  const searchInput = selectElement.querySelector(".search-input")

  selected.addEventListener("click", (e) => {
    e.stopPropagation()
    closeAllSelect(selectElement)
    items.classList.toggle("select-hide")
    selected.classList.toggle("select-arrow-active")
    if (!items.classList.contains("select-hide")) {
      searchInput.focus()
    }
  })

  searchInput.addEventListener("input", (e) => {
    filterOptions(selectElement, e.target.value)
  })

  searchInput.addEventListener("click", (e) => {
    e.stopPropagation()
  })
}

function filterOptions(selectElement, searchTerm) {
  const options = selectElement.querySelectorAll(".select-option")
  options.forEach((option) => {
    const currency = option.textContent.trim()
    if (currency.toLowerCase().includes(searchTerm.toLowerCase())) {
      option.style.display = "flex"
    } else {
      option.style.display = "none"
    }
  })
}

function selectCurrency(currency, type) {
  if (type === "from") {
    fromCurrency = currency
    document.querySelector("#from-select .select-selected").textContent = currency
    updateFlag("from-flag", currency)
  } else {
    toCurrency = currency
    document.querySelector("#to-select .select-selected").textContent = currency
    updateFlag("to-flag", currency)
  }

  closeAllSelect()
  exchangeRate()
}

function updateFlag(flagId, currency) {
  const flag = document.getElementById(flagId)
  const countryCode = countryList[currency]
  flag.src = `https://flagsapi.com/${countryCode}/flat/64.png`
}

function closeAllSelect(exceptElement) {
  const items = document.querySelectorAll(".select-items")
  const selected = document.querySelectorAll(".select-selected")

  items.forEach((item, index) => {
    if (exceptElement && item.parentElement === exceptElement) return
    item.classList.add("select-hide")
    selected[index].classList.remove("select-arrow-active")
  })
}

async function exchangeRate() {
  const amount = document.querySelector(".amount input")
  const msg = document.querySelector(".msg")
  let amtValue = amount.value

  if (amtValue === "" || amtValue < 1) {
    amtValue = 1
    amount.value = "1"
  }

  try {
    const response = await fetch(base_url + fromCurrency)
    const data = await response.json()
    const rate = data.data[toCurrency].value
    const finalAmount = (amtValue * rate).toFixed(2)

    msg.textContent = `${amtValue} ${fromCurrency} = ${finalAmount} ${toCurrency}`
  } catch (error) {
    console.error("Error fetching exchange rate:", error)
    msg.textContent = "Error fetching exchange rate"
  }
}

function swapCurrencies() {
  const temp = fromCurrency
  fromCurrency = toCurrency
  toCurrency = temp


  document.querySelector("#from-select .select-selected").textContent = fromCurrency
  document.querySelector("#to-select .select-selected").textContent = toCurrency

  updateFlag("from-flag", fromCurrency)
  updateFlag("to-flag", toCurrency)

  exchangeRate()
}


document.addEventListener("DOMContentLoaded", () => {
  initializeDropdowns()
  exchangeRate()
})

document.addEventListener("click", () => {
  closeAllSelect()
})

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault()
  exchangeRate()
})

document.getElementById("swap-btn").addEventListener("click", swapCurrencies)

window.addEventListener("load", () => {
  exchangeRate()
})
