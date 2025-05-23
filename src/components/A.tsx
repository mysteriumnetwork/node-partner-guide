import type { PropsWithChildren } from "react";

type Props = Readonly<
  PropsWithChildren<{
    href?: string;
  }>
>;

export const A = ({ children, href }: Props) => (
  <a
    href={href}
    className="text-blue-500 hover:underline cursor-pointer"
    target="_blank"
  >
    {children}
  </a>
);
