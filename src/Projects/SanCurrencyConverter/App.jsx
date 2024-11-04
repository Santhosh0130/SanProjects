import { useState, useEffect } from 'react'
import './CurrencyApp.css'
import axios from 'axios'

export default function App() {
    const [amt, setAmt] = useState(1)
    const [fromCur, setFromCur] = useState("INR")
    const [toCur, setToCur] = useState("USD")
    const [result, setResult] = useState(null)
    const [current, setCurrent] = useState(null)

    const key = "9200428ee935831b2c636206"
    let url = ` https://v6.exchangerate-api.com/v6/9200428ee935831b2c636206/latest/${fromCur}`

    useEffect(() => {
        const getResult = async () => {
            try{
                const response = await axios.get(url)
                setCurrent(response.data.conversion_rates[toCur])
                // console.log(response)
            }catch(e){
                console.log(e.massege)
            }
        }
        getResult()
    }, [fromCur, toCur])

    useEffect(() => {
        setResult((amt * current).toFixed(2))
    }, [amt, current])

    return(
        <>
        <div className="container">
            <div className="image"></div>
            <div className="data">
                <div className="title">san currency converter</div>
                <div className="input-container">
                    <label htmlFor="amt">Amount: </label>
                    <input type="number" value={amt} id='amt' onChange={(e) => {const val = parseFloat(e.target.value);setAmt(isNaN(val) ? 0 : val)}} />
                    <label htmlFor="from">From Currency: </label>
                    <select name="fromCur" id="from" value={fromCur} onChange={(e) => {setFromCur(e.target.value)}}>
                        <option value="INR">INR - Rupee</option>
                        <option value="USD">USD - US Doller</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - Pound</option>
                        <option value="JPY">JPY - Yen</option>
                        <option value="AUD">AUD - Austalian Doller</option>
                        <option value="CAD">CAD - Canadian Doller</option>
                        <option value="CNY">CNY - Yuan</option>
                        <option value="CAD">CAD - Brazilian Real</option>
                        <option value="ZAR">Zar - Rand</option>
                    </select>
                    <label htmlFor="to">To Currency: </label>
                    <select name="toCur" id="to" value={toCur} onChange={(e) => {setToCur(e.target.value)}}>
                        <option value="INR">INR - Rupee</option>
                        <option value="USD">USD - US Doller</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - Pound</option>
                        <option value="JPY">JPY - Yen</option>
                        <option value="AUD">AUD - Austalian Doller</option>
                        <option value="CAD">CAD - Canadian Doller</option>
                        <option value="CNY">CNY - Yuan</option>
                        <option value="CAD">CAD - Brazilian Real</option>
                        <option value="ZAR">Zar - Rand</option>
                    </select>
                </div>
                <div className="result-container">
                    <div className="result">{amt} {fromCur} is Equals to {result} {toCur}</div>
                </div>
            </div>
        </div>
        </>
    )
}