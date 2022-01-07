import { useRef, useState } from "react";
import { gql, useQuery } from '@apollo/client';
import { Box, TextField, CircularProgress, Alert, AlertTitle, Link } from "@mui/material";
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

    if (loading) return (
        <Box display="flex">
            <CircularProgress sx={{m: "auto"}}/>
        </Box>
    );
    
    if (error) return (
        <Box display="flex">
            <Alert 
                severity="error" 
                sx={{
                    m: "auto",
                    width: {"xs": "100%", "sm": "90%", "lg": "60%", "xl": "45%"}
                }}
            >
                <AlertTitle>Error</AlertTitle>
                {"Failed to load content. "}
                <Link 
                    sx={{cursor: "pointer"}}
                    onClick={() => refetch()}
                    underline="none"
                >
                    Click here to try again
                </Link>
            </Alert>
        </Box>
    );
    
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
        <Box mt={2}>
            <TextField
                fullWidth
                placeholder="Search posts (press Enter to search)"
                inputRef={searchRef}
                onKeyPress={handleKeyPress}
                sx={{
                    width: {"xs": "100%", "sm": "80%", "lg": "60%", "xl": "45%"},
                    mx: "auto",
                    display: "block",
                }}
            />
            {isFiltered && (
                <p id="reset-filter" onClick={resetFilter}>Reset Search</p>
            )}
            <PostList posts={posts} loadMore={loadMore}/>
        </Box>
    );
}

export default Posts;
