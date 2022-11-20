import { NextPage } from 'next'
import { prisma } from '../server/db/client'
import { useEffect, useState } from 'react'
import axios from 'axios';

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
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [posts, setPosts] = useState<PostProps[]>([])


  useEffect(() => {
    setPosts(props.posts)
  }, [props.posts])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await axios.post('/api/posts', { title, content })
    setPosts([...posts, res.data])
  }


  return (
    <div>
      <h1>Home</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {
        posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content} </p>
          </div>
        ))
      }
    </div >

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