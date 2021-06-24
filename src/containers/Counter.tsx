import { useState } from 'react';

export function Counter() {
  const [tick, setTick] = useState(0);
  return (
    <div className="h-100 d-flex flex-column justify-content-center align-items-center">
      <h1>{tick}</h1>
      <div>
        <button className="btn btn-outline-success me-2 mr-2" type="button" onClick={() => setTick(tick + 1)}>Increase</button>
        <button className="btn btn-outline-success me-2 ml-2" type="button" onClick={() => setTick(0)}>Reset</button>
      </div>
    </div>
  );
}
