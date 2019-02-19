import _ from 'lodash';
import { absMovePen,
         addAbsLine,
         addAbsQuadraticBezier,
         addAbsQuadraticBezierWithControlPoint, } from './svgHelpers/pathHelpers'

import { quadraticBezierLength,
         calculateLineToLineIntersection,
         calculateLineToBezierIntersection,
         calculateCoordAlongLine } from './svgHelpers/bezierMath'


export const calculateDartWidth = (fullWaistWithEaseLowHipWithEaseDiff) => {
  let dart_width = (fullWaistWithEaseLowHipWithEaseDiff - 1.5)/12;
  if (dart_width < 0) {
    dart_width = 0;
  }
  return dart_width
}

export const calculateShoulderDart = (measurements) => {
let dartWidth = "";
if(measurements.cupSize==="None") {
    dartWidth = 0;
}
if(measurements.cupSize==="A") {
    dartWidth = 3/8;
}
if(measurements.cupSize==="B") {
    dartWidth = 1/2;
}
if(measurements.cupSize==="C") {
    dartWidth = 5/8;
}
if(measurements.cupSize==="D") {
    dartWidth = 3/4;
}
return dartWidth
}

export const calculateSideDart = (measurements) => {
let dartWidth = "";
if(measurements.cupSize===1) {
    dartWidth = 0;
}
if(measurements.cupSize===2) {
    dartWidth = 3/4;
}
if(measurements.cupSize===3) {
    dartWidth = 1;
}
if(measurements.cupSize===4) {
    dartWidth = 1.25;
}
if(measurements.cupSize===5) {
    dartWidth = 1.5;
}
return dartWidth
}

export const measurementCorrections = (inputObject) => {
  const measurements = inputObject.measurements;
  const waistDartWidth = calculateDartWidth(Math.abs(measurements.fullWaistWithEase - measurements.fullLowHipWithEase));
  const ease = 3/8;
  const sideDartWidth = calculateSideDart(measurements);
  const front_x13 = measurements.backWaist + waistDartWidth + ease;
  const front_x18 = measurements.frontBust;
  const sideHeight = Math.sqrt(Math.pow(measurements.sideLength + sideDartWidth, 2) - Math.pow(front_x18 - front_x13, 2));
  const front_y14 = measurements.lowHipDepth + measurements.frontLength - 3/8;
  const front_y7 = front_y14 - Math.sqrt(Math.pow(measurements.figureLength, 2) - Math.pow(measurements.figureBreadth/2, 2));
  const front_y9 = measurements.lowHipDepth + sideHeight;

  // If the sideLength is too close to the frontLength, make a sideLength adjustment.
  if (measurements.frontLength - 6 < sideHeight){
    measurements.sideLength = Math.sqrt(Math.pow(measurements.frontLength-6, 2) + Math.pow(front_x18 - front_x13, 2)) - sideDartWidth;
  }

  // If the figureLength is too short, extend it
  // If the y value of the bottom of the armhole is too close to the center of the breast (ie less than 2"), increase the figureLength such that the center of the breast is 1.5 inches below the bottom armhole
  if ((front_y9 - front_y7) < 2){
    measurements.figureLength = Math.sqrt(Math.pow(2 - front_y9 + front_y14, 2) + Math.pow(measurements.figureBreadth/2, 2));
  }

  return measurements
}

export const convertMeasurements = (measurements) => {
  const patternMeasurements = {
    fullWaistWithEase: addEase(measurements.waist),
    fullLowHipWithEase: addEase(measurements.lowHip),
    frontWaist: getFrontSkirtValue(measurements.waist),
    frontHighHip: getFrontSkirtValue(measurements.highHip),
    highHipDepth: measurements.highHipDepth,
    frontLowHip: getFrontSkirtValue(measurements.lowHip),
    lowHipDepth: measurements.lowHipDepth,
    backWaist: getBackSkirtValue(measurements.waist),
    backHighHip: getBackSkirtValue(measurements.highHip),
    backLowHip: getBackSkirtValue(measurements.lowHip),
    sloperLength: 20,
    frontNeck: measurements.neck/6 + (1/4),
    backNeck: measurements.neck/6 + (3/8),
    shoulder: measurements.shoulder,
    frontLength: measurements.frontLength,
    backLength: measurements.backLength,
    figureLength: measurements.figureLength,
    figureBreadth: measurements.figureBreadth,
    crossFront: measurements.crossFront/2,
    crossBack: measurements.crossBack/2,
    frontBust: getFrontSkirtValue(measurements.bust),
    backBust: getBackSkirtValue(measurements.bust),
    upperBust: measurements.upperBust,
    cupSize: getCupSize(measurements.bust, measurements.upperBust),
    sideLength: measurements.sideLength,
    frontArmhole: measurements.armhole/2 - 1/4,
    backArmhole: measurements.armhole/2 + 1/4,
    skirtLength: measurements.skirtLength,
  }
  return patternMeasurements
}

const getCupSize = (bust, upperBust) => {
  const bustDifference = Math.ceil(bust - upperBust);
  return bustDifference;
}

export const addEase = (value) => {
  return value + .5
}

export const getFrontSkirtValue = (value) => {
  return addEase(value)/4 + .25
}

export const getBackSkirtValue = (value) => {
  return addEase(value)/4 - .25
}

export const calculateBackCoordinates = (inputObject) => { 
  let measurements = inputObject.measurements;
  measurements = convertMeasurements(measurements)
  measurements = measurementCorrections(inputObject);
  const waistDartWidth = calculateDartWidth(Math.abs(measurements.fullWaistWithEase - measurements.fullLowHipWithEase));
  const shoulderDartWidth = calculateShoulderDart(measurements);
  const ease = 3/8;
  const waistShaping = 3/8;
  const highHipFromBottom = measurements.lowHipDepth - measurements.highHipDepth;

  let back = {};

  back.x0 = measurements.backLowHip + ease;

  back.x2 = measurements.backBust + ease;

  const originalShoulderHeight = 1;
  const originalShoulderWidth = Math.sqrt(Math.pow(measurements.shoulder + shoulderDartWidth, 2) - Math.pow(originalShoulderHeight, 2));

  back.x3 = measurements.backWaist + waistDartWidth + ease;
  back.x6 = measurements.crossBack + 1/4;

  back.x9 = waistShaping + (measurements.backWaist + waistDartWidth)/2;

  back.x12 = waistShaping + measurements.backWaist/2;

  back.x14 = waistShaping + (measurements.backWaist - waistDartWidth)/2;
  back.x15 = measurements.backNeck + shoulderDartWidth;
  back.x16 = waistShaping;

  back.x18 = 0;

  back.y0 = 0;
  back.y1 = measurements.lowHipDepth - 7;
  back.y2 = highHipFromBottom;
  back.y3 = measurements.lowHipDepth;
  back.y4 = measurements.lowHipDepth + 1/2;
  back.y5 = measurements.lowHipDepth + 3;

  back.y10 = measurements.lowHipDepth + measurements.backLength - 1/8;

  back.y14 = back.y10 + 1;


  back.y7 = measurements.lowHipDepth + Math.sqrt(Math.pow(measurements.sideLength, 2) - Math.pow(back.x3 - back.x2, 2)) - 3/4;
  back.y8 = back.y7 + measurements.backLength/4;
  back.y6 = back.y7 - 1;

  const armholeBottomLength = quadraticBezierLength({x: back.x2, y: back.y7},
                                                    {x: back.x6, y: back.y7},
                                                    {x: back.x6, y: back.y8});

  const shoulderBottomPoint = calculateCoordAlongLine({x: back.x6, y: back.y8},
                                                      {x: back.x15 + originalShoulderWidth, y: back.y14 - originalShoulderHeight},
                                                      measurements.backArmhole - armholeBottomLength);
  back.x5 = shoulderBottomPoint.x + 1/4;
  back.y11 = shoulderBottomPoint.y;


  const newShoulderLength = Math.sqrt(Math.pow(back.x15-back.x5, 2) + Math.pow(back.y14-back.y11, 2)) + shoulderDartWidth;

  const shoulderBottomDart = calculateCoordAlongLine({x: back.x5, y: back.y11},
                                                     {x: back.x15, y: back.y14},
                                                      (newShoulderLength - shoulderDartWidth)/2);
  const shoulderTopDart = calculateCoordAlongLine({x: back.x5, y: back.y11},
                                                  {x: back.x15, y: back.y14},
                                                  (newShoulderLength + shoulderDartWidth)/2);
  // ---
  back.x11 = shoulderTopDart.x;
  back.x8 = back.x11 + 1/4;

  back.y12 = shoulderBottomDart.y;
  back.y13 = shoulderTopDart.y;
  back.y9 = back.y13 - 3.5;

  back.x7 = shoulderBottomDart.x + 1/4;

  back.x4 = back.x3 - 1/8;

  back.x17 = calculateLineToLineIntersection({x: back.x16, y: back.y3},
                                             {x: back.x18, y: back.y1},
                                             {x: -100, y: back.y2},
                                             {x: 100, y: back.y2}).x;

  back.x1 = measurements.backHighHip + back.x17 + ease;

  return {coordinates: back, height: back.y14 - back.y0, width: back.x0 - back.x18};
}

export const calculateFrontCoordinates = (inputObject) => {
  let measurements = inputObject.measurements;
  measurements = measurementCorrections(inputObject);
  const waistDartWidth = calculateDartWidth(Math.abs(measurements.fullWaistWithEase - measurements.fullLowHipWithEase));
  const shoulderDartWidth = calculateShoulderDart(measurements);
  const sideDartWidth = calculateSideDart(measurements);
  const ease = 3/8;
  const shoulderDartMove = 1/4;
  const highHipFromBottom = measurements.lowHipDepth - measurements.highHipDepth;

  let front = {};
  front.x0 = 0;
  front.x1 = measurements.frontNeck + shoulderDartMove;
  front.x2 = (measurements.figureBreadth - waistDartWidth)/2;

  // ---Shoulder values
  const originalShoulderHeight = (measurements.frontNeck + 1/8)/2;
  const originalShoulderWidth = Math.sqrt(Math.pow(measurements.shoulder + shoulderDartWidth, 2) - Math.pow(originalShoulderHeight, 2));

  front.x5 = measurements.figureBreadth/2;
  front.x6 = (measurements.figureBreadth + waistDartWidth)/2;

  front.x10 = measurements.crossFront + shoulderDartWidth + 1/8;

  front.x13 = measurements.backWaist + waistDartWidth + ease;

  front.x18 = measurements.frontBust;
  front.x19 = measurements.backHighHip + ease;
  front.x20 = measurements.backLowHip + ease;

  front.y0 = 0;
  front.y1 = highHipFromBottom;
  front.y2 = measurements.lowHipDepth - 1/2;
  front.y3 = measurements.lowHipDepth;

  front.y5 = measurements.lowHipDepth + 3;

  front.y14 = measurements.lowHipDepth + measurements.frontLength - 3/8;

  front.y18 = measurements.lowHipDepth + measurements.frontLength + measurements.frontNeck + 1/8;

  front.x16 = front.x13;

  let sideHeight = Math.sqrt(Math.pow(measurements.sideLength + sideDartWidth, 2) - Math.pow(front.x18 - front.x13, 2));

  front.y9 = measurements.lowHipDepth + sideHeight;

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


export const getFrontQ1Params = (inputObject) => {

  const front = calculateFrontCoordinates(inputObject).coordinates;

  let pathString = "";

  pathString = absMovePen(pathString, {x: front.x6, y: -front.y2});

  pathString = addAbsLine(pathString, {x: front.x13, y: -front.y3});

  pathString = addAbsQuadraticBezierWithControlPoint(pathString, {x: front.x16, y: -front.y5}, {x: front.x18, y: -front.y9});

  pathString = addAbsQuadraticBezierWithControlPoint(pathString, {x: front.x10, y: -front.y9}, {x: front.x10, y: -front.y12});

  pathString = addAbsQuadraticBezierWithControlPoint(pathString, {x: front.x10+1/4, y: -front.y15+1/2}, {x: front.x14, y: -front.y15});


  pathString = addAbsLine(pathString, {x: front.x8, y: -front.y16});

  pathString = addAbsQuadraticBezierWithControlPoint(pathString, {x: front.x9, y: -front.y13}, {x: front.x5, y: -front.y7});

  pathString = addAbsLine(pathString, {x: front.x5, y: -front.y4});

  pathString = addAbsLine(pathString, {x: front.x6, y: -front.y3});

  pathString = addAbsLine(pathString, {x: front.x6, y: -front.y2});

  return {pathString: pathString}
}

export const getFrontQ2Params = (inputObject) => {

  const front = calculateFrontCoordinates(inputObject).coordinates;

  let pathString = "";

  pathString = absMovePen(pathString, {x: front.x6, y: -front.y2});

  pathString = addAbsLine(pathString, {x: front.x13, y: -front.y3});

  pathString = addAbsLine(pathString, {x: front.x19, y: -front.y1});

  pathString = addAbsLine(pathString, {x: front.x20, y: -front.y0});

  pathString = addAbsLine(pathString, {x: front.x5, y: -front.y0});

  pathString = addAbsLine(pathString, {x: front.x5, y: -front.y1});

  pathString = addAbsLine(pathString, {x: front.x6, y: -front.y2});

  return {pathString: pathString}
}

export const getFrontQ3Params = (inputObject) => {
  const front = calculateFrontCoordinates(inputObject).coordinates;

  let pathString = "";

  pathString = absMovePen(pathString, {x: front.x0, y: -front.y2});

  pathString = addAbsLine(pathString, {x: front.x2, y: -front.y2});

  pathString = addAbsLine(pathString, {x: front.x5, y: -front.y1});

  pathString = addAbsLine(pathString, {x: front.x5, y: -front.y0});

  pathString = addAbsLine(pathString, {x: front.x0, y: -front.y0});

  pathString = addAbsLine(pathString, {x: front.x0, y: -front.y2});

  return {pathString: pathString}
}

export const getFrontQ4Params = (inputObject) => {

  const front = calculateFrontCoordinates(inputObject).coordinates;

  let pathString = "";

  pathString = absMovePen(pathString, {x: front.x0, y: -front.y2});

  pathString = addAbsLine(pathString, {x: front.x2, y: -front.y2});

  pathString = addAbsLine(pathString, {x: front.x2, y: -front.y3});

  pathString = addAbsLine(pathString, {x: front.x5, y: -front.y4});

  pathString = addAbsLine(pathString, {x: front.x5, y: -front.y7});

  pathString = addAbsLine(pathString, {x: front.x3, y: -front.y17});

  pathString = addAbsLine(pathString, {x: front.x1, y: -front.y18});

  pathString = addAbsQuadraticBezierWithControlPoint(pathString, {x: front.x1, y: -front.y14}, {x: front.x0, y: -front.y14});

  pathString = addAbsLine(pathString, {x: front.x0, y: -front.y2});

  return {pathString: pathString}
}

export const getFrontInnerParams = (inputObject) => {

  const front = calculateFrontCoordinates(inputObject).coordinates;

  let pathString = "";

  // Bust line
  pathString = absMovePen(pathString, {x: front.x0, y: -front.y7});

  pathString = addAbsLine(pathString, {x: front.x15, y: -front.y7});

  return {pathString: pathString, bustYValue: -front.y7}
}

export const getFrontDartParams = (inputObject) => {

  const front = calculateFrontCoordinates(inputObject).coordinates;

  let pathString = "";

  // Side dart
  pathString = absMovePen(pathString, {x: front.x5, y: -front.y7});

  pathString = addAbsLine(pathString, {x: front.x17, y: -front.y8});

  pathString = absMovePen(pathString, {x: front.x5, y: -front.y7});

  pathString = addAbsLine(pathString, {x: front.x15, y: -front.y6});

  // Armhole dart
  pathString = absMovePen(pathString, {x: front.x5, y: -front.y7});

  pathString = addAbsLine(pathString, {x: front.x12, y: -front.y10});

  pathString = absMovePen(pathString, {x: front.x5, y: -front.y7});

  pathString = addAbsLine(pathString, {x: front.x11, y: -front.y11});

  return {pathString: pathString}
}

export const getBackQ1Params = (inputObject) => {
  const back = calculateBackCoordinates(inputObject).coordinates;

  let pathString = "";

  pathString = absMovePen(pathString, {x: -back.x14, y: -back.y3});

  pathString = addAbsLine(pathString, {x: -back.x16, y: -back.y3});

  pathString = addAbsLine(pathString, {x: -back.x16, y: -back.y4});

  pathString = addAbsLine(pathString, {x: -back.x18, y: -back.y10});

  debugger
  pathString = addAbsQuadraticBezierWithControlPoint(pathString, {x: -back.x15, y: -back.y10}, {x: -back.x15, y: -back.y14});

  pathString = addAbsLine(pathString, {x: -back.x8, y: -back.y13});

  pathString = addAbsLine(pathString, {x: -back.x11, y: -back.y9});

  pathString = addAbsLine(pathString, {x: -back.x11, y: -back.y6});

  pathString = addAbsLine(pathString, {x: -back.x14, y: -back.y3});


  return {pathString: pathString}
}

export const getBackQ2Params = (inputObject) => {

  const back = calculateBackCoordinates(inputObject).coordinates;

  let pathString = "";

  pathString = absMovePen(pathString, {x: -back.x14, y: -back.y3});

  pathString = addAbsLine(pathString, {x: -back.x16, y: -back.y3});

  pathString = addAbsLine(pathString, {x: -back.x18, y: -back.y1});

  pathString = addAbsLine(pathString, {x: -back.x18, y: -back.y0});

  pathString = addAbsLine(pathString, {x: -back.x12, y: -back.y0});

  pathString = addAbsLine(pathString, {x: -back.x12, y: -back.y2});

  pathString = addAbsLine(pathString, {x: -back.x14, y: -back.y3});

  return {pathString: pathString}
}

export const getBackQ3Params = (inputObject) => {

  const back = calculateBackCoordinates(inputObject).coordinates;

  let pathString = "";

  pathString = absMovePen(pathString, {x: -back.x3, y: -back.y4});

  pathString = addAbsLine(pathString, {x: -back.x9, y: -back.y3});

  pathString = addAbsLine(pathString, {x: -back.x12, y: -back.y2});

  pathString = addAbsLine(pathString, {x: -back.x12, y: -back.y0});

  pathString = addAbsLine(pathString, {x: -back.x0, y: -back.y0});

  pathString = addAbsLine(pathString, {x: -back.x1, y: -back.y2});

  pathString = addAbsLine(pathString, {x: -back.x3, y: -back.y4});

  return {pathString: pathString}
}

export const getBackQ4Params = (inputObject) => {

  const back = calculateBackCoordinates(inputObject).coordinates;

  let pathString = "";

  pathString = absMovePen(pathString, {x: -back.x3, y: -back.y4});

  pathString = addAbsLine(pathString, {x: -back.x9, y: -back.y3});

  pathString = addAbsLine(pathString, {x: -back.x11, y: -back.y6});


  pathString = addAbsLine(pathString, {x: -back.x11, y: -back.y9});




  pathString = addAbsLine(pathString, {x: -back.x7, y: -back.y12});

  pathString = addAbsLine(pathString, {x: -back.x5, y: -back.y11});

  pathString = addAbsQuadraticBezier(pathString, {x: -back.x5, y: -back.y11}, {x: -back.x6, y: -back.y8}, 1/2, 1/2, -1/2);

  pathString = addAbsQuadraticBezierWithControlPoint(pathString, {x: -back.x6, y: -back.y7}, {x: -back.x2, y: -back.y7});

  pathString = addAbsQuadraticBezierWithControlPoint(pathString, {x: -back.x4, y: -back.y5}, {x: -back.x3, y: -back.y4});

  return {pathString: pathString}
}

export const getBackInnerParams = (inputObject) => {

  const back = calculateBackCoordinates(inputObject).coordinates;

  let pathString = "";

  // Bust line
  pathString = absMovePen(pathString, {x: -back.x2, y: -back.y7});

  pathString = addAbsLine(pathString, {x: -back.x18, y: -back.y7});

  return {pathString: pathString}
}











