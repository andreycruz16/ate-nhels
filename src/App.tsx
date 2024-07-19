import "./App.css";
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

function App() {
  const cld = new Cloudinary({ cloud: { cloudName: 'andreycruz16' } });

  const createImage = (publicId: string | undefined) => cld
    .image(publicId)
    .format('auto')
    .quality('auto');

  const images = [
    'ate_nhels/Ate_Nhels_Page_1.jpg',
    'ate_nhels/Ate_Nhels_Page_2.jpg',
    'ate_nhels/Ate_Nhels_Page_3.jpg',
    'ate_nhels/Ate_Nhels_Page_4.jpg'
  ];

  return (
    <div className="App">
      <h1>Ate Nhel's</h1>
      {images.map((publicId, index) => (
        <AdvancedImage key={index} cldImg={createImage(publicId)} className="responsive" alt="ate nhels" />
      ))}
      <div className="contact-number">09498701629</div>
      <div className="contact-number-label">Contact Number</div>
    </div>
  );
}

export default App;
