import React from 'react';
import Barchart from './components/barchart';
import VisualComponent from './components/visual';

export default function Home() {
  return (
    <div>
      <div className="center-screen">
        <h1>Beating Hearts</h1>
      </div>
      <div className="center-screen">
        <VisualComponent />
      </div>
    </div>
  );
}
