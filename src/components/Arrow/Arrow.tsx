import * as React from "react";
import { t } from "../../h5p/H5P.util";
import { ArrowType } from "../../types/ArrowType";
import { ContextMenuAction } from "../../types/ContextMenuAction";
import { Position } from "../../types/Position";
import { Size } from "../../types/Size";
import {
  createArrowSections,
  createSectionComponents,
} from "../../utils/arrow.utils";
import {
  calculateClosestValidPositionComponent,
  getPointerPositionFromEvent,
} from "../../utils/draggable.utils";
import { preventDefault } from "../../utils/event.utils";
import { positionIsFree } from "../../utils/grid.utils";
import { ArrowSection } from "../ArrowSection/ArrowSection";
import { ContextMenu, ContextMenuButtonType } from "../ContextMenu/ContextMenu";
import { Dialog } from "../Dialog/Dialog";
import styles from "./Arrow.module.scss";

export type ArrowProps = {
  id: string;
  positions: Array<Position>;
  type: ArrowType;
  cellSize: number;
  gapSize: number;
  selectedItemId: string | null;
  setSelectedItemId: (itemId: string | null) => void;
  gridSize: Size;
  updateArrowType: (type: ArrowType, item: string) => void;
  editItem: (id: string) => void;
  deleteItem: (id: string) => void;
  mouseOutsideGrid: boolean;
  isPreview: boolean;
};

export const Arrow: React.FC<ArrowProps> = ({
  id,
  positions: initialPositions,
  type,
  cellSize,
  gapSize,
  selectedItemId,
  setSelectedItemId,
  gridSize,
  updateArrowType,
  editItem,
  deleteItem,
  mouseOutsideGrid,
  isPreview,
}) => {
  const [positions, setPositions] = React.useState(initialPositions);
  const [isDragging, setIsDragging] = React.useState(false);
  const [pointerStartPosition, setPointerStartPosition] =
    React.useState<Position | null>();
  const [isResizing, setIsResizing] = React.useState(false);

  // const [previousContainerPosition, setPreviousContainerPosition] =
  //   React.useState<Position>({
  //     x: -1,
  //     y: -1,
  //   });
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] =
    React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const sections = createArrowSections(positions);
  const sectionComponents = React.useMemo(
    () => createSectionComponents(sections, type),
    [sections, type],
  );

  console.log({id})

  const containerSize: Size = React.useMemo(() => {
    const xPositions = positions.map(({ x }) => x);

    const minX = Math.min(...xPositions);
    const maxX = Math.max(...xPositions);

    const yPositions = positions.map(({ y }) => y);
    const minY = Math.min(...yPositions);
    const maxY = Math.max(...yPositions);

    const stepSize = cellSize + gapSize;

    return {
      width: Math.max(maxX - minX, stepSize),
      height: Math.max(maxY - minY, stepSize),
    };
  }, [cellSize, gapSize, positions]);

  const containerPosition: Position = React.useMemo(() => {
    const xPositions = positions.map(({ x }) => x);

    const minX = Math.min(...xPositions);

    const yPositions = positions.map(({ y }) => y);
    const minY = Math.min(...yPositions);

    return {
      x: minX,
      y: minY,
    };
  }, [positions]);

  const getClosestValidXPosition = React.useCallback(
    (pointerX: number) =>
      calculateClosestValidPositionComponent(
        pointerX,
        gapSize,
        cellSize,
        gridSize.width,
        containerSize.width,
      ),
    [containerSize.width, gapSize, cellSize, gridSize.width],
  );

  const getClosestValidYPosition = React.useCallback(
    (pointerY: number) =>
      calculateClosestValidPositionComponent(
        pointerY,
        gapSize,
        cellSize,
        gridSize.height,
        containerSize.height,
      ),
    [containerSize, gapSize, cellSize, gridSize.height],
  );

  // const checkIfPositionIsFree = React.useCallback(
  //   (newPosition: Position): boolean => {
  //     return positionIsFree(
  //       newPosition,
  //       id,
  //       { width, height },
  //       gridSize,
  //       gapSize,
  //       cellSize,
  //       occupiedCells,
  //     );
  //   },
  //   [gapSize, cellSize, gridSize, height, id, occupiedCells, width],
  // );

  const startDrag = React.useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (!containerPosition) {
        console.error("Arrow is not mounted yet");
        return;
      }

      setIsDragging(true);
      setSelectedItemId(id);

      const { x, y } = getPointerPositionFromEvent(event);

      setPointerStartPosition({
        x: x - containerPosition.x,
        y: y - containerPosition.y,
      });
    },
    [setSelectedItemId, id, containerPosition],
  );

  const stopDrag = React.useCallback(() => {
    const closestValidXPosition = getClosestValidXPosition(containerPosition.x);
    const closestValidYPosition = getClosestValidYPosition(containerPosition.y);

    if (closestValidXPosition != null && closestValidYPosition != null) {
      const newPosition = {
        x: closestValidXPosition,
        y: closestValidYPosition,
      };

      const dX = newPosition.x - containerPosition.x;
      const dY = newPosition.y - containerPosition.y;

      // if (checkIfPositionIsFree(newPosition)) {
      const newPositions = positions.map(({ x, y }) => ({
        x: x + dX - gapSize / 2,
        y: y + dY - gapSize / 2,
      }));
      setPositions(newPositions);
      // setContainerPosition(newPosition);
      // updatePosition(newPosition);
      // } else {
      //   setPositions(previousPosition);
      // }
    }

    setPointerStartPosition(null);
    setIsDragging(false);
  }, [
    containerPosition.x,
    containerPosition.y,
    gapSize,
    getClosestValidXPosition,
    getClosestValidYPosition,
    positions,
  ]);

  const isRightSideOfGrid = React.useMemo(
    () => containerPosition.x > gridSize.width / 2,
    [gridSize.width, containerPosition.x],
  );

  const confirmDeletion = React.useCallback(() => {
    deleteItem(id);
    setShowDeleteConfirmationDialog(false);
  }, [deleteItem, id]);

  const denyDeletion = React.useCallback(() => {
    setShowDeleteConfirmationDialog(false);
  }, []);

  const contextMenuActions: Array<ContextMenuAction> = React.useMemo(() => {
    const editAction: ContextMenuAction = {
      icon: ContextMenuButtonType.Edit,
      label: t("context-menu_edit"),
      onClick: () => editItem(id),
    };

    const changeToDirectionalArrowAction: ContextMenuAction = {
      icon: ContextMenuButtonType.ArrowDirectional,
      label: t("context-menu_arrow-directional"),
      onClick: () => updateArrowType(ArrowType.Directional, id),
    };

    const changeToBiDirectionalArrowAction: ContextMenuAction = {
      icon: ContextMenuButtonType.ArrowBiDirectional,
      label: t("context-menu_arrow-bi-directional"),
      onClick: () => updateArrowType(ArrowType.BiDirectional, id),
    };

    const changeToNonDirectionalArrowAction: ContextMenuAction = {
      icon: ContextMenuButtonType.ArrowNonDirectional,
      label: t("context-menu_arrow-non-directional"),
      onClick: () => updateArrowType(ArrowType.NonDirectional, id),
    };

    const deleteAction: ContextMenuAction = {
      icon: ContextMenuButtonType.Delete,
      label: t("context-menu_delete"),
      onClick: () => setShowDeleteConfirmationDialog(true),
    };

    return [
      editAction,
      changeToDirectionalArrowAction,
      changeToBiDirectionalArrowAction,
      changeToNonDirectionalArrowAction,
      deleteAction,
    ];
  }, [editItem, id, updateArrowType]);

  const drag = React.useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (showDeleteConfirmationDialog) {
        return;
      }

      if (!isDragging || !pointerStartPosition) {
        return;
      }

      if (mouseOutsideGrid) {
        stopDrag();
        return;
      }

      const { x: pointerX, y: pointerY } = getPointerPositionFromEvent(event);

      const newPosition = {
        x: pointerX - pointerStartPosition.x,
        y: pointerY - pointerStartPosition.y,
      };

      const dX = newPosition.x - containerPosition.x;
      const dY = newPosition.y - containerPosition.y;

      const newPositions = positions.map(({ x, y }) => ({
        x: x + dX,
        y: y + dY,
      }));
      setPositions(newPositions);
    },
    [
      showDeleteConfirmationDialog,
      isDragging,
      pointerStartPosition,
      mouseOutsideGrid,
      containerPosition.x,
      containerPosition.y,
      positions,
      stopDrag,
    ],
  );

  React.useEffect(() => {
    /* 
      These are tied to `window`, because the
      cursor might not be on top of the element
      when the drag action ends.
    */
    window.addEventListener("mousemove", drag);
    window.addEventListener("touchmove", drag);

    return () => {
      window.removeEventListener("mousemove", drag);
      window.removeEventListener("touchmove", drag);
    };
  }, [drag]);

  const showContextMenu = selectedItemId === id;
  console.log({showContextMenu, selectedItemId, id})

  return (
    <div
      role="button"
      tabIndex={0}
      /* Use draggable="true" to benefit from screen readers' understanding of the property */
      draggable="true"
      /* Prevent default because we implement drag ourselves */
      onDragStart={preventDefault}
      aria-grabbed={isDragging}
      // className={`${styles.draggable} ${isPreview && styles.preview} draggable`}
      onMouseDown={startDrag}
      onTouchStart={startDrag}
      onMouseUp={stopDrag}
      onTouchEnd={stopDrag}
      className={`${styles.draggable} draggable`}
      style={{
        zIndex: isDragging || showContextMenu ? 2 : undefined,
        pointerEvents: isPreview || isResizing ? "none" : undefined,
      }}
    >
      <div ref={containerRef} className={styles.inner} tabIndex={-1}>
        {sectionComponents.map(
          ({ id: sectionId, type: sectionType, direction, start, end }) => (
            <ArrowSection
              key={sectionId}
              type={sectionType}
              direction={direction}
              start={start}
              end={end}
              cellSize={cellSize}
              gapSize={gapSize}
            />
          ),
        )}
      </div>
      <div
        className={styles.contextMenuContainer}
        style={{
          width: containerSize.width,
          height: containerSize.height,
          left: containerPosition.x,
          top: containerPosition.y,
          pointerEvents: showContextMenu ? undefined : "none",
        }}
      >
        <ContextMenu
          actions={contextMenuActions}
          show={showContextMenu}
          turnLeft={isRightSideOfGrid}
        />
      </div>
      <Dialog
        isOpen={showDeleteConfirmationDialog}
        title={t("draggable_delete-arrow-confirmation")}
        onOpenChange={setShowDeleteConfirmationDialog}
      >
        <div className={styles.deleteConfirmationButtons}>
          <button
            type="button"
            className={styles.deleteConfirmationPositive}
            onClick={confirmDeletion}
          >
            {t("draggable_delete-positive")}
          </button>
          <button
            type="button"
            className={styles.deleteConfirmationNegative}
            onClick={denyDeletion}
          >
            {t("draggable_delete-negative")}
          </button>
        </div>
      </Dialog>
    </div>
  );
};
