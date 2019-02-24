export const absMovePen = (end) => {
  return [{command: 'M', end: {x: end.x, y: end.y}, absolute: true}];
}

// relMovePen has strange behavior if its called on a function with closePath called.
export const relMovePen = (end) => {
  return [{command: 'm', end: {x: end.x, y: end.y}, absolute: false}];
}

export const drawAbsLine = (end) => {
  return [{command: 'L', end: {x: end.x, y: end.y}, absolute: true}];
}

export const drawRelLine = (end) => {
  return [{command: 'l', end: {x: end.x, y: end.y}, absolute: false}];
}

// This function draws an abs quadratic bezier with a specified control point (instead of specifying the control point params)
export const drawAbsBez = (control, end) => {
  return [{command: 'Q', control: {x: control.x, y: control.y}, end: {x: end.x, y: end.y}, absolute: true}];
}
