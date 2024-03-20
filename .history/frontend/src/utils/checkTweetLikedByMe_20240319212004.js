export default function checkTweetLikedByMe(array, id) {
  const CHECK = authUser?.arrayOfTweetLikes.includes(id);
  return CHECK;
}
