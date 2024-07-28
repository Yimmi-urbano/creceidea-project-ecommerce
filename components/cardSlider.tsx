import React, { useState } from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { motion } from 'framer-motion';

const CardSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < 2) { // Cambia este valor según el número de tarjetas menos 1
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex"
        initial={{ x: 0 }}
        animate={{ x: -currentIndex * 100 + '%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{ width: '300%' }} // Cambia esto según el número de tarjetas
      >
        <div className="flex-none w-full sm:w-1/2 md:w-1/3 p-4" style={{ flexBasis: '100%' }}>
          <Card isHoverable isPressable>
            <CardBody>
              <h3 className="text-lg font-bold">Card 1</h3>
              <p>Content for card 1</p>
            </CardBody>
          </Card>
        </div>
        <div className="flex-none w-full sm:w-1/2 md:w-1/3 p-4" style={{ flexBasis: '100%' }}>
          <Card isHoverable isPressable>
            <CardBody>
              <h3 className="text-lg font-bold">Card 2</h3>
              <p>Content for card 2</p>
            </CardBody>
          </Card>
        </div>
        <div className="flex-none w-full sm:w-1/2 md:w-1/3 p-4" style={{ flexBasis: '100%' }}>
          <Card isHoverable isPressable>
            <CardBody>
              <h3 className="text-lg font-bold">Card 3</h3>
              <p>Content for card 3</p>
            </CardBody>
          </Card>
        </div>
        {/* Añade más tarjetas aquí si es necesario */}
      </motion.div>
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
        style={{ visibility: currentIndex === 0 ? 'hidden' : 'visible' }}
      >
        &lt;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
        style={{ visibility: currentIndex === 2 ? 'hidden' : 'visible' }} // Cambia este valor según el número de tarjetas menos 1
      >
        &gt;
      </button>
    </div>
  );
};

export default CardSlider;
