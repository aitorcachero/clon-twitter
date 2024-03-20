import { useParams } from 'react-router-dom';

export default function TweetPage() {
  const { id } = useParams();
  console.log(id);
  return <div>TweetPage</div>;
}
