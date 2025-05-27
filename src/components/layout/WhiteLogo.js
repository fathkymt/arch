import Image from 'next/image';
import Link from 'next/link';

const WhiteLogo = () => {
  return (
    <div className="fixed top-[32px] right-[25px] z-[1000] pointer-events-auto">
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