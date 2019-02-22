export const absMovePen = (path, end) => {
  path.push({command: 'M', end: {x: end.x, y: end.y}, absolute: true});
}

// relMovePen has strange behavior if its called on a function with closePath called.
export const relMovePen = (path, end) => {
  path.push({command: 'm', end: {x: end.x, y: end.y}, absolute: false});
}

export const drawAbsLine = (path, end) => {
  path.push({command: 'L', end: {x: end.x, y: end.y}, absolute: true});
}

export const drawRelLine = (path, end) => {
  path.push({command: 'l', end: {x: end.x, y: end.y}, absolute: false});
}

// This function draws an abs quadratic bezier with a specified control point (instead of specifying the control point params)
export const drawAbsBez = (path, end, control) => {
  path.push({command: 'Q', control: {x: control.x, y: control.y}, end: {x: end.x, y: end.y}, absolute: true});
}

export const closePath = (path) => {
  path.push({command: 'Z',})
}

