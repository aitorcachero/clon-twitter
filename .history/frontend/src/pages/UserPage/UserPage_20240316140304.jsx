import React from 'react';
import { useParams } from 'react-router-dom';

export default function UserPage() {
  const { user } = useParams();
  console.log(user);
  return <div>UserPage</div>;
}
