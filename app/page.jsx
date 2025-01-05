import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center text-primary pink_purple_gradient">
            Discover & Read 
            <br className="max-md:hidden" />
            <span className="pink_purple_gradient text-center"> Amazing Prompts</span>
        </h1>
        <p className="desc text-center text-secondary">
        "Catalystic: Your Spark for Growth. Get inspired, stay motivated, and reach your goals with daily prompts and challenges!"
        </p>

        {/* Feed */}
        <Feed />
        
    </section>
  )
}

export default Home