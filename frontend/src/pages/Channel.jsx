import React from 'react';
import { useParams } from 'react-router-dom';

export default function Channel() {
  const { id } = useParams();
  return (
    <div style={{ padding: 20 }}>
      <h2>Channel</h2>
      <p>Channel id: {id}</p>
      <p>(Channel page placeholder — implement UI later.)</p>
    </div>
  );
}
