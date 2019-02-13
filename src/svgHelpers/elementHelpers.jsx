import React from 'react';
import raphael from 'raphael';
import _ from 'lodash';

import { absMovePen,
         addRelLine, } from './pathHelpers.jsx'

// Define colors for the output PDF
export const primaryTextColor = 'cornflowerblue';
export const secondaryTextColor = 'mediumslateblue';
export const centerFrontAndBackTextColor = 'hotpink';
export const heightAndWidthColor = 'deeppink';
export const sewnDartColor = 'orangered';
export const extraLineColor = 'blueviolet';
export const pocketNotchColor = 'plum';
export const testSquareColor = 'tomato';


export const translateElement = (pathElement, translationObject) => {
  return <g transform={`translate(${translationObject.x}, ${translationObject.y})`}> {pathElement} </g>
}

export const rotateElement = (pathElement, rotationObject) => {
  const rotationAngle = rotationObject.rotationAngle;
  const rotationCoordinate = rotationObject.rotationCoordinate;

  return <g transform={`rotate(${rotationAngle}, ${rotationCoordinate.x}, ${rotationCoordinate.y})`}> {pathElement} </g>
}

export const createPathElement = (id, path) => {
  return <path
      id={id}
      d={path}
      vectorEffect="non-scaling-stroke"
      transform=""
      >
    </path>
}

export const makeLinesDashed = (id, pathElement) => {
  return <g strokeDasharray="3">
  {pathElement}
  </g>
}

export const colorElement = (pathElement, color) => {
  return <g stroke={color}> {pathElement} </g>
}

export const groupTwoPaths = (firstPathToGroup, secondPathToGroup) => {
  return <g>
    {firstPathToGroup}
    {secondPathToGroup}
  </g>

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

export const addText = (pathElement, textParams) => {
  const point = textParams.point;
  const dx = textParams.dx;
  const dy = textParams.dy;
  const textString = textParams.textString;
  const fontSize = textParams.fontSize;
  const textColor = textParams.textColor;
  const rotationAngle = textParams.rotationAngle;

  let textElement = <g fontSize={fontSize} fontFamily="Open Sans" fill={textColor} stroke="none" textAnchor="middle">
    <text x={point.x.toString()} y={point.y} dx={dx} dy={dy}> {textString} </text>
  </g>

  if (rotationAngle) {
    textElement = rotateElement(textElement,
                                {rotationAngle: rotationAngle,
                                rotationCoordinate: {x: point.x + dx, y: point.y + dy}})
  }

  const textAndPathElement = <g> {textElement} {pathElement} </g>

  return textAndPathElement
}

export const addSeamAllowance  = (pathElement, seamAllowanceParams) => {

  const originalWidth = seamAllowanceParams.originalWidth;
  const originalHeight = seamAllowanceParams.originalHeight;
  const seamAllowance = seamAllowanceParams.seamAllowance;

  // Calculate seamAllowanceScaling
  const widthScaleFactor = (Math.abs(originalWidth) + 2 * seamAllowance)/(Math.abs(originalWidth));
  const heightScaleFactor = (Math.abs(originalHeight) + 2 * seamAllowance)/(Math.abs(originalHeight));

  const scaledImageBoundingBoxWidth = originalWidth * widthScaleFactor;
  const scaledImageBoundingBoxHeight = originalHeight * heightScaleFactor;

  const xTranslation = (scaledImageBoundingBoxWidth - originalWidth) / 2;
  const yTranslation = (scaledImageBoundingBoxHeight - originalHeight) / 2;
  const centeringString =`translate(${-xTranslation.toString()} ${-yTranslation.toString()})scale(${widthScaleFactor} ${heightScaleFactor})`;

  return <g> <g transform={centeringString}> {pathElement} </g> {pathElement} </g>
}
