"use client";
import Link from 'next/link';
import Image from 'next/image';
import {useState,useEffect} from 'react';
import {signIn,signOut,useSession,getProviders} from 'next-auth/react';


const Navbar = () => {
  const {data:session} = useSession();
  const [providers, setProviders] = useState(null);
  const [toggledropdown, setToggledropdown] = useState(false);
  

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);

    })();
  }, []);

  


  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-3 flex-center'>
        <Image
        src="/assets/images/C.svg"
        alt='Catalystic Logo'
        width={30}
        height={30}
        className='object-contain'
        />
        <p className='logo_text'>Catalystic</p>
      </Link>

      {/* Desktop Navigation */}

      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
          <Link href="/create-prompt" className='black_btn'>
              Create Post
          </Link>
          <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
          </button>

          <Link href='/profile'>
              <Image
              src={session?.user.image}
              width={40}
              height={40}
              className='rounded-full'
              alt='profile'
              />
            </Link>

          </div>
        ):(
          <>
          {providers && Object.values(providers).map((provider)=>
          (
            <button type='button' key={provider.name} onClick={()=>signIn(provider.id)} className='black_btn'>
              Sign In
            </button>
          ))}
          </>
        )
        }

      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user?(
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={40}
              height={40}
              className='rounded-full'
              alt='profile'
              onClick={()=>setToggledropdown((prev)=> !prev)}
              />

              {toggledropdown && (
                <div className='dropdown'>
                  <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={()=>setToggledropdown(false)}
                  
                  >
                    My Profile
                  </Link>
                  <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={()=>setToggledropdown(false)}
                  
                  >
                    Create Prompt
                  </Link>
                  <button type='button' onClick={()=>{
                    setToggledropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                  >
                    Sign Out
                  </button>
                </div>
              )}  
          </div>
        ):(
          <>
          {providers && Object.values(providers).map((provider)=>
          (
            <button type='button' key={provider.name} onClick={()=>signIn(provider.id)} className='black_btn'>
              
              Sign In
            </button>
          ))}
          </>
        )}
      </div>

    </nav>
  )
}

export default Navbar