import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { useDeviceMediaQuery } from 'utils/hooks/useMediaQuery'
import HeaderLogo from '../../assets/svgs/logo.svg'
import AltHeaderLogo from '../../assets/svgs/logo-alt.svg'
import SearchIcon from '../../assets/svgs/search-icon.svg'
import { Button } from '../Button'
import { MobileSubNav } from './MobileSubNav'
import styles from './styles.module.css'
import Search from "components/Algolia/Search"

interface Props {}

export const Header = () => {
	const matchesLaptop = useDeviceMediaQuery('laptop')
	const [showAltLogo, setShowAltLogo] = useState<boolean>(false)
	const handleShowAltLogo = () => {
		if (window.scrollY > 300) {
			setShowAltLogo(true)
		} else setShowAltLogo(false)
	}
	useEffect(() => {
		window.addEventListener('scroll', handleShowAltLogo)
		return () => {
			window.removeEventListener('scroll', handleShowAltLogo)
		}
	}, [])
	return (
		<div className={styles.container}>
			<Link href="/">
				<div>
					{showAltLogo ? (
						<AltHeaderLogo className={clsx('cursor-pointer', styles.altLogo)} />
					) : (
						<HeaderLogo className={clsx('cursor-pointer', styles.logo)} />
					)}
				</div>
			</Link>
			{matchesLaptop ? (
				<DesktopSubNav showSubNav={!showAltLogo} />
			) : (
				<MobileSubNav />
			)}
		</div>
	)
}

const DesktopSubNav = ({ showSubNav }) => {
	const scrollToFooter = useCallback(() => {
		const top = (document.querySelector('#footer') as HTMLElement).offsetTop
		window.scroll({ behavior: 'smooth', top })
	}, [])

	const [showSearch, setShowSearch] = useState<boolean>(false)

	return (
		<div className={styles.body}>
			{showSubNav && (
				<div className={styles['sub-nav']}>
					<Button type="text" className="font-medium">
						<Link href="/downloads">DOWNLOADS</Link>
					</Button>
					{/* <Button className="ml-4 font-medium">GET IN TOUCH</Button> */}
					<button onClick={() => setShowSearch(true)}>
						<SearchIcon />
					</button>
				</div>
			)}
			<div className={styles.nav}>
				<ul>
					<DesktopNavItem label="About US" href="/about" />

					<DesktopNavItem label="Initiatives" activeHref="/initiatives">
						<ul>
							<Link href="/initiatives/advocacy-and-outreach">
								<li>Advocacy and Outreach</li>
							</Link>
							<Link href="/initiatives/capacity-building">
								<li>Capacity Building</li>
							</Link>
							<Link href="/initiatives/research-and-publication">
								<li>Research and Publication</li>
							</Link>
							<Link href="/initiatives/community-contributions">
								<li>Community Contributions</li>
							</Link>
						</ul>
					</DesktopNavItem>
					<DesktopNavItem href="/associates" label="Associates" />
					<li>SETU</li>
					<DesktopNavItem href="/support" label="Support" />
					<DesktopNavItem href="/blogs" label="Blogs" />
					<li onClick={scrollToFooter}>Contact</li>
				</ul>
			</div>
			<Search showSearch={showSearch} onClose={() => setShowSearch(false)} />
		</div>
	)
}

interface Props {
	label?: string
	href?: string
	activeHref?: string
}

const DesktopNavItem: React.FC<Props> = ({
	href,
	label,
	children,
	activeHref,
}) => {
	const { pathname } = useRouter()
	const [isActive, setIsActive] = useState(false)

	useEffect(() => {
		if (pathname.includes(href) || pathname.includes(activeHref))
			setIsActive(true)
		else setIsActive(false)
	}, [pathname, href, activeHref])

	const content = (
		<li
			className={clsx({
				[styles.active]: isActive,
			})}
		>
			{label}
			{children}
		</li>
	)

	if (!href) {
		return content
	}

	return <Link href={href}>{content}</Link>
}
