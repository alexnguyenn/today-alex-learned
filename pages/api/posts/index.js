import { gql } from '@apollo/client';
import { initializeApollo } from '../../../apollo-client';
import { getSession } from "next-auth/react";

const CreatePostMutation = gql`
    mutation createPost($title: String!, $description: String!) {
        createPost(data: {title: $title, description: $description}) {
            id
        }
    }
`

const publishPostMutation = gql`
    mutation publishPost($id: ID!) {
        publishPost(where: { id: $id } to: PUBLISHED) {
            id
        }
    }
`

export default async (req, res) => {
    const session = await getSession({ req });
    const httpMethod = req.method
    const apolloClient = initializeApollo() 

    switch (httpMethod) {
        case "POST":
            const { title, description } = req.body
            
            if (!session) {
                res.status(401).json({
                    status: "error",
                    message: "Unauthorized."
                })
            } else {
                try {
                    const { data } = await apolloClient.mutate({
                        mutation: CreatePostMutation,
                        variables: {
                            title: title,
                            description: description,
                        },
                    });

                    try {
                        await apolloClient.mutate({
                            mutation: publishPostMutation,
                            variables: {
                                id: data.createPost.id,
                            },
                        });
                        res.status(200).json({
                            status: "success",
                            data: {
                                post: { id: data.createPost.id }
                            }
                        })
                    } catch (err) {
                        res.status(500).json({
                            status: "error",
                            message: `Error publishing post ${data.createPost.id}.`
                        })
                    }
                } catch (err) {
                    res.status(500).json({
                        status: "error",
                        message: "Error creating post."
                    })
                }
            }
            break
        default:
            res.setHeader("Allow", "POST")
            res.status(405).json({
                status: "error",
                message: `Method ${httpMethod} not allowed.`
            })
            break
    }
}
