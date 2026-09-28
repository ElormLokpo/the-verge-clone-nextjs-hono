import { Toaster } from "sonner";
import QueryProvider from "./query-provider";

export const RootProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <QueryProvider>
        {children}
        <Toaster />
      </QueryProvider>
    </>
  );
};
