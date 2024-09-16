import Image from 'next/image';

const Logo = () => {

    return (
        <div className='relative inline-block'>
            <div className='absolute z-10 -right-5 top-5 text-center font-bold text-3xl -rotate-[10deg] logo-text-neon'>Manager</div>
            <Image alt="Logo" height={150} width={150} src="/logo-white-no-bg.png"></Image>
        </div>
    );
}
 
export default Logo;
