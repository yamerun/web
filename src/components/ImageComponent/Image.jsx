import './style.css'

export default function Image ({ imageInfo }) {
    const { basename, extension, height, mimeType, path, width } = imageInfo;
    console.log(imageInfo)
  
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