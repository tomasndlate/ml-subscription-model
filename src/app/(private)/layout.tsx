import { auth, signOut } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react'
import Image from 'next/image';
import { getUserbyId } from '@/services/user-service';

export default async function PrivateLayout({children}: Readonly<{children: React.ReactNode}>) {
    const session = await auth();
    if (!session?.user?.id) redirect('/');
    const user = await getUserbyId(session.user.id);

    const handleSignOut = async () => {
      "use server";
      await signOut();
    }

  return (
    <>
    <header>
        <nav className='w-full h-16 flex justify-between items-center px-6 bg-white'>

          <section>
            <h1 className='text-lg font-semibold'>
              <span className="hidden md:inline-block">ML Subscription Models</span>
              <span className="inline-block md:hidden">MLS Models</span>
            </h1>
          </section>

          <p className='cursor-pointer' onClick={handleSignOut}>logout</p>

          <section className='flex items-center gap-3'>
            <div className='flex flex-col items-end'>
              <p className='text-sm'>{user?.name}</p>
              {/* <p>{session?.user?.credits} credits</p> */}
              <p className='text-xs text-gray-600'>{user?.credits} credits</p>
            </div>
            <div className='w-9 h-9 rounded-full overflow-hidden cursor-pointer'>
              {session.user?.image 
              ? ( <Image alt='Profile Image' src={session.user?.image} width={36} height={36} /> ) 
              : ( null )}
            </div>
          </section>

        </nav>
    </header>
    <main>
        {children}
    </main>
    </>
  )
}
