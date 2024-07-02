import SearchFeed from './SearchFeed'
const SearchPost = ({search, setSearch, posts}) => {
    return(
        <div className='search-posts'>
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
            <input
                id='search-bar'
                type="text"
                role="searchbox"
                placeholder="  Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </form>
        {search && <SearchFeed 
            posts={posts.filter(post => ((post.content).toLowerCase()).includes(search.toLowerCase()))}/>}
        </div>
        )
}
export default SearchPost