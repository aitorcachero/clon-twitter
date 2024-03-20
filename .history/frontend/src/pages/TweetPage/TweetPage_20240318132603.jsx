import { useParams } from 'react-router-dom';

export default function TweetPage() {
  const { id } = useParams();
  return <div>TweetPage</div>;
}
