export default function useUsers() {
  const getUser = async (user) => {
    fetch(`http://localhost:3000/users/${user}`)
      .then((result) => result.json())
      .then((data) => console.log(data));
  };

  return { getUser };
}
