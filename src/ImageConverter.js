import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

const ImageConverter = () => {
  const [bwImage, setBwImage] = useState(null);

  const handleImageDrop = (acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);

        const imageData = ctx.getImageData(0, 0, image.width, image.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg; 
          data[i + 1] = avg; 
          data[i + 2] = avg; 
        }

        ctx.putImageData(imageData, 0, 0);
        const bwImageUrl = canvas.toDataURL('image/jpeg');
        setBwImage(bwImageUrl);
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(acceptedFiles[0]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Dropzone onDrop={handleImageDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} 
            style={{ 
              border: '2px dashed #000', 
              padding: '20px',
              backgroundColor: 'blue', 
              color: 'white', 
              padding: '10px 20px', 
              border: 'none', 
              cursor: 'pointer', 
              marginTop: '20px' 
          }}>
            <input {...getInputProps()} />
            <p>Нажмите сюда, чтобы выбрать изображение.</p>
          </div>
        )}
      </Dropzone>
      {bwImage && <img src={bwImage} alt="Черно-белое изображение" style={{ marginTop: '20px', maxWidth: '100%' }} />}
    </div>
  );
};

export default ImageConverter;