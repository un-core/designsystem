import { useTab } from '@wfp/react';
import Link from 'next/link';
import React from 'react';

export default function NextTab(props: any) {
  const { children, href } = props;
  const { anchorProps, liProps /*selectedClasses */ } = useTab(props);
  return (
    <div>
      <li {...liProps}>
        <Link {...anchorProps} href={href}>
          {children}
        </Link>
      </li>
    </div>
  );
}
