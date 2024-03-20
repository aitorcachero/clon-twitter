import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function TweetPage() {
  const { id } = useParams();
  const [tweet, setTweet] = useState();
  useEffect(() => {
    fetch(`http://localhost:3000/tweets/${id}`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
  // console.log(data);
  return <div>TweetPage</div>;
}
