import { EditorDirtyProvider } from "@/context/EditorDirtyContext";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <EditorDirtyProvider>{children}</EditorDirtyProvider>;
}
