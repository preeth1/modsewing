import React, { Component } from 'react';

// export const createPathElement = (id, path) => {
//   return <path
//       id={id}
//       d={path}
//       vectorEffect="non-scaling-stroke"
//       transform=""
//       stroke-width="3"
//       fill="none"
//       >
//     </path>
// }

export const createPathElement = (id, path) => {
  return <path
      id={id}
      d={path}
      vectorEffect="non-scaling-stroke"
      stroke-width="1"
      stroke="black"
      fill="none"
      >
    </path>
}



