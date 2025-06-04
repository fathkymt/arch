'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const WhiteLogo = () => {
  const pathname = usePathname();
  const isProjectDetailPage = pathname?.includes('/projects/') && pathname?.split('/').length > 3;

  return (
    <div className={`fixed top-[30px] md:right-[30px] right-[26px] z-[1000] pointer-events-auto ${isProjectDetailPage ? 'max-md:hidden' : ''}`}>
      <Link href="/">
        <Image
          src="/images/logo/beyazanalogo.png"
          alt="ES+Partners Logo"
          width={120}
          height={120}
          className="translate-y-1"
          priority
        />
      </Link>
    </div>
  );
};

export default WhiteLogo; 