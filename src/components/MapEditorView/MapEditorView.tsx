import * as React from "react";
import { useCallback, useState } from "react";
import { t } from "../../H5P/H5P.util";
import { ArrowItemType } from "../../types/ArrowItemType";
import { ArrowType } from "../../types/ArrowType";
import { ContextMenuAction } from "../../types/ContextMenuAction";
import { H5PFieldGroup } from "../../types/H5P/H5PField";
import { H5PForm } from "../../types/H5P/H5PForm";
import { Params } from "../../types/H5P/Params";
import { TopicMapItemType } from "../../types/TopicMapItemType";
import { updateArrowType } from "../../utils/arrow.utils";
import { findConnectedArrows, findItem } from "../../utils/grid.utils";
import { getBackgroundImageField } from "../../utils/H5P/form.utils";
import { ArrowItemForm } from "../ArrowItemForm/ArrowItemForm";
import { ContextMenu, ContextMenuButtonType } from "../ContextMenu/ContextMenu";
import { Dialog } from "../Dialog/Dialog";
import { Grid } from "../Grid/Grid";
import { Toolbar, ToolbarButtonType } from "../Toolbar/Toolbar";
import { TopicMapItemForm } from "../TopicMapItemForm/TopicMapItemForm";
import styles from "./MapEditorView.module.scss";

export type MapEditorViewProps = {
  gapSize?: number;
  numberOfColumns?: number;
  numberOfRows?: number;
  params: Params;
  parent: H5PForm;
  semantics: H5PFieldGroup;
  setParams: (updatedParams: Partial<Params>) => void;
};

export const MapEditorView: React.FC<MapEditorViewProps> = ({
  gapSize,
  numberOfColumns,
  numberOfRows,
  params,
  parent,
  semantics,
  setParams,
}) => {
  const columns = numberOfColumns ?? 20;
  const rows = numberOfRows ?? 12;
  const defaultGapSize = 8;

  const [activeTool, setActiveTool] = useState<ToolbarButtonType | null>(null);
  const [gridItems, setGridItems] = useState(params.topicMapItems ?? []);
  const [arrowItems, setArrowItems] = useState(params.arrowItems ?? []);
  const [editedItem, setEditedItem] = useState<string | null>(null);
  const [editedArrow, setEditedArrow] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] =
    useState(false);

  const setActive = (newValue: ToolbarButtonType | null): void => {
    setActiveTool(newValue);
  };

  const updateItems = React.useCallback(
    (items: Array<TopicMapItemType>) => {
      setParams({ topicMapItems: items });
      setGridItems(items);
    },
    [setParams],
  );

  const updateArrows = React.useCallback(
    (items: Array<ArrowItemType>) => {
      setParams({ arrowItems: items });
      setArrowItems(items);
    },
    [setParams],
  );

  const deleteArrow = useCallback(
    (id: string | null): void => {
      if (!id) {
        return;
      }

      updateArrows(arrowItems.filter(item => item.id !== id));
    },
    [arrowItems, updateArrows],
  );

  const deleteGridItem = useCallback(
    (id: string | null): void => {
      if (!id) {
        return;
      }

      updateItems(gridItems.filter(item => item.id !== id));

      const connectedArrows = findConnectedArrows(id, arrowItems);
      connectedArrows.forEach(item => deleteArrow(item.id));
    },
    [arrowItems, deleteArrow, gridItems, updateItems],
  );

  const deleteItem = useCallback(
    (id: string | null): void => {
      if (!id) {
        return;
      }

      const isTopicMapItem = !!findItem(id, gridItems);
      if (isTopicMapItem) {
        deleteGridItem(id);
      } else {
        deleteArrow(id);
      }

      setSelectedItem(null);
    },
    [deleteArrow, deleteGridItem, gridItems],
  );

  const setArrowType = useCallback(
    (type: ArrowType, id: string) => {
      const updatedItem = arrowItems.find(item => item.id === id);

      if (!updatedItem) {
        throw new Error(`Updated arrow with id "${id}" does not exist`);
      }

      const newItems = updateArrowType(
        arrowItems,
        updatedItem,
        type,
        gridItems,
      );

      updateArrows(newItems);
    },
    [arrowItems, gridItems, updateArrows],
  );

  const confirmDeletion = useCallback(() => {
    deleteItem(selectedItem);
    setShowDeleteConfirmationDialog(false);
  }, [deleteItem, selectedItem]);

  const denyDeletion = useCallback(() => {
    setShowDeleteConfirmationDialog(false);
  }, []);

  const contextMenuActions: Array<ContextMenuAction> | null =
    React.useMemo(() => {
      if (!selectedItem) {
        return null;
      }

      const isTopicMapItem = !!findItem(selectedItem, gridItems);

      const editAction: ContextMenuAction = {
        icon: ContextMenuButtonType.Edit,
        label: t("context-menu_edit"),
        onClick: () =>
          isTopicMapItem
            ? setEditedItem(selectedItem)
            : setEditedArrow(selectedItem),
      };

      const deleteAction: ContextMenuAction = {
        icon: ContextMenuButtonType.Delete,
        label: t("context-menu_delete"),
        onClick: () => setShowDeleteConfirmationDialog(true),
      };

      let actions: Array<ContextMenuAction>;
      if (!isTopicMapItem) {
        const changeToDirectionalArrowAction: ContextMenuAction = {
          icon: ContextMenuButtonType.ArrowDirectional,
          label: t("context-menu_arrow-directional"),
          onClick: () => setArrowType(ArrowType.Directional, selectedItem),
        };

        const changeToBiDirectionalArrowAction: ContextMenuAction = {
          icon: ContextMenuButtonType.ArrowBiDirectional,
          label: t("context-menu_arrow-bi-directional"),
          onClick: () => setArrowType(ArrowType.BiDirectional, selectedItem),
        };

        const changeToNonDirectionalArrowAction: ContextMenuAction = {
          icon: ContextMenuButtonType.ArrowNonDirectional,
          label: t("context-menu_arrow-non-directional"),
          onClick: () => setArrowType(ArrowType.NonDirectional, selectedItem),
        };

        actions = [
          editAction,
          changeToDirectionalArrowAction,
          changeToBiDirectionalArrowAction,
          changeToNonDirectionalArrowAction,
          deleteAction,
        ];
      } else {
        actions = [editAction, deleteAction];
      }

      return actions;
    }, [gridItems, selectedItem, setArrowType]);

  const topicMapItemFormDialogTitle = t("map-editor-view_item-dialog-title");
  const backgroundImageField = React.useMemo(() => {
    const bgImgField = getBackgroundImageField(semantics);

    if (!bgImgField) {
      throw new Error(
        "Background image field not found. Was it removed from semantics, or did its name change?",
      );
    }

    return bgImgField;
  }, [semantics]);

  return (
    <div className={styles.mapEditorView}>
      <Toolbar
        setActiveTool={setActive}
        activeTool={activeTool}
        isArrowButtonDisabled={gridItems.length < 2}
        setParams={setParams}
        params={params}
        parent={parent}
        backgroundImageField={backgroundImageField}
      >
        {contextMenuActions ? (
          <>
            <ContextMenu actions={contextMenuActions} />
            <Dialog
              isOpen={showDeleteConfirmationDialog}
              title={t("draggable_delete-confirmation")}
              onOpenChange={setShowDeleteConfirmationDialog}
              size="medium"
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
          </>
        ) : null}
      </Toolbar>
      <div className={styles.gridBorder}>
        <Grid
          numberOfColumns={columns}
          numberOfRows={rows}
          initialItems={gridItems}
          updateItems={updateItems}
          arrowItems={arrowItems}
          updateArrowItems={updateArrows}
          gapSize={gapSize ?? defaultGapSize}
          setActiveTool={setActive}
          activeTool={activeTool}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          setArrowItems={setArrowItems}
          setItems={setGridItems}
        />
        <Dialog
          isOpen={Boolean(semantics && (editedItem || editedArrow))}
          title={topicMapItemFormDialogTitle}
          size="large"
          onOpenChange={isOpen => {
            if (!isOpen) {
              setEditedItem(null);
            }
          }}
        >
          {editedItem && (
            <TopicMapItemForm
              itemId={editedItem}
              semantics={semantics}
              params={params}
              parent={parent}
              onSave={newParams => {
                updateItems(newParams.topicMapItems ?? []);
                setEditedItem(null);
              }}
            />
          )}

          {editedArrow && (
            <ArrowItemForm
              itemId={editedArrow}
              semantics={semantics}
              params={params}
              parent={parent}
              onSave={newParams => {
                updateArrows(newParams.arrowItems ?? []);
                setEditedArrow(null);
              }}
            />
          )}
        </Dialog>
      </div>
    </div>
  );
};
