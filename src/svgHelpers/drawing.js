export const absMovePen = (pathString, endPoint) => {
  return `${pathString} M ${endPoint.x} ${endPoint.y}`;
}

// relMovePen has strange behavior if its called on a function with closePath called.
export const relMovePen = (pathString, endPoint) => {
  return `${pathString} m ${endPoint.x} ${endPoint.y}`;
}

export const drawAbsLine = (pathString, endPoint) => {
  return `${pathString} L ${endPoint.x} ${endPoint.y}`;
}

export const drawRelLine = (pathString, endPoint) => {
  return `${pathString} l ${endPoint.x} ${endPoint.y}`;
}

// This function draws an abs quadratic bezier with a specified control point (instead of specifying the control point params)
export const drawAbsBez = (pathString, endPoint, controlPoint) => {
  return `${pathString} Q ${controlPoint.x} ${controlPoint.y} ${endPoint.x} ${endPoint.y}`;
}

export const closePath = (pathString) => {
  return `${pathString} Z`
}

