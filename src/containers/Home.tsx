import { Link } from 'react-router-dom';

export function Home() {
  return (
    <nav className="navbar h-100">
      <form className="container-fluid justify-content-center">
        <Link to="/counter" className="mr-2">
          <button className="btn btn-outline-success me-2" type="button">Counter</button>
        </Link>
        <Link to="/list" className="ml-2">
          <button className="btn btn-outline-success me-2" type="button">List</button>
        </Link>
      </form>
    </nav>
  );
}
