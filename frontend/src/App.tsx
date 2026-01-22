import React, { useEffect, useState } from 'react';
import { HealthService } from './api/services/HealthService';

function App() {
  const [rootStatus, setRootStatus] = useState<string>('Loading...');
  const [dbStatus, setDbStatus] = useState<string>('Loading...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Test root endpoint
    HealthService.rootGet()
      .then((res) => setRootStatus(JSON.stringify(res)))
      .catch((err) => setError(`Root endpoint error: ${err}`));

    // Test DB endpoint
    HealthService.dbTestDbTestGet()
      .then((res) => setDbStatus(JSON.stringify(res)))
      .catch((err) => setError(`DB endpoint error: ${err}`));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Ark – Health Check</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <h2>Root Endpoint:</h2>
        <pre>{rootStatus}</pre>
      </div>
      <div>
        <h2>DB Test Endpoint:</h2>
        <pre>{dbStatus}</pre>
      </div>
    </div>
  );
}

export default App;
