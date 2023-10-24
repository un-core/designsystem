import { useTab } from "@wfp/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NextTab(props: any) {
  const { children, href } = props;
  const { anchorProps, liProps, selectedClasses } = useTab(props);

  const pathName = usePathname();

  const isActive = pathName === href;

  return (
    <li {...liProps} className={isActive ? selectedClasses : liProps.className}>
      <Link {...anchorProps} href={href}>
        {children}
      </Link>
    </li>
  );
}
