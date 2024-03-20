import './Loader.css';

export default function Loader({ width = '48px', heigth = '48px' }) {
  return (
    <span className="loader" style={{ width: width, height: heigth }}></span>
  );
}
