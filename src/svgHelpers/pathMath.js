import { absMovePen,
         drawAbsLine,
         drawAbsBez, } from 'svgHelpers/drawing'
import { createFormattedPath } from 'svgHelpers/elements'
         
import _ from 'lodash';
import { intersect, shape } from 'svg-intersections';


export const t0FromTQuadraticBezier = (P0, P1, P2, T) => {
  /*
  Given a point T along the quadratic bezier curve defined by control points P0,
  P1, and P2, return the value t0 of the parameter t such
  that the point (x(t), y(t)) (the parametric equations of the bezier curve) is
  T.
  B(t) = (x(t), y(t)) = T

  Equations for quadratic bezier curve are found here:
  https://en.wikipedia.org/wiki/B%C3%A9zier_curve#Quadratic_B.C3.A9zier_curves

  ARGS:
  - P0, P1, P2 are the control points (if we're saying end points are control
      points) of the bezier
      (P0: end point, P1: control point, P2: end point)
      Each point is represented {x: _, y: _}
  - T is a point on the curve
  RETURNS:
  - t0 is the value to plug into x(t) and y(t) to yield T
  */

  // Equation for quadratic bezier:
  // B(t) = ((1 - t)^2)*P0 + 2*(1 - t)*t*P1 + (t^2)*P2
  // Plug in T for B(t), group coefficients, and arrange on one side
  // 0 = (P0 - 2P1 + P2)*t^2 + (-2P0 + 2P1)*t + (P0 - T)
  // Having a = P0 - 2P1 + P2, b = -2P0 + 2P1, and c = P0 - T, plug into the
  // quadratic equation t = (-b +- sqrt(b^2 - 4ac)) / 2a

  const quadraticEquation = (a, b, c) => {
    // (-b +- sqrt(b^2 - 4ac)) / 2a
    // Returns a list of answers because there can be multiple solutions
    return [(-b + Math.sqrt((b**2 - 4*a*c))) / (2*a),
            (-b - Math.sqrt((b**2 - 4*a*c))) / (2*a)];
  };

  const quadraticEquationForBezier = component => {
    // component is 'x' or 'y'
    const a = P0[component] - 2*P1[component] + P2[component];
    const b = -2*P0[component] + 2*P1[component];
    const c = P0[component] - T[component];
    return a !== 0 ? quadraticEquation(a, b, c) : [-c / b];
  };

  const t0_x = quadraticEquationForBezier('x');
  const t0_y = quadraticEquationForBezier('y');

  // take the t which shows up in both the x and y
  let t;
  const MILLION = 1000 * 1000;
  _.each(t0_x, t_x => {
    const rounded_t_x = Math.round(t_x * MILLION) / MILLION;
    _.each(t0_y, t_y => {
      const rounded_t_y = Math.round(t_y * MILLION) / MILLION;
      if (rounded_t_x === rounded_t_y) {
        t = rounded_t_x;
      }
    });
  });
  return t;
};


export const subdivideQuadraticBezierFromt0 = (P0, P1, P2, t0) => {
  /*
  Split a quadratic bezier curve into 2 quadratic bezier curves

  Strategy based on subdivision algorithm (with n = 2) explained here:
  http://web.mit.edu/hyperbook/Patrikalakis-Maekawa-Cho/node13.html

  ARGS:
  - P0, P1, P2 are the control points (if we're saying end points are control
      points) of the original bezier
      (P0: end point, P1: control point, P2: end point)
      Each point is represented {x: _, y: _}
  - t0 is between 0 and 1, it is the value of the parameter t that, plugged
      into x(t) and y(t), gives you the point at which to split the curve
  RETURNS:
  - [[b, b, b], [b, b, b]] is two lists of control points, one list for each of
      the resulting curves, each list having (end point, control point, end
      point)
  */

  const multilyPoint = (A, factor) => ({x: A.x * factor, y: A.y * factor});
  const addPoints = (A, B) => ({x: A.x + B.x, y: A.y + B.y});

  // Using this recursive equation:
  // b_i_k(t0) = (1 - t0) * b_{i-1}_{k-1} + t0 * b_i_{k-1}
  // defined for k=1...n, i=k...n
  // We get the properties
  // - b_i_0 are the control points of the original curve
  // - b_n_n is the point at which to split the curve (t = t0)
  // - (b_0_0, b_1_1, ..., b_n_n) and (b_n_n, b_n_{n-1}, ..., b_n_0) are the
  //    control point lists of the new curves

  // bVals[i][k] = b_i_k
  const bVals = _.map(_.range(3), whatevs => _.map(_.range(3), null));

  // this performs one iteration of the recursive step, it is to be called on
  // values of i and k in such an order that the bVals necessary for calculating
  // the answer are already non-null
  const calculateBVal = (i, k) => {
    // Recursive equation: b_i_k(t0) = (1 - t0) * b_{i-1}_{k-1} + t0 * b_i_{k-1}
    bVals[i][k] = addPoints(
      multilyPoint(bVals[i-1][k-1], (1 - t0)),
      multilyPoint(bVals[i][k-1], t0)
    );
  };

  // initialize the control points of the original curve
  bVals[0][0] = P0;
  bVals[1][0] = P1;
  bVals[2][0] = P2;

  // fill bVals in order so that the necessary values are non-null
  calculateBVal(1, 1);
  calculateBVal(2, 1);
  calculateBVal(2, 2);

  return [
    [bVals[0][0], bVals[1][1], bVals[2][2]],
    [bVals[2][2], bVals[2][1], bVals[2][0]],
  ];
};


export const subdivideQuadraticBezierFromT = (P0, P1, P2, T) => {
  /*
  Same functionality as subdivideQuadraticBezierFromt0, but take a point T that
  lies on the curve, instead of a t0 between 0 and 1.
  */
  const t0 = t0FromTQuadraticBezier(P0, P1, P2, T);
  return subdivideQuadraticBezierFromt0(P0, P1, P2, t0);
};


export const quadraticBezierLength = (P0, P1, P2) => {
  const ax = P0.x - 2 * P1.x + P2.x;
  const ay = P0.y - 2 * P1.y + P2.y;
  const bx = 2 * P1.x - 2 * P0.x;
  const by = 2 * P1.y - 2 * P0.y;
  const A = 4 * (ax * ax + ay * ay);
  const B = 4 * (ax * bx + ay * by);
  const C = bx * bx + by * by;

  const Sabc = 2 * Math.sqrt(A+B+C);
  const A_2 = Math.sqrt(A);
  const A_32 = 2 * A * A_2;
  const C_2 = 2 * Math.sqrt(C);
  const BA = B / A_2;

  return (A_32 * Sabc + A_2 * B * (Sabc - C_2) + (4 * C * A - B * B) * Math.log((2 * A_2 + BA + Sabc) / (BA + C_2))) / (4 * A_32);
}

export const calculateLineToLineIntersection = (P0, P1, P2, P3) => {
    /*
    P0 and P1 define the first line, P2 and P3 define the second line
    */

    const path0 = createFormattedPath([
      ...absMovePen(P0),
      ...drawAbsLine(P1)
    ]);

    const path1 = createFormattedPath([
      ...absMovePen(P2),
      ...drawAbsLine(P3)
    ]);

    const intersectionPoint2D = intersect(
      shape("path", {d: path0}),
      shape("path", {d: path1})
    );

    const intersectionPoint = {x: intersectionPoint2D.points[0].x, y: intersectionPoint2D.points[0].y};
    return intersectionPoint
  }

export const calculateLineToBezierIntersection = (P0, P1, P2, P3, P4) => {
  /*
  P0 and P1 define the first line, P2, P3, and P4 define the second line
  */

  intersect.plugin(require('svg-intersections/lib/functions/bezier'));

  const path0 = createFormattedPath([
    ...absMovePen(P0),
    ...drawAbsLine(P1)
  ]);

  const path1 = createFormattedPath([
    ...absMovePen(P2),
    ...drawAbsBez(P3, P4)
  ]);

  const intersectionPoint2D = intersect(
    shape("path", {d: path0}),
    shape("path", {d: path1})
  );

  const intersectionPoint = {x: intersectionPoint2D.points[0].x, y: intersectionPoint2D.points[0].y};
  return intersectionPoint
}

export const calculateCoordAlongLine = (P0, P2, newLength) => {
  /* This function takes in a line that goes from P0 to P2, and returns the coordinates of point
  P1, the point along that line of length newLength
  P0: Start of initial line
  P1: End of initial line
  newLength: Length of the new line
  */
  const P1 = {}
  const originalHeight = P2.y -  P0.y;
  const originalWidth = P2.x - P0.x;
  const originalLength = Math.sqrt(Math.pow(originalHeight, 2) + Math.pow(originalWidth, 2))
  P1.x = P0.x + originalWidth * (newLength/originalLength);
  P1.y = P0.y + originalHeight * (newLength/originalLength);

  return P1;
}