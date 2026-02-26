import { useState } from "react";
import { mockUser } from "@/data/mockData";

export function useSettings() {
  const [fontSize, setFontSize] = useState(17);
  const [notifications, setNotifications] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteStep, setDeleteStep] = useState(0);

  const openDeleteDialog = () => {
    setDeleteConfirm(true);
    setDeleteStep(1);
  };

  const closeDeleteDialog = () => setDeleteConfirm(false);

  const advanceDeleteStep = () => setDeleteStep(2);
  const retreatDeleteStep = () => setDeleteStep(1);

  const confirmDelete = () => {
    // Would perform actual deletion
    setDeleteConfirm(false);
  };

  return {
    user: mockUser,
    fontSize,
    setFontSize,
    notifications,
    setNotifications,
    deleteConfirm,
    deleteStep,
    openDeleteDialog,
    closeDeleteDialog,
    advanceDeleteStep,
    retreatDeleteStep,
    confirmDelete,
  };
}
