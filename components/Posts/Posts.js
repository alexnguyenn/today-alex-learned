import { useRef, useState } from "react";
import { gql, useQuery } from '@apollo/client';
import { Box, TextField, CircularProgress, Alert, AlertTitle, Link, Typography } from "@mui/material";
import PostList from "./PostList";

const POSTS_PER_PAGE = 10;
export const POSTS_FIRST_PAGE = 20;

export const GET_POSTS = gql`
    query($first: Int!, $after: String, $search: String! = "") {
        postsConnection(orderBy: createdAt_DESC, first: $first, after: $after, where: {_search: $search}) {
            edges {
                node {
                    id
                    title
                    description
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
            first: POSTS_FIRST_PAGE,
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
                    first: POSTS_PER_PAGE,
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
                <Typography
                    mt={2}  
                    variant="body1"
                    align="center"
                    color="primary"
                    sx={{cursor: "pointer"}}
                    onClick={resetFilter}
                >
                    Reset current filter
                </Typography>
            )}
            <PostList posts={posts} loadMore={loadMore}/>
        </Box>
    );
}

export default Posts;
