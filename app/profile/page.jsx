"use client"

import {useState,useEffect} from 'react'
import {useSession} from 'next-auth/react'
import {useRouter} from 'next/navigation'

import Profile from '@components/Profile'

const MyProfile = () => {
    const {data:session}= useSession();
    const router= useRouter();

    const [posts,setPosts]= useState([]);

    useEffect(()=>{
        const fetchPosts= async()=>{
          const res= await fetch(`/api/users/${session.user.id}/posts`);
          const data= await res.json();
    
          setPosts(data);
        }
        if(session?.user.id) fetchPosts();
      },[])

    const handleEdit=(post)=>{
        // push the user to the edit page
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete= async(post)=>{
        const hasConfirmed= confirm("Are you sure to delete this post?");
        if(hasConfirmed){
            try {
                await fetch(`/api/prompt/${post._id.toString()}`,{
                    method:'DELETE'
                })
                const filteredPosts= posts.filter((p)=>p._id!==post._id)
                setPosts(filteredPosts);
            } catch (error) {
                console.log(error);
                
            }
        }
    }
  return (
    <Profile
    name='My'
    desc="Welcome to your profile page"
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    
    />
  )
}

export default MyProfile