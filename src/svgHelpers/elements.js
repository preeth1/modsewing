import React from 'react';
import raphael from 'raphael';
import _ from 'lodash';
import { DISPLAY_FRACTION_TO_FILL } from '../constants';

export const joinPaths = (path1, path2) => {
  return path1.concat(path2);
}

export const translatePath = (path, translation) => {
  const translatedPath = _.map(path, (stroke) => {
    let thisStroke = _.cloneDeep(stroke);
    if (stroke.absolute) {
      stroke.control && (thisStroke.control = translateStroke(stroke.control, translation));
      stroke.end && (thisStroke.end = translateStroke(stroke.end, translation));
    }
    return thisStroke;
  });
  return translatedPath;
}

export const translateStroke = (strokePoint, translation) => {
  const translatedStroke = {};
  translatedStroke.x = strokePoint.x + translation.x;
  translatedStroke.y = strokePoint.y + translation.y;
  return translatedStroke
}

export const createPathElement = (id, path, displayDimensions) => {
  let pathElement = addPathToElement(id, path);
  pathElement = centerAndScalePath(pathElement, path, displayDimensions);
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
  });
  return formattedPath;
}

export const concatStrokes = (formattedPath, strokeToAdd) => {
  formattedPath = formattedPath.concat(strokeToAdd);
  formattedPath = formattedPath.concat(" ");
  return formattedPath;
}

export const addPathToElement =(id, path) => {
  const formattedPath = createFormattedPath(path);
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
  const formattedPath = createFormattedPath(path);
  const height = raphael.pathBBox(formattedPath).height;
  return height
}

export const getWidth = (path) => {
  const formattedPath = createFormattedPath(path);
  const width = raphael.pathBBox(formattedPath).width;
  return width
}

export const getTopLeftX = (path) => {
  const formattedPath = createFormattedPath(path);
  const topLeftX = raphael.pathBBox(formattedPath).x;
  return topLeftX
}

export const getTopLeftY = (path) => {
  // Flipping the default coordinate system, so multiple by negative 1
  const formattedPath = createFormattedPath(path);
  const topLeftY = (-1)*raphael.pathBBox(formattedPath).y;
  return topLeftY
}

export const centerAndScalePath = (pathElement, path, displayDimensions) => {
  const scaleFactor = calculateScaleFactor(path, displayDimensions.x, displayDimensions.y);
  const translation = calculateTranslation(path, displayDimensions.x, displayDimensions.y, scaleFactor);
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
  const pathCenterY = getTopLeftY(path) - (getHeight(path) * scaleFactor) / 2;

  const translateX = displayCenterX - pathCenterX;
  // Add the height to translateY because the svg has the opposite coordinate system of path
  let translateY = displayCenterY - pathCenterY + getHeight(path);
  return {x: translateX, y: translateY}
}
