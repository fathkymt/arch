'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const WhiteLogo = () => {
  const pathname = usePathname();
  const isProjectDetailPage = pathname?.includes('/projects/') && pathname?.split('/').length > 3;

  return (
    <div className={`fixed top-[18px] md:right-[10px] right-[0px] z-[1000] pointer-events-auto ${isProjectDetailPage ? 'max-md:hidden' : ''}`}>
      <div className="flex items-center max-md:-space-x-3 md:-space-x-1">
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
        <Image
          src="/images/logo/yenilogo.svg"
          alt="ES+Partners Secondary Logo"
          width={55}
          height={55}
          className="translate-y-[6px]"
          priority
        />
      </div>
    </div>
  );
};

export default WhiteLogo; 