import type { PropsWithChildren } from "react";

type Props = Readonly<PropsWithChildren>;

export const Code = ({ children }: Props) => {
  return (
    <div className="mockup-code">
      <pre data-prefix="$">
        <code>{children}</code>
      </pre>
    </div>
  );
};
