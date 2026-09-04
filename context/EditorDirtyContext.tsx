"use client";

import { createContext, useContext, useState, useCallback } from "react";

type EditorDirtyContextValue = {
  isDirty: boolean;
  setIsDirty: (dirty: boolean) => void;
  guardNavigation: () => boolean;
};

const defaultValue: EditorDirtyContextValue = {
  isDirty: false,
  setIsDirty: () => {},
  guardNavigation: () => true,
};

const EditorDirtyContext = createContext<EditorDirtyContextValue>(defaultValue);

export function EditorDirtyProvider({ children }: { children: React.ReactNode }) {
  const [isDirty, setIsDirty] = useState(false);

  const guardNavigation = useCallback(() => {
    if (!isDirty) return true;
    const confirmed = window.confirm("You have unsaved changes. Leave without saving?");
    if (confirmed) setIsDirty(false);
    return confirmed;
  }, [isDirty]);

  return (
    <EditorDirtyContext.Provider value={{ isDirty, setIsDirty, guardNavigation }}>
      {children}
    </EditorDirtyContext.Provider>
  );
}

export function useEditorDirty() {
  return useContext(EditorDirtyContext);
}