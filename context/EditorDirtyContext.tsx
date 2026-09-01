"use client";

import { createContext, useContext, useState, useCallback } from "react";

type EditorDirtyContextValue = {
  isDirty: boolean;
  setIsDirty: (dirty: boolean) => void;
  guardNavigation: () => boolean; // true if navigation should proceed
};

const EditorDirtyContext = createContext<EditorDirtyContextValue | null>(null);

export function EditorDirtyProvider({ children }: { children: React.ReactNode }) {
  const [isDirty, setIsDirty] = useState(false);

  const guardNavigation = useCallback(() => {
    if (!isDirty) return true;
    const confirmed = window.confirm("You have unsaved changes. Leave without saving?");
    if (confirmed) setIsDirty(false); // clear before the next page ever renders
    return confirmed;
  }, [isDirty]);

  return (
    <EditorDirtyContext.Provider value={{ isDirty, setIsDirty, guardNavigation }}>
      {children}
    </EditorDirtyContext.Provider>
  );
}

export function useEditorDirty() {
  const ctx = useContext(EditorDirtyContext);
  if (!ctx) {
    throw new Error("useEditorDirty must be used within EditorDirtyProvider");
  }
  return ctx;
}
