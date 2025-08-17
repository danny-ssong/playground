import { ModalProvider } from "./context/ModalContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <div>{children}</div>
    </ModalProvider>
  );
}
