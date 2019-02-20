import React, { Component } from 'react';
import raphael from 'raphael';
import ReactDOM from 'react-dom';

export const createPathElement = (id, path) => {
  return <path
      id={id}
      d={path}
      vectorEffect='non-scaling-stroke'
      strokeWidth='1'
      stroke='black'
      fill='none'
      >
    </path>
}

export const getHeight = (pathString) => {
  const height = raphael.pathBBox(pathString).height;
  return height
}

export const getWidth = (pathString) => {
  const width = raphael.pathBBox(pathString).width;
  return width
}

export const getTopLeftX = (pathString) => {
  const topLeftX = raphael.pathBBox(pathString).x;
  return topLeftX
}

export const getTopLeftY = (pathString) => {
  const topLeftY = raphael.pathBBox(pathString).y;
  return topLeftY
}

export const centerAndScalePath = (pathElement, pathString) => {
console.log(ReactDOM)
  const originalHeight = getHeight(pathString);
  const originalWidth = getWidth(pathString);
  const topLeftX = getTopLeftX(pathString);
  const topLeftY = getTopLeftY((pathString));



  // TODO: displayWidth and displayHeight are defined 1) here, and 2) in the UI,
  //       but they need to match up. those 2 definitions should come from a
  //       single definition.
  const displayWidth = 300;
  const displayHeight = 350;
  const fractionOfDisplayToCover = 0.9;
  let scaleFactor;
  // i believe the '+ 3' is from the width of the ruler lines or something - Tyler 2017-06-29
  if (Math.abs(originalWidth / displayWidth) > Math.abs(originalHeight / displayHeight)) {
    scaleFactor = displayWidth * fractionOfDisplayToCover / (originalWidth + 3);
  } else {
    scaleFactor = displayHeight * fractionOfDisplayToCover / (originalHeight + 3);
  }

  // i believe would need no translation, except the test square is 1
  // scaleFactor, the height and width labels are another, and for some reason
  // there is a tiny bit more, maybe the width of the ruler lines or a border
  // somewhere - Tyler 2017-06-29
  const translateX = (2 - topLeftX)*scaleFactor + 3;
  const translateY = (2 - topLeftY)*scaleFactor + 3;

  const centeringString = `translate(${translateX} ${translateY}) scale(${scaleFactor})`;

  return <g transform={centeringString}> {pathElement} </g>





}
