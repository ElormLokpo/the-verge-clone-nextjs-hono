import Image from 'next/image';
import bgImage from '@/public/auth-page-background.jpg';
import { ReactNode } from 'react';

export const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <main className="relative min-h-screen w-full overflow-hidden">

                <div className="absolute inset-0 -z-10">
                    <Image
                        src={bgImage}
                        alt="Background Image"
                        placeholder="blur"
                        quality={100}
                        fill
                        sizes="100vw"
                        style={{
                            objectFit: 'cover',
                        }}
                    />
                </div>



                <div className="relative z-10 flex min-h-screen items-center justify-center">
                    <div>
                        <div className="text-white text-5xl font-bold text-italic mb-5 text-center">
                            TheVerge
                        </div>
                        <div>
                            {children}
                        </div>
                    </div>

                </div>
            </main>
        </>
    )
}


export default AuthLayout;