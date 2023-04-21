import './style.css'

export const ImageComponent = ({ imageInfo }) => {
    const { basename, extension, height, mimeType, path, width } = imageInfo;
  
    return (
      <div>
        <img
          src={`http://146.59.87.222/${path}`}
          alt={`Image filename is ${basename}`}
          height={height || 'auto'}
          width={width || 'auto'}
          type={mimeType}
          className='img'
        />
      </div>
    );
  };