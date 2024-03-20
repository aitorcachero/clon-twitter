import './Loader.css';

export default function Loader({ width, heigth }) {
  return (
    <span className="loader" style={{ width: width, height: heigth }}></span>
  );
}
