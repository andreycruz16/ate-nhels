import "./App.css";
import image1 from "./assets/Ate_Nhels_Page_1.jpg";
import image2 from "./assets/Ate_Nhels_Page_2.jpg";
import image3 from "./assets/Ate_Nhels_Page_3.jpg";
import image4 from "./assets/Ate_Nhels_Page_4.jpg";

function App() {
  return (
    <div className="App">
      <h1>Ate Nhel's</h1>
      <img src={image1} alt="Ate_Nhels_Page_1" className="responsive" />
      <img src={image2} alt="Ate_Nhels_Page_2" className="responsive" />
      <img src={image3} alt="Ate_Nhels_Page_3" className="responsive" />
      <img src={image4} alt="Ate_Nhels_Page_4" className="responsive" />
      <div className="contact-number">09498701629</div>
      <div className="contact-number-label">Contact Number</div>
    </div>
  );
}

export default App;
