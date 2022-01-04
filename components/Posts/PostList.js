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
        <div className="post-list">
            {props.posts.map((post, index) => (
                <div 
                    className="post-item shadow-card"
                    key={post.node.id}
                    ref={index === props.posts.length - 1 ? observe : null}
                >
                    <h2>{post.node.title}</h2>
                    <ReactMarkdown>
                        {post.node.description.markdown}
                    </ReactMarkdown>
                </div>
            ))}
        </div>
    );
};

export default PostList;
