// Simple moving Average
// SMA = (period sum) / N where period sum is the sum of data during the N period

function sma(dataRaw, time_period, parameter) {
    let data = extractData(dataRaw, parameter)
    if (time_period >= data.length) {
    return (  
   ( data.reduce(( accumulator, currentValue ) => accumulator + currentValue, 0 ) ) / data.length
    )} else {
        let nData = data.slice((time_period * -1))
        return (
            nData.reduce(( accumulator, currentValue ) => accumulator + currentValue, 0 )  / time_period
        )
        
    }
}

// Exponential Moving Average
// EMA = k x (Current data point - Previous EMA) + Pervious EMA
// k = The weighting factor of the EMA, such that: k = 2/(n+1) where n = the selected time period

function ema(dataRaw, time_period, parameter) {
    let data = extractData(dataRaw, parameter)
    let emaArr = []
    const k = 2/(time_period + 1)
    emaArr[0] = data[0] // first time the ema will equal the first data point
    for (let i = 1; i < data.length; i++) {
        emaArr.push(data[i] * k + emaArr[i - 1] * (1 - k));
    } 
    return [...emaArr].pop();
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

function atr(rawData, time_period) {
    // first, we need a data set of only the highs and lows
    let highs =  extractData(rawData, "high")
    let lows = extractData(rawData, "low")
    let closes = extractData(rawData, "close")
    // Get the True Range
    // True Range Formula = MAX of (high-low; High-PreviousClose; PreviousCLose-Low)
    let i = 1
    let tr1 = Math.abs(highs[i]-lows[i])
    let tr2 = Math.abs(highs[i] - closes[0])
    let tr3 = Math.abs(closes[0] - lows[i])

}