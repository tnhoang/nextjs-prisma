import { NextPage } from 'next'
import { prisma } from '../server/db/client'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Box, Button, CloseButton, Flex, Heading } from '@chakra-ui/react'
import { Input, Textarea } from '@chakra-ui/react'
import { Form, Formik } from 'formik';
type PostProps = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

type Props = {
  posts: PostProps[];
}

const Home: NextPage<Props> = (props) => {
  const [posts, setPosts] = useState<PostProps[]>([])

  useEffect(() => {
    setPosts(props.posts)
  }, [props.posts])

  const handleDeletePost = async (id: number) => {
    const res = await axios.delete(`/api/posts/${id}`)
    if (res.status == 200) {
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id))
    }
  }
  return (
    <Flex
      direction="column"
      align="center"
      height="100vh"
      gap="2"
    >
      <Formik
        initialValues={{
          title: '',
          content: '',
        }}
        onSubmit={async ({ title, content }, { resetForm }) => {
          const res = await axios.post('/api/posts', { title, content })
          setPosts([...posts, res.data])
          resetForm({
            values: {
              title: '',
              content: ''
            }
          })

        }}>
        {({ isSubmitting, values, getFieldProps }) => (
          <Form>
            <Input
              id='title'
              margin="1"
              placeholder="Title"
              autoComplete="off"
              {...getFieldProps('title')}
            />
            <Textarea
              id='content'
              margin="1"
              placeholder="Type your content..."
              {...getFieldProps('content')}
            />
            <Button width="100%" colorScheme='messenger' type="submit" isLoading={isSubmitting}>Submit</Button>
          </Form>
        )}
      </Formik>
      <Box alignContent="left" width="100%">
        {
          posts.map((post) => (
            <Flex key={post.id} justifyContent="space-between">
              <div>
                <Heading>{post.title}</Heading>
                <p onDoubleClick={() => console.log("double lcick!")}>{post.content} </p>
              </div>

              <CloseButton onClick={() => handleDeletePost(post.id)} />
            </Flex>
          ))
        }
      </Box>
    </Flex >
  )
}

export default Home

export async function getServerSideProps() {
  let posts = await prisma.post.findMany()

  return {
    props: {
      posts
    }
  }
}