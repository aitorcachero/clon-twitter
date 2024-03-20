import { useParams } from 'react-router-dom';

export default function TweetPage() {
  const { user } = useParams();
  return <div>TweetPage</div>;
}
