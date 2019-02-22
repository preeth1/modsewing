import React from 'react';
import raphael from 'raphael';
import _ from 'lodash';
import { DISPLAY_FRACTION_TO_FILL,
         STANDARD_MEASUREMENTS } from '../constants';

export const createPathElement = (id, path) => {
  const formattedPath = createFormattedPath(path)
  return createPathDiv(id, formattedPath)
}

export const createFormattedPath = (path) => {
  let formattedPath = "";
  _.each(path, (stroke) => {
    formattedPath = concatStrokes(formattedPath, stroke.command);
    if (stroke.control) {
      formattedPath = concatStrokes(formattedPath, stroke.control.x);
      formattedPath = concatStrokes(formattedPath, stroke.control.y);
    }
    if (stroke.end) {
      formattedPath = concatStrokes(formattedPath, stroke.end.x);
      formattedPath = concatStrokes(formattedPath, stroke.end.y);
    }
  })
  return formattedPath;
}

export const concatStrokes = (formattedPath, strokeToAdd) => {
  formattedPath = formattedPath.concat(strokeToAdd);
  formattedPath = formattedPath.concat(" ");
  return formattedPath;
}

export const createPathDiv =(id, formattedPath) => {
  return <path
      id={id}
      d={formattedPath}
      vectorEffect='non-scaling-stroke'
      strokeWidth='1'
      stroke='black'
      fill='none'
      >
    </path>
}

export const getHeight = (path) => {
  const height = raphael.pathBBox(path).height;
  return height
}

export const getWidth = (path) => {
  const width = raphael.pathBBox(path).width;
  return width
}

export const getTopLeftX = (path) => {
  const topLeftX = raphael.pathBBox(path).x;
  return topLeftX
}

export const getTopLeftY = (path) => {
  const topLeftY = raphael.pathBBox(path).y;
  return topLeftY
}

export const centerAndScalePath = (pathElement, path, displayWidth, displayHeight) => {
  const scaleFactor = calculateScaleFactor(path, displayWidth, displayHeight);
  const translation = calculateTranslation(path, displayWidth, displayHeight, scaleFactor);
  const centeringString = `translate(${translation.x} ${translation.y}) scale(${scaleFactor})`;
  return <g transform={centeringString}> {pathElement} </g>
}

export const calculateScaleFactor = (path, displayWidth, displayHeight) => {
  const widthRatio = displayWidth / getWidth(path);
  const heightRatio = displayHeight / getHeight(path);
  const scaleFactor = (widthRatio < heightRatio) ? (widthRatio * DISPLAY_FRACTION_TO_FILL) : (heightRatio * DISPLAY_FRACTION_TO_FILL);
  return scaleFactor;
}

export const calculateTranslation = (path, displayWidth, displayHeight, scaleFactor) => {
  const displayCenterX = displayWidth / 2;
  const displayCenterY = displayHeight / 2;

  const pathCenterX = getTopLeftX(path) + (getWidth(path) * scaleFactor) / 2;
  const pathCenterY = getTopLeftY(path) + (getHeight(path) * scaleFactor) / 2;

  const translateX = displayCenterX - pathCenterX;
  const translateY = displayCenterY - pathCenterY;
  return {x: translateX, y: translateY}
}
