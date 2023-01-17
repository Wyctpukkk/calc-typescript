import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [firstArg, setFirstArg] = useState('');
  const [secondArg, setSecondArg] = useState('');
  const [operand, setOperand] = useState('');
  const [result, setResult] = useState('0');

  useEffect(() => {
    if (result === '') setResult('0');
  }, [result]);

  const addArg = (e) => {
    if (result === '0') {
      setFirstArg(e.target.value);
      setResult(e.target.value);
    } else {
      if (operand) {
        if (secondArg.includes('.') && e.target.value === '.') {
          console.log('second repeat .');
        } else {
          setSecondArg(secondArg.concat(e.target.value));
          setResult(result.concat(e.target.value));
        }
      } else {
        if (firstArg.includes('.') && e.target.value === '.') {
          console.log('first repeat .');
        } else {
          setFirstArg(firstArg.concat(e.target.value));
          setResult(result.concat(e.target.value));
        }
      }
    }
  };

  const clear = () => {
    setFirstArg('');
    setSecondArg('');
    setOperand('');
    setResult('0');
  };

  const backspace = () => {
    if (secondArg && firstArg) {
      setSecondArg(secondArg.slice(0, -1));
      setResult(result.slice(0, -1));
    } else if (operand) {
      setOperand('');
    } else if (firstArg) {
      setFirstArg(firstArg.slice(0, -1));
      setResult(result.slice(0, -1));
    } else {
      setResult('0');
    }
  };

  const addOperand = (e) => {
    if (operand) {
    } else {
      setOperand(e.target.value);
      setResult(result.concat(e.target.value));
    }
  };

  const operation = (firstArg, secondArg, operand) => {
    let result = 0;

    if (operand === '+') {
      result = +firstArg + +secondArg;
    } else if (operand === '-') {
      result = +firstArg - +secondArg;
    } else if (operand === '/') {
      if (secondArg === '0') {
        result = 'На 0 нельзя делить';
      } else {
        result = +firstArg / +secondArg;
      }
    } else if (operand === 'x') {
      result = +firstArg * +secondArg;
    } else if (operand === '') {
      result = firstArg;
    }

    setResult(String(result));
    setFirstArg(String(result));
    setSecondArg('');
    setOperand('');
  };

  return (
    <>
      <div className="container">
        <form>
          <textarea readOnly value={result} disabled={true}></textarea>
        </form>
        <div className="keypad">
          <button className="btn-styled" onClick={() => clear()} id="clear">
            Clear
          </button>
          <button className="btn-styled" onClick={backspace} id="backspace">
            C
          </button>
          <button className="btn-styled" value={'/'} onClick={addOperand}>
            &divide;
          </button>
          <button value={'7'} onClick={addArg}>
            7
          </button>
          <button value={'8'} onClick={addArg}>
            8
          </button>
          <button value={'9'} onClick={addArg}>
            9
          </button>
          <button className="btn-styled" value={'x'} onClick={addOperand}>
            &times;
          </button>
          <button value={'4'} onClick={addArg}>
            4
          </button>
          <button value={'5'} onClick={addArg}>
            5
          </button>
          <button value={'6'} onClick={addArg}>
            6
          </button>
          <button className="btn-styled" value={'-'} onClick={addOperand}>
            -
          </button>
          <button value={'1'} onClick={addArg}>
            1
          </button>
          <button value={'2'} onClick={addArg}>
            2
          </button>
          <button value={'3'} onClick={addArg}>
            3
          </button>
          <button className="btn-styled" value={'+'} onClick={addOperand}>
            +
          </button>
          <button value={'0'} onClick={addArg}>
            0
          </button>
          <button value={'.'} onClick={addArg}>
            .
          </button>
          <button
            className="btn-styled"
            id="result"
            onClick={() => operation(firstArg, secondArg, operand)}
          >
            =
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
