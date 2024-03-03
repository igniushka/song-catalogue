import { Link } from 'react-router-dom'

export default function PageNotFound() {
    return <div> 404 page not found
        <br />
        <Link to="/">Go to homepage</Link>
    </div>;
}
