import "./App.css";
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { scale } from "@cloudinary/url-gen/actions/resize";

function App() {
  const cld = new Cloudinary({ cloud: { cloudName: 'andreycruz16' } });

  const createImage = (publicId: string | undefined) => cld
    .image(publicId)
    .format('auto')
    .quality('auto')
    .resize(scale().width('auto'));

  const images = [
    'ate_nhels/Ate_Nhels_Page_1_2026.jpg',
    'ate_nhels/Ate_Nhels_Page_2_2026.jpg',
    'ate_nhels/Ate_Nhels_Page_3_2026.jpg'
  ];

  return (
    <div className="App">
      <h1>Ate Nhel's</h1>
      {images.map((publicId, index) => (
        <AdvancedImage key={index} cldImg={createImage(publicId)} alt="ate nhels" className="responsive"/>
      ))}
      <div className="contact-section">
        <div className="contact-number-label">Contact Information</div>
        <div className="contact-number">
          <a href="tel:+639498701629">📱 0949 870 1629 <span className="contact-number-provider">(Smart / GCash)</span></a>
        </div>
        <div className="contact-number">
          <a href="tel:+639935958246">📱 0993 595 8246 <span className="contact-number-provider">(DITO)</span></a>
        </div>
      </div>
    </div>
  );
}

export default App;
