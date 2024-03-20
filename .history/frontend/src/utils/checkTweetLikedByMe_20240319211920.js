import useAuth from '../hooks/useAuth';
const { authUser } = useAuth();

export default function checkTweetLikedByMe(id) {
  const CHECK = authUser?.arrayOfTweetLikes.includes(id);
  return CHECK;
}
