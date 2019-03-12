import armhole from 'images/measurements/armhole.png'
import frontLength from 'images/measurements/frontLength.png'
import side from 'images/measurements/side.png'
import backLength from 'images/measurements/backLength.png'
import highHip from 'images/measurements/highHip.png'
import skirtLength from 'images/measurements/skirtLength.png'
import bust from 'images/measurements/bust.png'
import highHipDepth from 'images/measurements/highHipDepth.png'
import underbust from 'images/measurements/underbust.png'
import crossBack from 'images/measurements/crossBack.png'
import lowHip from 'images/measurements/lowHip.png'
import crossFront from 'images/measurements/crossFront.png'
import lowHipDepth from 'images/measurements/lowHipDepth.png'
import waist from 'images/measurements/waist.png'
import figureBreadth from 'images/measurements/figureBreadth.png'
import neck from 'images/measurements/neck.png'
import figureLength from 'images/measurements/figureLength.png'
import shoulder from 'images/measurements/shoulder.png'




export const DISPLAY_FRACTION_TO_FILL = 0.9;
export const EASE = 3/8;
export const WAISTSHAPING = 3/8;
export const SHOULDERDARTMOVE = 1/4;





export const MEASUREMENTS = {
    neck: {
        friendlyName: 'Neck',
        measurement: 14.25,
        image: neck,
        helpText: 'The neck circumference. The tape measure goes to a point in the crevice between the collarbones.'},
    shoulder: {
        friendlyName: 'Shoulder',
        measurement: 4.75,
        image: shoulder,
        helpText: 'The length between the base of the neck and the point above the armpit crease.'},
    frontLength: {
        friendlyName: 'Front Length',
        measurement: 15.5,
        image: frontLength,
        helpText: 'The length between the point in the crevice between the collarbones and the waist ribbon.'},
    backLength: {
        friendlyName: 'Back Length',
        measurement: 17,
        image: backLength,
        helpText: 'The length between the point at the base of the neck and the waist ribbon. The base of the neck is the vertebrae that bumps up when you tilt your head forward. Stand up straight and look forward when taking this measurement.'},
    figureLength: {
        friendlyName: 'Figure Length',
        measurement: 8.5,
        image: figureLength,
        helpText: 'The distance between the point in the crevice between the collarbones and the center of the left breast.'},
    figureBreadth: {
        friendlyName: 'Figure Breadth',
        measurement: 8,
        image: figureBreadth,
        helpText: 'The length between the center of the breasts.'},
    crossFront: {
        friendlyName: 'Cross Front',
        measurement: 12.5,
        image: crossFront,
        helpText: 'The length between the top of your armpit creases. This is a flat measurement, don\'t wrap the measuring tape around your chest.'},
    crossBack: {
        friendlyName: 'Cross Back',
        measurement: 13.25,
        image: crossBack, 
        helpText: 'The length between the top of your armpit creases on your backside. Keep a natural, relaxed posture during this measurement.'},
    bust: {
        friendlyName: 'But',
        measurement: 36,
        image: bust,
        helpText: 'The circumference around the chest, with the tape measure passing through the center of the breasts.'},


    // NEED TO FIX THIS TO AN UNDERBUST MEASUREMENT HELPER!
    underBust: {
        friendlyName: 'Under Bust',
        measurement: 29,
        image: bust, 
        helpText: 'XXXXXXXX'},
    waist: {
        friendlyName: 'Waist',
        measurement: 26,
        image: waist,
        helpText: 'The circumference of the most narrow part of the torso, generally a quarter inch above the belly button. Keep a ribbon tied around your waist (tightly enough to stay in place but not uncomfortable). Later measurements will refer back to this. Make sure the tape measure is level all the way around.'},
    highHip: {
        friendlyName: 'High Hip',
        measurement: 34,
        image: highHip, 
        helpText: 'The circumference measured at the top of the hip curve, generally 3-4" below the waist ribbon. Make sure the tape measure is level all the way around.'},
    highHipDepth: {
        friendlyName: 'High Hip Depth',
        measurement: 4.5,
        image: highHipDepth,
        helpText: 'The length between the waist ribbon and the high hip. Keep the measuring tape flush against your side.'},
    lowHip: {
        friendlyName: 'Low Hip',
        measurement: 37,
        image: lowHip,
        helpText: 'The circumference measured at the fullest part of the bottom. Make sure the tape measure is level all the way around.'},
    lowHipDepth: {
        friendlyName: 'Low Hip Depth',
        measurement: 8.5, 
        image: lowHipDepth,
        helpText: 'The length between the waist ribbon and the low hip. Keep the measuring tape flush against your side.'},
    side: {
        friendlyName: 'Side',
        measurement: 9,
        image: side,
        helpText: 'The length from the armpit to the waist. Take a ruler (or any flat and long object), and tuck it under your armpit . Measure from the top of the ruler to the waist ribbon.'},
    armhole: {
        friendlyName: 'Armhole',
        measurement: 16.75,
        image: armhole,
        helpText: 'The circumference around the arm, going over to the top of the shoulder. Measure it with your arm down flat against your side.'},
};

export const a4 = {
    height: 11,
    width: 8.5,
};