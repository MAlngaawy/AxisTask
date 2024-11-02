import { Image } from '@mantine/core';
import { Flight } from '../../types';
import { useEffect, useState } from 'react';

type Props = {
  flightData: Flight;
};

const OneFlightImg = ({ flightData }: Props) => {
  const [photo, setPhoto] = useState('');
  const imgId = flightData?.img;

  useEffect(() => {
    if (imgId) {
      fetch(`http://localhost:3000/flights/${flightData?.id}/photo`)
        .then((res) => res.blob())
        .then((data) => {
          const url = URL.createObjectURL(data);
          setPhoto(url);
        })
        .catch((error) => console.error('Error fetching image:', error));
    }
  }, [flightData, imgId]);
  return (
    <Image
      height={100}
      src={photo}
      fallbackSrc="https://placehold.co/500x300?text=No Image"
    />
  );
};

export default OneFlightImg;
