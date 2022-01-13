import { v4 as uuidV4 } from "uuid";
import { ArrowDirection } from "../types/ArrowDirection";
import { ArrowSectionType } from "../types/ArrowSection";
import { ArrowSectionVM } from "../types/ArrowSectionVM";
import { ArrowType } from "../types/ArrowType";
import { Position } from "../types/Position";

export const normalizeAngle = (angle: number): number => {
  return ((angle % 360) + 360) % 360;
};

export const findDirection = (unnormalizedAngle: number): ArrowDirection => {
  const angle = normalizeAngle(unnormalizedAngle);

  const pointsUp = angle > 45 && angle < 135;
  const pointsDown = angle > 225 && angle < 315;
  const pointsLeft = angle >= 135 && angle <= 225;

  if (pointsUp) return ArrowDirection.Up;
  if (pointsDown) return ArrowDirection.Down;
  if (pointsLeft) return ArrowDirection.Left;
  return ArrowDirection.Right;
};

export const createArrowSections = (
  positions: Array<Position>,
): Array<ArrowSectionType> => {
  const sections: Array<ArrowSectionType> = [];

  if (positions.length < 2) {
    console.error("Too few positions: ", positions);
    return [];
  }

  for (let i = 0; i < positions.length - 1; i += 1) {
    sections.push([positions[i], positions[i + 1]]);
  }

  return sections;
};

/**
 * NOTE: Only works with up/down/left/right - not diagonal arrow sections.
 */
export const findArrowSectionDirection = (
  section: ArrowSectionType,
): ArrowDirection => {
  const [start, end] = section;

  const equalStartEnd = start.x === end.x && start.y === end.y;
  if (equalStartEnd) {
    console.error("Start and end arrow sections are equal:", start, end);
    return ArrowDirection.Up;
  }

  const goesUp = start.y > end.y;
  const goesDown = start.y < end.y;
  const goesLeft = start.x > end.x;

  let direction: ArrowDirection;
  if (goesUp) {
    direction = ArrowDirection.Up;
  } else if (goesDown) {
    direction = ArrowDirection.Down;
  } else if (goesLeft) {
    direction = ArrowDirection.Left;
  } else {
    direction = ArrowDirection.Right;
  }

  return direction;
};

export const getOppositeArrowDirection = (
  direction: ArrowDirection,
): ArrowDirection => {
  const { Up, Down, Left, Right } = ArrowDirection;

  const opposites = {
    [Up]: Down,
    [Down]: Up,
    [Left]: Right,
    [Right]: Left,
  } as const;

  return opposites[direction];
};

export const createSectionComponents = (
  sections: Array<ArrowSectionType>,
  type: ArrowType,
): Array<ArrowSectionVM> => {
  const sectionComponents: Array<ArrowSectionVM> = sections.map(
    (section, index) => {
      const [start, end] = section;

      const direction = findArrowSectionDirection(section);

      const isFirst = index === 0;
      const isLast = index === sections.length - 1;
      const isTheOnlySection = isFirst && isLast;

      let componentType: ArrowType = ArrowType.NonDirectional;
      let componentDirection: ArrowDirection = direction;

      if (isTheOnlySection) {
        componentType = type;
      } else {
        const isBiDirectional = type === ArrowType.BiDirectional;
        const isDirectional = type === ArrowType.Directional;

        const showStartArrowHead = isFirst && isBiDirectional;
        if (showStartArrowHead) {
          componentType = ArrowType.Directional;
          componentDirection = getOppositeArrowDirection(direction);
        }

        const showEndArrowHead = isLast && (isDirectional || isBiDirectional);
        if (showEndArrowHead) {
          componentType = ArrowType.Directional;
        }
      }

      return {
        id: uuidV4(),
        type: componentType,
        direction: componentDirection,
        start,
        end,
      };
    },
  );

  // console.log({sectionComponents});

  return sectionComponents;
};
