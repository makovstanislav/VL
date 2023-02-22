import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'
import Note from '../../components/Note'

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">← Back to home</Link>
      </h2>
      <Note />
    </Layout>
  );
  }

