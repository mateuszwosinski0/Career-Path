  import { Link } from "react-router-dom";
  function ApplicationsHeader() {

    return (
  <header>
    <div className="flex justify-between">
      <h2>Applications </h2>
      <Link to="/applications/new">
      Add Application 
      </Link>
       </div>
       <p>Manage all your job applications.</p>
  </header>

    )
}

export default ApplicationsHeader