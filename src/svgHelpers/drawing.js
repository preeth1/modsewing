export const absMovePen = (pathString, movePoint) => {
  return `${pathString} M ${movePoint.x} ${movePoint.y}`;
}

// relMovePen has strange behavior if its called on a function with closePath called.
export const relMovePen = (pathString, movePoint) => {
  return `${pathString} m ${movePoint.x} ${movePoint.y}`;
}

export const drawAbsLine = (pathString, movePoint) => {
  return `${pathString} L ${movePoint.x} ${movePoint.y}`;
}

export const drawRelLine = (pathString, movePoint) => {
  return `${pathString} l ${movePoint.x} ${movePoint.y}`;
}

// This function draws an abs quadratic bezier with a specified control point (instead of specifying the control point params)
export const drawAbsBezAbsPoint = (pathString, movePoint, controlPoint) => {
  return `${pathString} Q ${controlPoint.x} ${controlPoint.y} ${movePoint.x} ${movePoint.y}`;
}

// Calculates a control point by first specifying how far along the line (made by startPoint and movePoint) to go, and then 
// how far to translate in x and y
export const drawAbsBezRelPoint = (pathString, movePoint, startPoint, fractionAlongLine, controlPointXMove, controlPointYMove) => {
  const controlPoint = {x: ((startPoint.x + (movePoint.x - startPoint.x) * fractionAlongLine)) + controlPointXMove, y: ((startPoint.y + (movePoint.y - startPoint.y) * fractionAlongLine)) + controlPointYMove};
  return drawAbsBezAbsPoint(pathString, controlPoint, movePoint)
}

export const closePath = (pathString) => {
  return `${pathString} Z`
}

