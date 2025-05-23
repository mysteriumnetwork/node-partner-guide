import type { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex justify-center w-full mt-2">
      <div className="prose">{children}</div>
    </div>
  );
};
