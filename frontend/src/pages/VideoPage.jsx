// frontend/src/pages/VideoPage.jsx
import React from "react";
import { useParams } from "react-router-dom";

export default function VideoPage() {
  const { id } = useParams();
  return (
    <div>
      <h2>Video {id}</h2>
      <p>Video page placeholder.</p>
    </div>
  );
}
