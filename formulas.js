// Simple moving Average
// SMA = (period sum) / N where period sum is the sum of data during the N period

function sma(dataRaw, timePeriod, parameter) {
    let data = extractData(dataRaw, parameter)
    if (timePeriod >= data.length) {
    return (  
   ( data.reduce(( accumulator, currentValue ) => accumulator + currentValue, 0 ) ) / data.length
    )} else {
        let nData = data.slice((timePeriod * -1))
        return (
            nData.reduce(( accumulator, currentValue ) => accumulator + currentValue, 0 )  / time_period
        )
        
    }
}

// Exponential Moving Average
// EMA = k x (Current data point - Previous EMA) + Pervious EMA
// k = The weighting factor of the EMA, such that: k = 2/(n+1) where n = the selected time period

function ema(dataRaw, timePeriod, parameter) {
    let data = extractData(dataRaw, parameter)
    const k = 2/(timePeriod + 1)
    let emaData = []
    emaData[0] = data[0] // first time the ema will equal the first data point
    for (let i = 1; i < data.length; i++) {
        let newPoint = (data[i] * k) + (emaData[i-1] * (1-k))
        emaData.push(newPoint)
    } 
    let currentEma = [...emaData].pop()
    return +currentEma.toFixed(2)
}

// next: Be able to extract data point from an Object like {high: 12, low: 10, open:10, close: 11, Time: 0}

function extractData(dataObj, key) {
    closeData = []
    dataObj.forEach(obj => {
        closeData.push(obj[key])
    })
    return closeData
}

// Average True Range (ATR)

function atr(rawData, timePeriod) {
    // first, we need a data set of only the highs and lows
    let highs =  extractData(rawData, "high")
    let lows = extractData(rawData, "low")
    let closes = extractData(rawData, "close")
    // Get the True Range
    // True Range Formula = MAX of (high-low; High-PreviousClose; PreviousCLose-Low)
    // Create an array of all True Range Values
    let trueRange = []
    for (let i = 1; i-1 < rawData.length-1; i++) {
        let tr1 = Math.abs(highs[i]-lows[i])
        let tr2 = Math.abs(highs[i] - closes[i-1])
        let tr3 = Math.abs(closes[i-1] - lows[i])
        trueRange.push(Math.max(tr1, tr2, tr3))
        }
    // use the array of True Range Values to get the Simple Moving Average of the true range, ie., ATR
        if (timePeriod >= trueRange.length) {
        return (  
       ( trueRange.reduce(( accumulator, currentValue ) => accumulator + currentValue, 0 ) ) / trueRange.length
        )} else {
            let nData = trueRange.slice((timePeriod * -1))
            return (
                nData.reduce(( accumulator, currentValue ) => accumulator + currentValue, 0 )  / time_period
            )
        }
}

let someData = [
    {open: 10, high: 20, low: 5, close: 11}, 
    {open: 11, high: 25, low: 9, close: 20}, 
    {open: 5, high: 29, low: 4, close: 20}, 
    {open: 8, high: 32, low: 5, close: 31}, 
    {open: 9, high: 31, low: 3, close: 30}, 
    {open: 10, high: 29, low: 5, close: 15}, 
    {open: 10, high: 26, low: 5, close: 9}
]


// EMA=Price(t)×k+EMA(y)×(1−k)
// where:
// t=today
// y=yesterday
// N=number of days in EMA
// k=2÷(N+1)