export default async function checkTweetLikedByMe(arrayOfTweets, id) {
  const CHECK = await arrayOfTweets.includes(id);
  return CHECK;
}
