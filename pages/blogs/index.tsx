import { Container } from 'components/Container'
import React from 'react'
import { getSortedBlogs } from 'utils/api/client-side-api'
import { Blog } from 'utils/types'
import BlogsList from 'components/Blogs/BlogsList'
import SEO from 'components/SEO'

interface Props {
	blogs: Blog[]
}

export const getStaticProps = async () => {
	const blogs = await getSortedBlogs()
	return {
		props: {
			blogs,
		},
		revalidate: 86400,
	}
}

const Blogs: React.FC<Props> = ({ blogs }) => {
	return (
		<div>
			<SEO title="Blogs" />
			<Container>{blogs.length > 0 && <BlogsList blogs={blogs} />}</Container>
		</div>
	)
}

export default Blogs
