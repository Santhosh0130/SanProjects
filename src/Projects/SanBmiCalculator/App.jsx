import { useState } from 'react'
import './BMIApp.css'

export default function App(){
    const [bmi, setBmi] = useState()
    const [bmiStauts, setBmiStatus] = useState()
    const [height, setHeight] = useState()
    const [weight, setWeight] = useState()
    const [error, setError] = useState()

    const calc = () => {
        if(height && weight){
            const heightInMeters = height / 100
            const bmiValue = weight / (heightInMeters * heightInMeters)
            setBmi(bmiValue.toFixed(2))
            if(bmiValue < 18.5){
                setBmiStatus("Under Weight")
            } else if(bmiValue >= 18.5 && bmiValue <= 24.9){
                setBmiStatus("Normal Weight")
            } else if(bmiValue >= 25 && bmiValue <= 29){
                setBmiStatus("Over Weight")
            } else{
                setBmiStatus("Obese")
            }
        } else{
            setBmi(null)
            setBmiStatus("")
            setError("Please enter valid numeric values for height and weight.")
        }
    }

    const clear = () => {
        setHeight("")
        setWeight("")
        setBmi(null)
        setError('')
    }

    return(
        <>
        <div className="container">
            <div className="image"></div>
            <div className="data">
                <div className="title"> san bmi calculator</div>
                {error && <p className='error'>{error}</p>}
                <div className="input-container">
                    <label htmlFor="height">Height (cm):</label>
                    <input type="number" id='height' minLength="3" value={height} onChange={(e) => {setHeight(e.target.value),setError('')}} />
                    <label htmlFor="height">Weight (kg):</label>
                    <input type="number" id='weight' value={weight} onChange={(e) => {setWeight(e.target.value),setError('')}} />
                </div>
                <div className="btn-container">
                    <button onClick={calc}>Calculate</button>
                    <button onClick={clear}>Clear</button>
                </div>
                {bmi ? <div className="result-container">
                    <div className="result">You BMI is: {bmi}</div>
                    <div className="status">Status is: {bmiStauts}</div>
                </div> : null}
                <div className="copyright">Designed By <span>San</span></div>
            </div>
        </div>
        </>
    )
}