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
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <h1 className="brand-title">Ate Nhel's</h1>
        </div>
      </header>

      {/* Hero Gallery */}
      <section className="gallery-section">
        <div className="gallery-grid">
          {images.map((publicId, index) => (
            <div key={index} className="gallery-item">
              <AdvancedImage
                cldImg={createImage(publicId)}
                alt="ate nhels gallery"
                className="gallery-image"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-methods">
            <div className="contact-card">
              <div className="contact-info">
                <p className="contact-label">Smart / GCash</p>
                <a href="tel:+639498701629" className="contact-link">09498701629</a>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-info">
                <p className="contact-label">DITO</p>
                <a href="tel:+639935958246" className="contact-link">09935958246</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
