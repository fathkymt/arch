'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const WhiteLogo = () => {
  const pathname = usePathname();
  const isProjectDetailPage = pathname?.includes('/projects/') && pathname?.split('/').length > 3;

  return (
    <div className={`fixed top-[32px] right-[25px] z-[1000] pointer-events-auto ${isProjectDetailPage ? 'max-md:hidden' : ''}`}>
      <Link href="/">
        <Image
          src="/images/logo/beyazanalogo.png"
          alt="ES+Partners Logo"
          width={120}
          height={120}
          priority
        />
      </Link>
    </div>
  );
};

export default WhiteLogo; 