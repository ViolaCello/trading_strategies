// Simple moving Average
// SMA = (period sum) / N where period sum is the sum of data during the N period

function sma(data) {
    return (  
   ( data.reduce(( accumulator, currentValue ) => accumulator + currentValue, 0 ) ) / data.length
    )
}