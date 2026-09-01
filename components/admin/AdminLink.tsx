"use client";

import { useRouter } from "next/navigation";
import { useEditorDirty } from "@/context/EditorDirtyContext";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function AdminLink({ href, children, className }: Props) {
  const router = useRouter();
  const { guardNavigation } = useEditorDirty();

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    if (guardNavigation()) {
      router.push(href);
    }
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
