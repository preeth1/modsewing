import React from 'react';
import raphael from 'raphael';
import _ from 'lodash';

import { absMovePen,
         addRelLine, } from './pathHelpers'
import { MEASUREMENT_UNIT_OBJECTS } from '../constants';
import { convertMeasurementValue } from '../svgHelpers/conversions';

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

export const HEIGHT_RULER_ID = "pattern-ruler-height";
export const WIDTH_RULER_ID = "pattern-ruler-width";

export const labelHeightAndWidth = ({ pathElement, textLocationObject, displayUnitName }) => {
  const height = textLocationObject.height;
  const width = textLocationObject.width;
  const farLeftX = textLocationObject.farLeftX;
  const farLeftY = textLocationObject.farLeftY;

  const pathOffset = 1;

  // Create a height path
  let heightPath = "";
  heightPath = absMovePen(heightPath, {x: farLeftX - pathOffset, y: farLeftY});
  heightPath = addRelLine(heightPath, {x: 0, y: height});

  // Create a width path
  let widthPath = "";
  widthPath = absMovePen(widthPath, {x: farLeftX, y: farLeftY - pathOffset});
  widthPath = addRelLine(widthPath, {x: width, y: 0});

  // Create height and width elements
  let heightElement = createPathElement(HEIGHT_RULER_ID, heightPath);
  let widthElement = createPathElement(WIDTH_RULER_ID, widthPath);

  // Add the height and width text
  const displayMeasurementHeight = convertMeasurementValue({
    fromValue: height,
    fromUnitName: 'inch',
    toUnitName: displayUnitName,
  });
  const displayMeasurementWidth = convertMeasurementValue({
    fromValue: width,
    fromUnitName: 'inch',
    toUnitName: displayUnitName,
  });
  const unitAbbreviation = _.find(MEASUREMENT_UNIT_OBJECTS, {name: displayUnitName}).asAbbreviation;
  const heightTextParams = {point: {x: farLeftX, y: farLeftY + (height / 2)},
                            dx: -(pathOffset + .25),
                            dy: 0,
                            textString: `${displayMeasurementHeight.toFixed(1)} ${unitAbbreviation}.`,
                            fontSize: 1,
                            textColor: heightAndWidthColor,
                            rotationAngle: -90};

  const widthTextParams = {point: {x: farLeftX + (width / 2), y: farLeftY},
                           dx: 0,
                           dy: -(pathOffset + .25),
                           textString: `${displayMeasurementWidth.toFixed(1)} ${unitAbbreviation}.`,
                           fontSize: 1,
                           textColor: heightAndWidthColor,
                           rotationAngle: 0};

  heightElement = addText(heightElement, heightTextParams)
  widthElement = addText(widthElement, widthTextParams)

  // Group the height and width elements together
  let measurementElements = groupTwoPaths(heightElement, widthElement);

  // Color the measurement elements
  measurementElements = colorElement(measurementElements, heightAndWidthColor);

  // Group the measurement element and the original path element
  const newPathElement = groupTwoPaths(measurementElements, pathElement);

  return newPathElement;
}

export const centerAndScalePath = ({ pathElement, boundingBoxObject, displayUnitName }) => {
  // This function also adds a measurement label
  const originalHeight = boundingBoxObject.originalHeight;
  const originalWidth = boundingBoxObject.originalWidth;
  const farLeftX = boundingBoxObject.farLeftX;
  const farLeftY = boundingBoxObject.farLeftY;

  // Label the height and width of the entire pattern
  const newPathElement = labelHeightAndWidth({
    pathElement,
    textLocationObject: {
      height: originalHeight,
      width: originalWidth,
      farLeftX: farLeftX,
      farLeftY: farLeftY,
    },
    displayUnitName,
  });

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
  const translateX = (2 - farLeftX)*scaleFactor + 3;
  const translateY = (2 - farLeftY)*scaleFactor + 3;

  const centeringString = `translate(${translateX} ${translateY}) scale(${scaleFactor})`;

  return <g transform={centeringString}> {newPathElement} </g>
}