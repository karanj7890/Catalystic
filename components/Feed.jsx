"use client";
import { useState,useEffect } from "react"
import PromptCard from "./PromptCard";

const PromptCardList=({data,handleTagClick})=>{
  return(
    <div className='mt-16 prompt_layout'>
      {data.map((post)=>(
        <PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [allposts, setAllPosts] = useState([]);
  const [searchresults, setSearchresults] = useState([]);
  const [searchtimeout, setSearchtimeout] = useState(null);

  const handleSearchChange= (e)=>{
    clearTimeout(searchtimeout);
    setSearchText(e.target.value);

    setSearchtimeout(
      setTimeout(()=>{
        const searchResult= filterprompts(e.target.value);
        setSearchresults(searchResult);
      },500)
    )
  }
  useEffect(()=>{
    const fetchPosts= async()=>{
      const res= await fetch('/api/prompt');
      const data= await res.json();

      setAllPosts(data);
    }
    fetchPosts();
  },[])
  const filterprompts= (searchText)=>{
    const regex= new RegExp(searchText);
    return allposts.filter((item)=>regex.test(item.creator.username) || regex.test(item.prompt) || regex.test(item.tag));
  }

  const handleTagClick= (tagname)=>{
    setSearchText(tagname)
    const searchResult= filterprompts(tagname);
    setSearchresults(searchResult);
  }
  return (
    <section className="feed">
      <form className='relative w-full flex-center'>
        <input type="text"
        placeholder='Search for a username or a tag'
        value={searchText}
        onChange={handleSearchChange}
        required
        className='search_input peer'
        />
      </form>

      {searchText?(<PromptCardList
      data={searchresults}
      handleTagClick={handleTagClick}
      />):(<PromptCardList
        data={allposts}
        handleTagClick={handleTagClick}
      />)}

    </section>
  )
}

export default Feed