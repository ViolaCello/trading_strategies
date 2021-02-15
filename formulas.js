// Simple moving Average
// SMA = (period sum) / N where period sum is the sum of data during the N period

function sma(data) {
    return (  
   ( data.reduce(( accumulator, currentValue ) => accumulator + currentValue, 0 ) ) / data.length
    )
}

// Exponential Moving Average
// EMA = k x (Current data point - Previous EMA) + Pervious EMA
// k = The weighting factor of the EMA, such that: k = 2/(n+1) where n = the selected time period

function ema(data, time_period) {
    const k = 2/(time_period + 1)
   let emaArr = data[0] // first time the ema will equal the first data point
    for (let i = 1; i < data.length; i++) {
        emaArr.push(data[i] * k + emaArr[i - 1] * (1 - k));
    } 
    return [...emaArr].pop();
}

