import imgPageContruction from '../../assets/site_construction.png';

export default function TrendingPage() {
  return (
    <div className="w-full flex justify-center items-center">
      <img
        src={imgPageContruction}
        alt="Page under construction"
        className="w-3/4 rounded-lg overflow-hidden mt-10 "
        style={{ aspectRatio: '16/9' }}
      />
    </div>
  );
}
