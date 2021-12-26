import clsx from 'clsx'
import { Container } from 'components/Container'
import { SocialPanelIcon } from 'components/SocialPanel'
import { useThemeContext } from 'components/ThemeProvider'
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useMemo } from 'react'
import { FacebookShareButton, TwitterShareButton } from 'react-share'
import sanitizeHtml from 'sanitize-html'
import { getArticleBySlug, getArticles } from 'utils/api/client-side-api'
import { prettyDate } from 'utils/helpers'
import { useDeviceMediaQuery } from 'utils/hooks/useMediaQuery'
import { Article } from 'utils/types'
import FacebookIcon from '../../assets/svgs/social-icons/facebook.svg'
import TwitterIcon from '../../assets/svgs/social-icons/twitter.svg'
import styles from './styles.module.css'
import Slider from 'react-slick'
import { NextArrow, PrevArrow } from 'components/SlideShow/arrows'
import { SlideShow } from 'components/SlideShow'
import SEO from "components/SEO"

interface Props {
  article: Article
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getArticles()
  const paths = articles
    .slice(0, Math.min(10, articles.length))
    .map((article) => `/articles/${article.slug}`)
  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { slug } = params
  return {
    props: {
      article: await getArticleBySlug(slug as string),
    },
    revalidate: 60000,
  }
}

// export const getServerSideProps = async ({ params }) => {
//   const { slug } = params;
//   return {
//     props: {
//       article: await getArticleBySlug(slug as string),
//     },
//   };
// };

const BlogPage: React.FC<Props> = ({ article }) => {
  const articleDate = useMemo(
    () =>
      `${prettyDate(article.published_date, 'd MMMM')} '${prettyDate(
        article.published_date,
        'yy'
      )}`,
    [article]
  )
  const images = useMemo(() => {
    return article.images.map((image) => image.url)
  }, [article])
  const { colors } = useThemeContext()
  const matchesLaptop = useDeviceMediaQuery('laptop')
  const articleUrl = useMemo(() => {
    return typeof window === 'undefined' ? '' : window.location.href
  }, [])
  return (
		<>
    <SEO title={article.title} description={article.summary} />
			<div className="py-20">
				{article?.heroImage && (
					<Container className="h-96 mb-20">
						<img
							src={article.heroImage.url}
							className="object-cover w-full h-full"
							alt=""
						/>
					</Container>
				)}
				<Container className="flex flex-wrap">
					<div
						className={clsx({
							'w-1/5 mr-10': matchesLaptop,
							'w-full': !matchesLaptop,
						})}
					>
						<p className={styles.date}>
							{article.published_date ? articleDate : ''}
						</p>
						<hr className="mt-3" />
						<div
							className={clsx({
								'mt-10': matchesLaptop,
								'mt-6': !matchesLaptop,
							})}
						>
							<p className="mb-6">Share:</p>
							<div className="flex">
								<FacebookShareButton
									url={articleUrl}
									quote={article.title}
									className="flex-none"
								>
									<SocialPanelIcon
										icon={FacebookIcon}
										iconColor="white"
										bgColor={colors.primary}
									/>
								</FacebookShareButton>
								<TwitterShareButton
									url={articleUrl}
									title={article.title}
									className="ml-3"
								>
									<SocialPanelIcon
										icon={TwitterIcon}
										iconColor="white"
										bgColor={colors.primary}
									/>
								</TwitterShareButton>
							</div>
						</div>
					</div>
					<div
						className={clsx('flex-1', {
							'mt-0': matchesLaptop,
							'mt-12': !matchesLaptop,
						})}
					>
						<h3 className={clsx('text-2xl mb-10', styles.title)}>
							{article.title}
						</h3>
						<div
							className={clsx('body', styles.articleBody)}
							dangerouslySetInnerHTML={{
								__html: sanitizeHtml(article.body, {
									allowedTags: sanitizeHtml.defaults.allowedTags.concat([
										'img',
									]),
								}),
							}}
						></div>
						<div className={styles.slideShowWrapper}>
							<SlideShow images={article.images} withOverlay={false} />
						</div>
					</div>
				</Container>
			</div>
		</>
	)
}

export default BlogPage
