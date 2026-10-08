export default function Loader({ label = 'Loading' }) {
  return <div className="loader-wrap" role="status" aria-label={label}><span className="loader" /><span>{label}...</span></div>;
}
