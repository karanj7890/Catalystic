"use client"
import {useState,useEffect, Suspense} from 'react'
import {useRouter,useSearchParams} from 'next/navigation'
import Form from '@components/Form'
import Loading from '@app/profile/loading'

const EditPrompt = () => {
    const router= useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const searchParams= useSearchParams();
    const promptId= searchParams.get('id');
    const [post, setPost] = useState({
        prompt:" ",
        tag:" "
    });
    useEffect(()=>{
        const getPromptDetails= async()=>{
            const response= await fetch(`/api/prompt/${promptId}`)
            const data= await response.json()
            setPost({
                prompt:data.prompt,
                tag:data.tag
            })
            setLoading(false)
        }
        if(promptId) getPromptDetails()
    },[promptId])

    const updatePrompt= async (e)=>{
        e.preventDefault();
        setSubmitting(true);
        if(!promptId) return alert("Prompt ID not found")
        try {
            const response= await fetch(`/api/prompt/${promptId}`,{
                method:'PATCH',
                body:JSON.stringify({
                    prompt:post.prompt,
                    
                    tag:post.tag
                }),
            })
            if(response.ok){
                router.push('/')
            }
        } catch (error) {
            console.log(error);
        }finally{
            setSubmitting(false);
        }
    }

    if (loading) {
        return <Loading/>;
      }
  return (
    <Form 
    type="Edit"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={updatePrompt}
    />
  )
}

const SuspenseWrapper = () => {
    return (
      <Suspense fallback={<Loading />}>
        <EditPrompt />
      </Suspense>
    );
  };
  
  export default SuspenseWrapper;