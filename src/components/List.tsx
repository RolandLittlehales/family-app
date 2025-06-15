"use client";

import React, { useState } from "react";
import * as styles from "./List.css";

export interface ListItem {
  id: string | number;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  meta?: string;
  actions?: React.ReactNode;
  disabled?: boolean;
}

export interface ListProps {
  items: ListItem[];
  variant?: "simple" | "bordered" | "elevated";
  interactive?: boolean;
  selectable?: boolean;
  multiSelect?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  header?: string;
  className?: string;
  onItemClick?: (item: ListItem, index: number) => void;
  onSelectionChange?: (selectedItems: ListItem[]) => void;
}

export interface ListGroupProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export interface ChecklistItem extends Omit<ListItem, "actions"> {
  checked?: boolean;
}

export interface ChecklistProps {
  items: ChecklistItem[];
  variant?: "simple" | "bordered" | "elevated";
  header?: string;
  className?: string;
  onItemToggle?: (item: ChecklistItem, checked: boolean) => void;
  onChange?: (checkedItems: ChecklistItem[]) => void;
}

export function List({
  items,
  variant = "simple",
  interactive = false,
  selectable = false,
  multiSelect = false,
  loading = false,
  emptyMessage = "No items to display",
  header,
  className = "",
  onItemClick,
  onSelectionChange,
}: ListProps) {
  const [selectedItems, setSelectedItems] = useState<Set<string | number>>(
    new Set()
  );

  const handleItemClick = (item: ListItem, index: number) => {
    if (item.disabled) return;

    if (selectable) {
      const newSelection = new Set(selectedItems);

      if (multiSelect) {
        if (newSelection.has(item.id)) {
          newSelection.delete(item.id);
        } else {
          newSelection.add(item.id);
        }
      } else {
        if (newSelection.has(item.id)) {
          newSelection.clear();
        } else {
          newSelection.clear();
          newSelection.add(item.id);
        }
      }

      setSelectedItems(newSelection);

      const selectedItemsList = items.filter(item => newSelection.has(item.id));
      onSelectionChange?.(selectedItemsList);
    }

    onItemClick?.(item, index);
  };

  const getItemVariant = (item: ListItem) => {
    if (item.disabled) return styles.listItemVariants.default;
    if (selectable && selectedItems.has(item.id))
      return styles.listItemVariants.selected;
    if (interactive || selectable || onItemClick)
      return styles.listItemVariants.interactive;
    return styles.listItemVariants.default;
  };

  const containerClass = styles.listVariants[variant];

  if (loading) {
    return (
      <div className={`${containerClass} ${className}`}>
        <div className={styles.loadingList}>Loading...</div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={`${containerClass} ${className}`}>
        <div className={styles.emptyList}>{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className={`${containerClass} ${className}`}>
      {header && <div className={styles.listHeader}>{header}</div>}

      {items.map((item, index) => (
        <div
          key={item.id}
          className={getItemVariant(item)}
          onClick={() => handleItemClick(item, index)}
          style={{
            opacity: item.disabled ? 0.5 : 1,
            cursor: item.disabled ? "not-allowed" : undefined,
          }}
        >
          <div className={styles.listItemContent}>
            {item.icon && (
              <div className={styles.listItemIcon}>{item.icon}</div>
            )}

            <div className={styles.listItemText}>
              <h4 className={styles.listItemTitle}>{item.title}</h4>
              {item.description && (
                <p className={styles.listItemDescription}>{item.description}</p>
              )}
            </div>

            {item.meta && (
              <div className={styles.listItemMeta}>{item.meta}</div>
            )}

            {item.actions && (
              <div className={styles.listItemActions}>{item.actions}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ListGroup({ title, children, className = "" }: ListGroupProps) {
  return (
    <div className={`${styles.listGroup} ${className}`}>
      <div className={styles.listGroupHeader}>{title}</div>
      {children}
    </div>
  );
}

export function ListDivider() {
  return <div className={styles.listDivider} />;
}

export function Checklist({
  items,
  variant = "simple",
  header,
  className = "",
  onItemToggle,
  onChange,
}: ChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string | number>>(
    new Set(items.filter(item => item.checked).map(item => item.id))
  );

  const handleToggle = (item: ChecklistItem, checked: boolean) => {
    const newCheckedItems = new Set(checkedItems);

    if (checked) {
      newCheckedItems.add(item.id);
    } else {
      newCheckedItems.delete(item.id);
    }

    setCheckedItems(newCheckedItems);

    onItemToggle?.(item, checked);

    const checkedItemsList = items.filter(item => newCheckedItems.has(item.id));
    onChange?.(checkedItemsList);
  };

  const containerClass = styles.listVariants[variant];

  if (items.length === 0) {
    return (
      <div className={`${containerClass} ${className}`}>
        <div className={styles.emptyList}>No items to display</div>
      </div>
    );
  }

  return (
    <div className={`${containerClass} ${className}`}>
      {header && <div className={styles.listHeader}>{header}</div>}

      {items.map(item => (
        <div key={item.id} className={styles.listItemVariants.default}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={checkedItems.has(item.id)}
              onChange={e => handleToggle(item, e.target.checked)}
              disabled={item.disabled}
            />

            <div className={styles.listItemContent} style={{ gap: 0 }}>
              {item.icon && (
                <div
                  className={styles.listItemIcon}
                  style={{ marginLeft: "0.5rem" }}
                >
                  {item.icon}
                </div>
              )}

              <div className={`${styles.listItemText} ${styles.checkboxText}`}>
                <h4 className={styles.listItemTitle}>{item.title}</h4>
                {item.description && (
                  <p className={styles.listItemDescription}>
                    {item.description}
                  </p>
                )}
              </div>

              {item.meta && (
                <div className={styles.listItemMeta}>{item.meta}</div>
              )}
            </div>
          </label>
        </div>
      ))}
    </div>
  );
}
