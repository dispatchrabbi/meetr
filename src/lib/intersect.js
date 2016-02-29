/**
 * Normalize a rectangle.
 * That is, make sure that `top` is above `bottom` and `left` is left of `right`.
 *
 * @param rect {Object} The rectangle to normalize.
 * @return {Object} A normalized version of the rectangle.
 */
function normalizeRect(rect) {
  return {
    top: Math.min(rect.top, rect.bottom),
    bottom: Math.max(rect.top, rect.bottom),
    left: Math.min(rect.left, rect.right),
    right: Math.max(rect.left, rect.right),
  };
}

/**
 * Say whether two rectangles intersect.
 *
 * @param rect1 {Object} The first rectangle, with top, bottom, left, and right properties.
 * @param rect2 {Object} The second rectangle, with top, bottom, left, and right properties.
 * @return {Boolean} Whether they intersect.
 */
export const intersect = function intersect(rect1, rect2) {
  const _rect1 = normalizeRect(rect1);
  const _rect2 = normalizeRect(rect2);
  return !(
    _rect1.top > _rect2.bottom || // rect1 is totally below rect2
    _rect1.bottom < _rect2.top || // rect1 is totally above rect2
    _rect1.left > _rect2.right || // rect1 is totally to the right of rect2
    _rect1.right < _rect2.left    // rect1 is totally to the left of rect2
  );
};
