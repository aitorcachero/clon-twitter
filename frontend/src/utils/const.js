import useAuth from '../hooks/useAuth';

const { authUser } = useAuth();

const NAVBAR_MENU = [
  { id: 1, name: 'Inicio', path: '/' },
  { id: 2, name: 'Top usuarios', path: '/tops' },
  { id: 3, name: 'Trending Topics', path: '/trendings' },
  { id: 4, name: 'Login', path: '/login' },
];

export { NAVBAR_MENU };
