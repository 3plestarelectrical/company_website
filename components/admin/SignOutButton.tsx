"use client";

import { signOut } from "next-auth/react";
import { useEditorDirty } from "@/context/EditorDirtyContext";

export default function SignOutButton() {
  const { guardNavigation } = useEditorDirty();

  function handleSignOut() {
    if (guardNavigation()) {
      signOut({ callbackUrl: "/admin/login" });
    }
  }

  return (
    <button type="button" className="sign-out-btn" onClick={handleSignOut}>
      Sign out
    </button>
  );
}
