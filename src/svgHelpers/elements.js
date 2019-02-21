import React, { Component } from 'react';
import raphael from 'raphael';
import ReactDOM from 'react-dom';
import { DISPLAY_FRACTION_TO_FILL,
         STANDARD_MEASUREMENTS } from '../constants';

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

export const centerAndScalePath = (pathElement, pathString, displayWidth, displayHeight) => {
  const scaleFactor = calculateScaleFactor(pathString, displayWidth, displayHeight);
  const translation = calculateTranslation(pathString, displayWidth, displayHeight, scaleFactor);
  const centeringString = `translate(${translation.x} ${translation.y}) scale(${scaleFactor})`;
  return <g transform={centeringString}> {pathElement} </g>
}

export const calculateScaleFactor = (pathString, displayWidth, displayHeight) => {
  const widthRatio = displayWidth / getWidth(pathString);
  const heightRatio = displayHeight / getHeight(pathString);
  console.log("DISPLAY_FRACTION_TO_FILL")
  console.log(DISPLAY_FRACTION_TO_FILL)
  const scaleFactor = (widthRatio < heightRatio) ? (widthRatio * DISPLAY_FRACTION_TO_FILL) : (heightRatio * DISPLAY_FRACTION_TO_FILL);
  return scaleFactor;
}

export const calculateTranslation = (pathString, displayWidth, displayHeight, scaleFactor) => {
  const displayCenterX = displayWidth / 2;
  const displayCenterY = displayHeight / 2;

  const pathCenterX = getTopLeftX(pathString) + (getWidth(pathString) * scaleFactor) / 2;
  const pathCenterY = getTopLeftY(pathString) + (getHeight(pathString) * scaleFactor) / 2;

  const translateX = displayCenterX - pathCenterX;
  const translateY = displayCenterY - pathCenterY;
  return {x: translateX, y: translateY}
}
