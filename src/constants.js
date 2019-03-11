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
import upperBust from 'images/measurements/upperBust.png'
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
    neck: {measurement: 14.25, image: neck, text: "Im ready!!!!!"},
    shoulder: {measurement: 4.75, image: shoulder, text: "Im ready!!!!!"},
    frontLength: {measurement: 15.5, image: frontLength, text: "Im ready!!!!!"},
    backLength: {measurement: 17, image: backLength, text: "Im ready!!!!!"},
    figureLength: {measurement: 8.5, image: figureLength, text: "Im ready!!!!!"},
    figureBreadth: {measurement: 8, image: figureBreadth, text: "Im ready!!!!!"},
    crossFront: {measurement: 12.5, image: crossFront, text: "Im ready!!!!!"},
    crossBack: {measurement: 13.25, image: crossBack, text: "Im ready!!!!!"},
    bust: {measurement: 36, image: bust, text: "Im ready!!!!!"},


    // NEED TO FIX THIS TO AN UNDERBUST MEASUREMENT HELPER!
    underBust: {measurement: 29, image: bust, text: "Im ready!!!!!"},
    waist: {measurement: 26, image: waist, text: "Im ready!!!!!"},
    highHip: {measurement: 34, image: highHip, text: "Im ready!!!!!"},
    highHipDepth: {measurement: 4.5, image: highHipDepth, text: "Im ready!!!!!"},
    lowHip: {measurement: 37, image: lowHip, text: "Im ready!!!!!"},
    lowHipDepth: {measurement: 8.5, image: lowHipDepth, text: "Im ready!!!!!"},
    side: {measurement: 9, image: side, text: "Im ready!!!!!"},
    armhole: {measurement: 16.75, image: armhole, text: "Im ready!!!!!"},
};

export const a4 = {
    height: 11,
    width: 8.5,
};