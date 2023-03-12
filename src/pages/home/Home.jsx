import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import { Link } from "react-router-dom";


import Datatable from "../../components/datatable/Datatable"


const Home = () => {
  return (
    <div className="list">
    <Sidebar/>
    <div className="listContainer">
      <Navbar/>
      <div className="datatableTitle">
        Add New Tune
        <Link to="skizatunes/new" className="link">
          Upload
        </Link>
      </div>
      <Datatable/>
    </div>
  </div>
  );
};

export default Home;
