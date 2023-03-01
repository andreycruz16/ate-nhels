import "./App.css";
import image1 from "./assets/Ate_Nhels_Page_1.jpg";
import image2 from "./assets/Ate_Nhels_Page_1.jpg";
import image3 from "./assets/Ate_Nhels_Page_1.jpg";
import image4 from "./assets/Ate_Nhels_Page_1.jpg";

function App() {
  return (
    <div className="App">
      <h1>Ate Nhel's</h1>
      <img src={image1} alt="Ate_Nhels_Page_1" className="responsive" />
      <img src={image2} alt="Ate_Nhels_Page_2" className="responsive" />
      <img src={image3} alt="Ate_Nhels_Page_3" className="responsive" />
      <img src={image4} alt="Ate_Nhels_Page_4" className="responsive" />
      <a href="tel:9498701629"><h1>09498701629</h1></a>
      <h2>Contact Number</h2>
    </div>
  );
}

export default App;
