import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [lapcount , setLap] = useState(1);
  const [textfieldValue,settextfield] = useState("");

  const intervalRef = useRef(null);


  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);



  const updateWatch = () => {
    setCount((prevCount) => {
      if (prevCount >= 9) {
        setSec((prevSec) => {
          if (prevSec >= 59) {
            setMin((prevMin) => prevMin + 1);
            return 0;
          }
          return prevSec + 1/2;
        });
        return 0;
      }
      return prevCount + 1;
    });
  };

  const startWatch = () => {
    if (intervalRef.current) return; 
    intervalRef.current = setInterval(updateWatch, 100); 
  };

  const stopWatch = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const resetWatch = () => {
    stopWatch();
    setCount(0);
    setSec(0);
    setMin(0);
    settextfield("");
  };
  const s1 = "    ";
  const s2 = "  ";
  const lapWatch = ()=>{
    setLap((prev)=>{return prev+1});
    if(lapcount>=50){
      alert("Lap count reached its Limit !");
      return;
    }
    let str = `${lapcount}.${s1}    ${min}${s2} min ${"    "} ${sec}${s2} sec  ${s1} ${count}${s2} ms\n`;
    settextfield(textfieldValue+str);
    
    
  }
  return (
    <>
      <div className="container">
      <div className="watch-box">
        <div className="stop-watch-time">
            {`${min.toString().padStart(2,"0")}`}<h6 style={{fontSize:20}}>min</h6>:{`${sec.toString().padStart(2,"0")}`}<h6 style={{fontSize:20}}>sec</h6>:{`${count.toString().padStart(2,"0")}`}<h6 style={{fontSize:20}}>ms</h6>
        </div>
      </div>
        <div className="button-group">
          <button className="start-btn" onClick={startWatch}>Start</button>
          <button className="stop-btn" onClick={stopWatch}>Stop</button>
          <button className="reset-btn" onClick={resetWatch}>Reset</button>
          <button className="lap-btn" onClick={lapWatch}>Lap</button>
      </div>
      <br/><br/>
      <textarea cols={50} rows={4} type="textarea" value={textfieldValue}  disabled placeholder="Time Lapses can be looked here:-"/>
      
    </div>
    </>
  );
}

export default App;
