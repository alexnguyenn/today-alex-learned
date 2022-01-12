import { gql } from '@apollo/client';
import { initializeApollo } from '../../../apollo-client';
import { getSession } from "next-auth/react";

const UpdatePostMutation = gql`
    mutation updatePost($id: ID!, $title: String!, $description: String!) {
        updatePost(where: { id: $id }, data: {title: $title, description: $description}) {
            id
        }
    }
`

const UnpublishPostMutation = gql`
    mutation unpublishPost($id: ID!) {
        unpublishPost(where: { id: $id }, from: PUBLISHED) {
            id
        }
    }
`

const handler = async (req, res) => {
    const session = await getSession({ req });
    const httpMethod = req.method
    const apolloClient = initializeApollo()
    const { postId } = req.query

    switch (httpMethod) {
        case "PUT":
            const { title, description } = req.body

            if (!session) {
                res.status(401).json({
                    status: "error",
                    message: "Unauthorized."
                })
            } else {
                try {
                    const { data } = await apolloClient.mutate({
                        mutation: UpdatePostMutation,
                        variables: {
                            id: postId,
                            title: title,
                            description: description,
                        },
                    })

                    res.status(200).json({
                        status: "success",
                        data: { post: { id: data.updatePost.id } }
                    })
                } catch (err) {
                    res.status(500).json({
                        status: "error",
                        message: `Error updating post ${postId}.`
                    })
                }
            }
            break

        case "DELETE":
            if (!session) {
                res.status(401).json({
                    status: "error",
                    message: "Unauthorized."
                })
            } else {
                try {
                    await apolloClient.mutate({
                        mutation: UnpublishPostMutation,
                        variables: { id: postId },
                    })

                    res.status(200).json({ status: "success", data: null })
                } catch (err) {
                    res.status(500).json({
                        status: "error",
                        message: `Error unpublishing post ${postId}.`
                    })
                }
            }
            break

        default:
            res.setHeader("Allow", ["PUT", "DELETE"])
            res.status(405).json({
                status: "error",
                message: `Method ${httpMethod} not allowed.`
            })
            break
    }
}

export default handler;