import { Card, Box } from "@mui/material";
import useInView from "react-cool-inview";
import ReactMarkdown from "react-markdown";

const PostList = (props) => {
    const { observe } = useInView({
        onEnter: ({ unobserve }) => {
            unobserve();
            props.loadMore();
        },
    });

    return (
        <Box 
            sx = {{
                marginTop: "2rem",
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
                    key={post.node.id}
                    ref={index === props.posts.length - 1 ? observe : null}
                    sx = {{
                        padding: "1rem",
                        width: {"xs": "100%", "sm": "calc(50% - .5rem)", "lg": "calc(33% - .66rem)", "xl": "calc(25% - .75rem)"},
                    }}
                >
                    <h2>{post.node.title}</h2>
                    <ReactMarkdown>
                        {post.node.description.markdown}
                    </ReactMarkdown>
                </Card>                
            ))}
        </Box>
    );
};

export default PostList;
