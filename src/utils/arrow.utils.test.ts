import { ArrowDirection } from "../types/ArrowDirection";
import { ArrowSectionType } from "../types/ArrowSection";
import { ArrowSectionVM } from "../types/ArrowSectionVM";
import { ArrowType } from "../types/ArrowType";
import { Position } from "../types/Position";
import {
  createArrowSections,
  createSectionComponents,
  findArrowSectionDirection,
  findDirection,
  getOppositeArrowDirection,
  normalizeAngle,
} from "./arrow.utils";

describe("Arrow utils", () => {
  describe(findDirection.name, () => {
    it("should return the closest direction of the given angle: top", () => {
      expect(findDirection(45.01)).toBe(ArrowDirection.Up);
      expect(findDirection(90)).toBe(ArrowDirection.Up);
      expect(findDirection(134.9)).toBe(ArrowDirection.Up);
    });

    it("should return the closest direction of the given angle: right", () => {
      expect(findDirection(315)).toBe(ArrowDirection.Right);
      expect(findDirection(0)).toBe(ArrowDirection.Right);
      expect(findDirection(45)).toBe(ArrowDirection.Right);
    });

    it("should return the closest direction of the given angle: down", () => {
      expect(findDirection(314.9)).toBe(ArrowDirection.Down);
      expect(findDirection(270)).toBe(ArrowDirection.Down);
      expect(findDirection(225.1)).toBe(ArrowDirection.Down);
    });

    it("should return the closest direction of the given angle: left", () => {
      expect(findDirection(135)).toBe(ArrowDirection.Left);
      expect(findDirection(180)).toBe(ArrowDirection.Left);
      expect(findDirection(225)).toBe(ArrowDirection.Left);
    });

    it("should handle negative values", () => {
      expect(findDirection(-90)).toBe(ArrowDirection.Down);
      expect(findDirection(-450)).toBe(ArrowDirection.Down);
    });

    it("should handle values larger than 360", () => {
      expect(findDirection(450)).toBe(ArrowDirection.Up);
    });
  });

  describe(normalizeAngle.name, () => {
    it("should normalize the angle if it's larger than 360", () => {
      const angle = 450;

      const expected = 90;
      const actual = normalizeAngle(angle);

      expect(actual).toBe(expected);
    });

    it("should normalize the angle if it's smaller than 360 and larger than 0", () => {
      const angle = 90;

      const expected = 90;
      const actual = normalizeAngle(angle);

      expect(actual).toBe(expected);
    });

    it("should normalize the angle if it's smaller than 0", () => {
      const angle = -450;

      const expected = 270;
      const actual = normalizeAngle(angle);

      expect(actual).toBe(expected);
    });
  });

  describe(findArrowSectionDirection.name, () => {
    it("should return the direction of the arrow section: Up", () => {
      const section: ArrowSectionType = [
        { x: 0, y: 1 },
        { x: 0, y: 0 },
      ];

      const expected: ArrowDirection = ArrowDirection.Up;
      const actual = findArrowSectionDirection(section);

      expect(actual).toBe(expected);
    });

    it("should return the direction of the arrow section: Down", () => {
      const section: ArrowSectionType = [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
      ];

      const expected: ArrowDirection = ArrowDirection.Down;
      const actual = findArrowSectionDirection(section);

      expect(actual).toBe(expected);
    });

    it("should return the direction of the arrow section: Left", () => {
      const section: ArrowSectionType = [
        { x: 1, y: 0 },
        { x: 0, y: 0 },
      ];

      const expected: ArrowDirection = ArrowDirection.Left;
      const actual = findArrowSectionDirection(section);

      expect(actual).toBe(expected);
    });

    it("should return the direction of the arrow section: Right", () => {
      const section: ArrowSectionType = [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
      ];

      const expected: ArrowDirection = ArrowDirection.Right;
      const actual = findArrowSectionDirection(section);

      expect(actual).toBe(expected);
    });

    it("should return Up as fallback if the two section points are equal", () => {
      const section: ArrowSectionType = [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ];

      const expected: ArrowDirection = ArrowDirection.Up;
      const actual = findArrowSectionDirection(section);

      expect(actual).toBe(expected);
    });
  });

  describe(getOppositeArrowDirection.name, () => {
    it("should return the opposite of Up", () => {
      const direction = ArrowDirection.Up;

      const expected = ArrowDirection.Down;
      const actual = getOppositeArrowDirection(direction);

      expect(actual).toBe(expected);
    });

    it("should return the opposite of Down", () => {
      const direction = ArrowDirection.Down;

      const expected = ArrowDirection.Up;
      const actual = getOppositeArrowDirection(direction);

      expect(actual).toBe(expected);
    });

    it("should return the opposite of Left", () => {
      const direction = ArrowDirection.Left;

      const expected = ArrowDirection.Right;
      const actual = getOppositeArrowDirection(direction);

      expect(actual).toBe(expected);
    });

    it("should return the opposite of Rigt", () => {
      const direction = ArrowDirection.Right;

      const expected = ArrowDirection.Left;
      const actual = getOppositeArrowDirection(direction);

      expect(actual).toBe(expected);
    });
  });

  describe(createSectionComponents.name, () => {
    /**
     * ↑
     */
    it("should return a shadow model of a directional arrow with one section going upwards", () => {
      const sections: Array<ArrowSectionType> = [
        [
          { x: 0, y: 1 },
          { x: 0, y: 0 },
        ],
      ];
      const type = ArrowType.Directional;

      const expected: Array<ArrowSectionVM> = [
        {
          id: "",
          direction: ArrowDirection.Up,
          type: ArrowType.Directional,
          start: { x: 0, y: 1 },
          end: { x: 0, y: 0 },
        },
      ];
      const actual = createSectionComponents(sections, type);

      expect(actual).toEqual(expected);
    });

    /**
     * ↓
     */
    it("should return a shadow model of a directional arrow with one section going downwards", () => {
      const sections: Array<ArrowSectionType> = [
        [
          { x: 0, y: 0 },
          { x: 0, y: 1 },
        ],
      ];
      const type = ArrowType.Directional;

      const expected: Array<ArrowSectionVM> = [
        {
          id: "",
          direction: ArrowDirection.Down,
          type: ArrowType.Directional,
          start: { x: 0, y: 0 },
          end: { x: 0, y: 1 },
        },
      ];
      const actual = createSectionComponents(sections, type);

      expect(actual).toEqual(expected);
    });

    /**
     * ←
     */
    it("should return a shadow model of a directional arrow with one section going to the left", () => {
      const sections: Array<ArrowSectionType> = [
        [
          { x: 1, y: 0 },
          { x: 0, y: 0 },
        ],
      ];
      const type = ArrowType.Directional;

      const expected: Array<ArrowSectionVM> = [
        {
          id: "",
          direction: ArrowDirection.Left,
          type: ArrowType.Directional,
          start: { x: 1, y: 0 },
          end: { x: 0, y: 0 },
        },
      ];
      const actual = createSectionComponents(sections, type);

      expect(actual).toEqual(expected);
    });

    /**
     * →
     */
    it("should return a shadow model of a directional arrow with one section going to the right", () => {
      const sections: Array<ArrowSectionType> = [
        [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
        ],
      ];
      const type = ArrowType.Directional;

      const expected: Array<ArrowSectionVM> = [
        {
          id: "",
          direction: ArrowDirection.Right,
          type: ArrowType.Directional,
          start: { x: 0, y: 0 },
          end: { x: 1, y: 0 },
        },
      ];
      const actual = createSectionComponents(sections, type);

      expect(actual).toEqual(expected);
    });

    /**
     * ↕
     */
    it("should return a shadow model of a vertical bi-directional arrow with one section", () => {
      const sections: Array<ArrowSectionType> = [
        [
          { x: 0, y: 0 },
          { x: 0, y: 1 },
        ],
      ];
      const type = ArrowType.BiDirectional;

      const expected: Array<ArrowSectionVM> = [
        {
          id: "",
          direction: ArrowDirection.Down,
          type: ArrowType.BiDirectional,
          start: { x: 0, y: 0 },
          end: { x: 0, y: 1 },
        },
      ];
      const actual = createSectionComponents(sections, type);

      expect(actual).toEqual(expected);
    });

    /**
     * ↔
     */
    it("should return a shadow model of a horizontal bi-directional arrow with one section", () => {
      const sections: Array<ArrowSectionType> = [
        [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
        ],
      ];
      const type = ArrowType.BiDirectional;

      const expected: Array<ArrowSectionVM> = [
        {
          id: "",
          direction: ArrowDirection.Right,
          type: ArrowType.BiDirectional,
          start: { x: 0, y: 0 },
          end: { x: 1, y: 0 },
        },
      ];
      const actual = createSectionComponents(sections, type);

      expect(actual).toEqual(expected);
    });

    /**
     * |
     */
    it("should return a shadow model of a vertical non-directional arrow with one section", () => {
      const sections: Array<ArrowSectionType> = [
        [
          { x: 0, y: 0 },
          { x: 0, y: 1 },
        ],
      ];
      const type = ArrowType.NonDirectional;

      const expected: Array<ArrowSectionVM> = [
        {
          id: "",
          direction: ArrowDirection.Down,
          type: ArrowType.NonDirectional,
          start: { x: 0, y: 0 },
          end: { x: 0, y: 1 },
        },
      ];
      const actual = createSectionComponents(sections, type);

      expect(actual).toEqual(expected);
    });

    /**
     * —
     */
    it("should return a shadow model of a horizontal non-directional arrow with one section", () => {
      const sections: Array<ArrowSectionType> = [
        [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
        ],
      ];
      const type = ArrowType.NonDirectional;

      const expected: Array<ArrowSectionVM> = [
        {
          id: "",
          direction: ArrowDirection.Right,
          type: ArrowType.NonDirectional,
          start: { x: 0, y: 0 },
          end: { x: 1, y: 0 },
        },
      ];
      const actual = createSectionComponents(sections, type);

      expect(actual).toEqual(expected);
    });

    it("should return a shadow model of an arrow with two sections, bi-directional", () => {
      const sections: Array<ArrowSectionType> = [
        [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
        ],

        [
          { x: 1, y: 0 },
          { x: 1, y: 1 },
        ],
      ];
      const type = ArrowType.BiDirectional;

      const expected: Array<ArrowSectionVM> = [
        {
          id: "",
          direction: ArrowDirection.Left,
          type: ArrowType.Directional,
          start: { x: 0, y: 0 },
          end: { x: 1, y: 0 },
        },
        {
          id: "",
          direction: ArrowDirection.Down,
          type: ArrowType.Directional,
          start: { x: 1, y: 0 },
          end: { x: 1, y: 1 },
        },
      ];
      const actual = createSectionComponents(sections, type);

      expect(actual).toEqual(expected);
    });

    it("should return a shadow model of an arrow with two sections, directional", () => {
      const sections: Array<ArrowSectionType> = [
        [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
        ],

        [
          { x: 1, y: 0 },
          { x: 1, y: 1 },
        ],
      ];
      const type = ArrowType.Directional;

      const expected: Array<ArrowSectionVM> = [
        {
          id: "",
          direction: ArrowDirection.Right,
          type: ArrowType.NonDirectional,
          start: { x: 0, y: 0 },
          end: { x: 1, y: 0 },
        },
        {
          id: "",
          direction: ArrowDirection.Down,
          type: ArrowType.Directional,
          start: { x: 1, y: 0 },
          end: { x: 1, y: 1 },
        },
      ];
      const actual = createSectionComponents(sections, type);

      expect(actual).toEqual(expected);
    });

    it("should return a shadow model of an arrow with two sections, non-directional", () => {
      const sections: Array<ArrowSectionType> = [
        [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
        ],

        [
          { x: 1, y: 0 },
          { x: 1, y: 1 },
        ],
      ];
      const type = ArrowType.NonDirectional;

      const expected: Array<ArrowSectionVM> = [
        {
          id: "",
          direction: ArrowDirection.Right,
          type: ArrowType.NonDirectional,
          start: { x: 0, y: 0 },
          end: { x: 1, y: 0 },
        },
        {
          id: "",
          direction: ArrowDirection.Down,
          type: ArrowType.NonDirectional,
          start: { x: 1, y: 0 },
          end: { x: 1, y: 1 },
        },
      ];
      const actual = createSectionComponents(sections, type);

      expect(actual).toEqual(expected);
    });
  });

  describe(createArrowSections.name, () => {
    it("should create a list of array sections", () => {
      const positions: Array<Position> = [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
      ];

      const expected: Array<Array<Position>> = [
        [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
        ],
      ];
      const actual = createArrowSections(positions);

      expect(actual).toEqual(expected);
    });

    it("should return a list with the number of positions - 1 elements", () => {
      const positions: Array<Position> = [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
        { x: 4, y: 4 },
        { x: 5, y: 5 },
      ];

      const expected: number = positions.length - 1;
      const actual = createArrowSections(positions).length;

      expect(actual).toBe(expected);
    });

    it("should return an empty array if the given list contains zero elements", () => {
      const positions: Array<Position> = [];

      const expected: Array<Array<Position>> = [];
      const actual = createArrowSections(positions);

      expect(actual).toEqual(expected);
    });

    it("should return an empty array if the given list contains only one element", () => {
      const positions: Array<Position> = [{ x: 0, y: 0 }];

      const expected: Array<Array<Position>> = [];
      const actual = createArrowSections(positions);

      expect(actual).toEqual(expected);
    });
  });
});
