import React from 'react';
import raphael from 'raphael';
import _ from 'lodash';
import { DISPLAY_FRACTION_TO_FILL,
         STANDARD_MEASUREMENTS } from '../constants';

export const createPathElement = (id, path, displayDimensions) => {
  const formattedPath = createFormattedPath(path);
  let pathElement = addPathToElement(id, formattedPath);
  pathElement = centerAndScalePath(pathElement, formattedPath, displayDimensions);
  return pathElement;
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

export const addPathToElement =(id, formattedPath) => {
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

export const centerAndScalePath = (pathElement, formattedPath, displayDimensions) => {
  const scaleFactor = calculateScaleFactor(formattedPath, displayDimensions.x, displayDimensions.y);
  const translation = calculateTranslation(formattedPath, displayDimensions.x, displayDimensions.y, scaleFactor);
  const centeringString = `translate(${translation.x} ${translation.y}) scale(${scaleFactor})`;
  return <g transform={centeringString}> {pathElement} </g>
}

export const calculateScaleFactor = (formattedPath, displayWidth, displayHeight) => {
  const widthRatio = displayWidth / getWidth(formattedPath);
  const heightRatio = displayHeight / getHeight(formattedPath);
  const scaleFactor = (widthRatio < heightRatio) ? (widthRatio * DISPLAY_FRACTION_TO_FILL) : (heightRatio * DISPLAY_FRACTION_TO_FILL);
  return scaleFactor;
}

export const calculateTranslation = (formattedPath, displayWidth, displayHeight, scaleFactor) => {
  const displayCenterX = displayWidth / 2;
  const displayCenterY = displayHeight / 2;

  const pathCenterX = getTopLeftX(formattedPath) + (getWidth(formattedPath) * scaleFactor) / 2;
  const pathCenterY = getTopLeftY(formattedPath) + (getHeight(formattedPath) * scaleFactor) / 2;

  const translateX = displayCenterX - pathCenterX;
  const translateY = displayCenterY - pathCenterY;
  return {x: translateX, y: translateY}
}
