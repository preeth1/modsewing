import { STANDARD_MEASUREMENTS } from 'constants.js'
import { convertMeasurements } from 'measurements'	
import { absMovePen, 
				 relMovePen, 
				 drawAbsLine, 
				 drawRelLine, 
				 drawAbsBez } from 'svgHelpers/drawing'
import { calculateArmholeShoulderCenterFrontDart,
         calculateSideDart,
         calculateWaistDart } from 'slopers/darts'
import { t0FromTQuadraticBezier,
         quadraticEquation,
         quadraticEquationForBezier,
         subdivideQuadraticBezierFromt0,
         subdivideQuadraticBezierFromT,
         quadraticBezierLength,
         calculateLineToLineIntersection,
         calculateLineToBezierIntersection,
         calculateCoordAlongLine } from 'svgHelpers/pathMath.js'


export const front = (size) => {

  const a = calculateLineToLineIntersection(
    {x: 0, y: 0}, 
    {x: 10, y: 10}, 
    {x: 10, y: 0}, 
    {x: 0, y: 10});
  const b = calculateLineToBezierIntersection(
    {x: 0, y: 0}, 
    {x: 10, y: 10}, 
    {x: 10, y: 0}, 
    {x: 0, y: 10},
    {x: 5, y: 7}, 
    );

  const convertedMeasurements = convertMeasurements(STANDARD_MEASUREMENTS[size]);
  const frontCoordinates = calculateFrontCoordinates(STANDARD_MEASUREMENTS[size], convertedMeasurements);

  const frontPath = [
    ...absMovePen({x: 0, y: 0}),
    ...drawRelLine({x: 10, y: 0}),
    ...drawRelLine({x: 0, y: 10}),
    ...drawRelLine({x: -10, y: 0}),
    ...drawRelLine({x: 0, y: -10}),
    ]

	return frontPath;
}



export const calculateFrontCoordinates = (measurements, convertedMeasurements) => {
  const waistDartWidth = calculateWaistDart(Math.abs(measurements.waist - measurements.lowHip));
  const shoulderDartWidth = calculateArmholeShoulderCenterFrontDart(convertedMeasurements.cup);
  const sideDartWidth = calculateSideDart(convertedMeasurements.cup);
  const ease = 3/8;
  const shoulderDartMove = 1/4;
  const highHipFromBottom = measurements.lowHipDepth - measurements.highHipDepth;

  let front = {};
  front.x0 = 0;
  front.x1 = measurements.neck.front + shoulderDartMove;
  front.x2 = (measurements.figureBreadth - waistDartWidth)/2;

  // ---Shoulder values
  const originalShoulderHeight = (measurements.frontNeck + 1/8)/2;
  const originalShoulderWidth = Math.sqrt(Math.pow(measurements.shoulder + shoulderDartWidth, 2) - Math.pow(originalShoulderHeight, 2));

  front.x5 = measurements.figureBreadth/2;
  front.x6 = (measurements.figureBreadth + waistDartWidth)/2;

  front.x10 = measurements.crossFront + shoulderDartWidth + 1/8;

  front.x13 = measurements.waist.back + waistDartWidth + ease;

  front.x18 = measurements.bost.front;
  front.x19 = measurements.highHip.back + ease;
  front.x20 = measurements.lowHip.back + ease;

  front.y0 = 0;
  front.y1 = highHipFromBottom;
  front.y2 = measurements.lowHip.depth - 1/2;
  front.y3 = measurements.lowHip.depth;

  front.y5 = measurements.lowHip.depth + 3;

  front.y14 = measurements.lowHip.depth + measurements.length.front - 3/8;

  front.y18 = measurements.lowHip.depth + measurements.length.front + measurements.neck.front + 1/8;

  front.x16 = front.x13;

  let sideHeight = Math.sqrt(Math.pow(measurements.side + sideDartWidth, 2) - Math.pow(front.x18 - front.x13, 2));

  front.y9 = measurements.lowHip.depth + sideHeight;

  front.y12 = front.y14 - 3;

  // Side dart values
  const armholeCenterY = front.y9 + (front.y12 - front.y9)/2;
  front.y10 = armholeCenterY - sideDartWidth/(2*Math.sqrt(2));
  front.y11 = armholeCenterY + sideDartWidth/(2*Math.sqrt(2));;
  front.x11 = calculateLineToBezierIntersection({x: -100, y: front.y11},
                                                {x: 100, y: front.y11},
                                                {x: front.x18, y: front.y9},
                                                {x: front.x10, y: front.y9},
                                                {x: front.x10, y: front.y12}).x;
  front.x12 = calculateLineToBezierIntersection({x: -100, y: front.y10},
                                                {x: 100, y: front.y10},
                                                {x: front.x18, y: front.y9},
                                                {x: front.x10, y: front.y9},
                                                {x: front.x10, y: front.y12}).x;

  const armholeBottomLength = quadraticBezierLength({x: front.x18, y: front.y9},
                                                    {x: front.x10, y: front.y9},
                                                    {x: front.x10, y: front.y12});
  const shoulderBottomPoint = calculateCoordAlongLine({x: front.x10, y: front.y12},
                                                      {x: front.x1 + originalShoulderWidth, y: front.y18 - originalShoulderHeight},
                                                      measurements.backArmhole - armholeBottomLength);
  front.y15 = shoulderBottomPoint.y;
  front.x14 = shoulderBottomPoint.x;

  const newShoulderLength = Math.sqrt(Math.pow(front.x14-front.x1, 2) + Math.pow(front.y15-front.y18, 2)) + shoulderDartWidth;
  const shoulderBottomDart = calculateCoordAlongLine({x: front.x14, y: front.y15},
                                                     {x: front.x1, y: front.y18},
                                                      (newShoulderLength - shoulderDartWidth)/2);
  const shoulderTopDart = calculateCoordAlongLine({x: front.x14, y: front.y15},
                                                  {x: front.x1, y: front.y18},
                                                  (newShoulderLength + shoulderDartWidth)/2);
  front.y17 = shoulderTopDart.y;

  front.y13 = front.y17 - 3;

  front.y7 = front.y14 - Math.sqrt(Math.pow(measurements.figureLength, 2) - Math.pow(measurements.figureBreadth/2, 2));

  front.x17 = calculateLineToBezierIntersection({x: -100, y: front.y7 + sideDartWidth/2},
                                         {x: 100, y: front.y7 + sideDartWidth/2},
                                         {x: front.x13, y: front.y3},
                                         {x: front.x16, y: front.y5},
                                         {x: front.x18, y: front.y9}).x;

  // ---
  front.y16 = shoulderBottomDart.y;
  front.x3 = shoulderTopDart.x;
  front.x8 = shoulderBottomDart.x;
  front.x9 = front.x8;

  front.x4 = calculateLineToLineIntersection({x: front.x5, y: front.y7},
                                             {x: front.x3, y: front.y17},
                                             {x: -100, y: front.y12},
                                             {x: 100, y: front.y12}).x;

  front.x7 = calculateLineToLineIntersection({x: front.x5, y: front.y7},
                                             {x: front.x8, y: front.y16},
                                             {x: -100, y: front.y12},
                                             {x: 100, y: front.y12}).x;

  front.x15 = calculateLineToBezierIntersection({x: -100, y: front.y7 - sideDartWidth/2},
                                             {x: 100, y: front.y7 - sideDartWidth/2},
                                             {x: front.x13, y: front.y3},
                                             {x: front.x16, y: front.y5},
                                             {x: front.x18, y: front.y9}).x;

  front.y4 = front.y7 - 3/4;
  front.y6 = calculateLineToBezierIntersection({x: -100, y: front.y7 - sideDartWidth/2},
                                             {x: 100, y: front.y7 - sideDartWidth/2},
                                             {x: front.x13, y: front.y3},
                                             {x: front.x16, y: front.y5},
                                             {x: front.x18, y: front.y9}).y;

  front.y8 = calculateLineToBezierIntersection({x: -100, y: front.y7 + sideDartWidth/2},
                                             {x: 100, y: front.y7 + sideDartWidth/2},
                                             {x: front.x13, y: front.y3},
                                             {x: front.x16, y: front.y5},
                                             {x: front.x18, y: front.y9}).y;

  return {coordinates: front, height: front.y18 - front.y0, width: front.x20 - front.x0};
}