import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";


import Datatable from "../../components/datatable/Datatable"


const Home = () => {
  return (
    <div className="list">
    <Sidebar/>
    <div className="listContainer">
      <Navbar/>
      <Datatable/>
    </div>
  </div>
  );
};

export default Home;
