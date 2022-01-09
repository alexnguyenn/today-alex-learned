import { gql, GraphQLClient } from 'graphql-request'
import bcrypt from 'bcrypt'

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

const handler = async (req, res) => {
    if (req.method !== "POST") {
        res.status(400).json({
            error: {
                message: "Method not allowed"
            }
        })
        return
    }

    const matched = await bcrypt.compare(req.body.password, process.env.MY_PASSWORD)
    if (!matched) {
        res.status(401).json({
            error: {
                message: "Invalid password"
            }
        })
        return
    }

    const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_API_URI, {
        headers: {
            Authorization: `Bearer ${process.env.GRAPHCMS_API_PAT}`
        }
    })

    const variables = {
        title: req.body.title,
        description: req.body.description,
    }

    try {
        const { createPost } = await client.request(CreatePostMutation, variables)
        try {
            await client.request(publishPostMutation, { id: createPost.id })
            res.status(200).json({success: true})
        } catch (err) {
            res.status(500).json({
                error: {
                    message: "Post created but failed to publish!",
                }
            })
        }
    } catch (err) {
        res.status(500).json({
            error: {
                message: "Failed to create post!",
            }
        })
    }
}

export default handler;