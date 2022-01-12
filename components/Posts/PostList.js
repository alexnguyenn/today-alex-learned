import { Card, Box, Typography, CardContent, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import useInView from "react-cool-inview";
import ReactMarkdown from "react-markdown";
import { NextLinkComposed } from "../Link";

const PostList = (props) => {
    const { observe } = useInView({
        threshold: 0.65,
        onChange: ({ inView, unobserve }) => {
            if (inView) {
                unobserve();
                props.loadMore();
            }
        },
    });

    return (
        <Box 
            my={2}
            sx = {{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center",
            }}
        >
            {props.posts.map((post, index) => (
                <Card
                    variant="outlined"
                    key={post.node.id + index}
                    ref={index === props.posts.length - 1 ? observe : null}
                    sx = {{
                        width: {"xs": "100%", "sm": "calc(50% - .5rem)", "lg": "calc(33% - .66rem)", "xl": "calc(25% - .75rem)"},
                    }}
                >
                    <CardContent>
                        <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem", alignItems: "start", justifyContent: "space-between"}}>
                            <Typography variant="h5" sx={{ fontWeight: "bold"}}>{post.node.title}</Typography>
                            <IconButton component={NextLinkComposed} to={`/edit/${post.node.id}`} title="Edit post">
                                <EditIcon fontSize="small" sx={{opacity: .3, color: "black"}}></EditIcon>
                            </IconButton>
                        </Box>
                        <ReactMarkdown>
                            {post.node.description}
                        </ReactMarkdown>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default PostList;
