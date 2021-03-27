import React from 'react';

const CurvedLetter = ( { i, char, arc, origin , length }) => {
    const deg = arc / length;

    return (
        <span style={{
            height: `${origin}px`,
            transform: `rotate(${deg * i - arc / 2}deg)`,
            transformOrigin: `0 ${origin}px 0`,
          }}>
              {char}
          </span>
    );
}

export default CurvedLetter;