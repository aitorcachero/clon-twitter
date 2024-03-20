import React from 'react';
import { useParams } from 'react-router-dom';

export default function UserPage() {
  const { user } = useParams();
  return <div>UserPage</div>;
}
