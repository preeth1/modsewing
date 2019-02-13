export const absMovePen = (pathString, movePoint) => {
  return `${pathString} M ${movePoint.x} ${movePoint.y}`;
}

// relMovePen has strange behavior if its called on a function with closePath called.
export const relMovePen = (pathString, movePoint) => {
  return `${pathString} m ${movePoint.x} ${movePoint.y}`;
}

export const addAbsLine = (pathString, endPoint) => {
  return `${pathString} L ${endPoint.x} ${endPoint.y}`;
}

export const addAbsArc = (pathString, radius, endPoint, clockwise) => {
  let rotationDir;
  if (clockwise === true) {
    rotationDir = 0;
  } else {
    rotationDir = 1;
  }
  return `${pathString} A ${radius} ${radius}  ${0} ${0} ${rotationDir} ${endPoint.x} ${endPoint.y}`;
}

export const addRelLine = (pathString, movePoint) => {
  return `${pathString} l ${movePoint.x} ${movePoint.y}`;
}

export const calculateAbsBezierControlPoint = (startPoint, movePoint, fractionAlongLine, controlPointXMove, controlPointYMove) => {
  const controlPoint = {x: ((startPoint.x + (movePoint.x - startPoint.x) * fractionAlongLine)) + controlPointXMove, y: ((startPoint.y + (movePoint.y - startPoint.y) * fractionAlongLine)) + controlPointYMove};
  return controlPoint;
}

export const addAbsQuadraticBezier = (pathString, startPoint, movePoint, fractionAlongLine, controlPointXMove, controlPointYMove) => {
  const controlPoint = calculateAbsBezierControlPoint(startPoint, movePoint, fractionAlongLine, controlPointXMove, controlPointYMove, startPoint)
  return `${pathString} Q ${controlPoint.x} ${controlPoint.y} ${movePoint.x} ${movePoint.y}`;
}

// This function adds an abs quadratic bezier with a specified control point (instead of specifying the control point params)
export const addAbsQuadraticBezierWithControlPoint = (pathString, controlPoint, movePoint) => {
  return `${pathString} Q ${controlPoint.x} ${controlPoint.y} ${movePoint.x} ${movePoint.y}`;
}

export const closePath = (pathString) => {
  return `${pathString} Z`
}

// Add 1/2 inch of ease to every measurement
export const addEase = (value) => {
  return value + .5
}
