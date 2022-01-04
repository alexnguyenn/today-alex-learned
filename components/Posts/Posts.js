import { useRef, useState } from "react";
import { gql, useQuery } from '@apollo/client';
import PostList from "./PostList";


const GET_POSTS = gql`
    query($first: Int!, $after: String, $search: String! = "") {
        postsConnection(orderBy: createdAt_DESC, first: $first, after: $after, where: {_search: $search}) {
            edges {
                node {
                    id
                    title
                    description {
                        markdown
                    }
                }
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
`;  

  
const Posts = () => {
    const [isFiltered, setIsFiltered] = useState(false);
    const searchRef = useRef();
    const { loading, error, data, fetchMore, refetch } = useQuery(GET_POSTS, {
        variables: {
            first: 20,
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading content from GraphCMS :(</p>;
    
    const posts = data.postsConnection.edges;
    const pageInfo = data.postsConnection.pageInfo;

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            applyFilter();
        }
    };

    const applyFilter = () => {
        if (searchRef.current.value) {
            refetch({
                search: searchRef.current.value.trim(),
            });
            setIsFiltered(true);
        } else {
            if (isFiltered) {
                resetFilter();
            }
        }
    };

    const resetFilter = () => {
        refetch({search: ""});
        searchRef.current.value = "";
        setIsFiltered(false);
    };

    const loadMore = () => {
        if (pageInfo.hasNextPage) {
            fetchMore({
                variables: {
                    first: 10,
                    after: pageInfo.endCursor
                },
            });
        };
    };

    return (
        <div>
            <input 
                id="search-bar" 
                className="shadow-card" 
                type="text" 
                placeholder="Search posts (press Enter to search)" 
                ref = {searchRef}
                onKeyPress={handleKeyPress}
            />
            {isFiltered && (
                <p id="reset-filter" onClick={resetFilter}>Reset Search</p>
            )}
            <PostList posts={posts} loadMore={loadMore}/>
        </div>
    );
}

export default Posts;
