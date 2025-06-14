'use client';

import Image from 'next/image';
import Link from 'next/link';

const WhiteLogo = () => {
  return (
    <div className="fixed md:top-[-10px] top-[0px] md:right-[30px] right-[27px] z-[1000] pointer-events-auto white-logo">
      <Link href="/">
        <Image
          src="/images/logo/beyazanalogo.png"
          alt="ES+Partners Logo"
          width={120}
          height={120}
          className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] object-contain"
          priority
        />
      </Link>
    </div>
  );
};

export default WhiteLogo; 