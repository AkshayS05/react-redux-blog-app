import { Link } from 'react-router-dom';

const Missing = () => {
  return (
    <main className="Missing">
      <h2>Page not found!☹</h2>
      <p>Don't be sad 😁</p>
      <p>
        <Link to="/">Visit Our HomePage</Link>
      </p>
    </main>
  );
};

export default Missing;
