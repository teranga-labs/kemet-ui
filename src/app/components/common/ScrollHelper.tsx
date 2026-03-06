import { ArrowDown, ArrowUp } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

interface ScrollHelperProps {
	scrollContainerRef: React.RefObject<HTMLElement | null>
}

export default function ScrollHelper({ scrollContainerRef }: ScrollHelperProps) {
	const [showScrollTop, setShowScrollTop] = useState(false)
	const [showScrollBottom, setShowScrollBottom] = useState(false)
	const rafId = useRef<number>(0)

	const updateVisibility = useCallback(() => {
		const el = scrollContainerRef.current
		if (!el) return

		const { scrollTop, scrollHeight, clientHeight } = el
		const threshold = 300

		setShowScrollTop(scrollTop > threshold)
		setShowScrollBottom(scrollTop + clientHeight < scrollHeight - threshold)
	}, [scrollContainerRef])

	useEffect(() => {
		const el = scrollContainerRef.current
		if (!el) return

		const handleScroll = () => {
			cancelAnimationFrame(rafId.current)
			rafId.current = requestAnimationFrame(updateVisibility)
		}

		// Initial check
		updateVisibility()

		el.addEventListener('scroll', handleScroll, { passive: true })
		return () => {
			el.removeEventListener('scroll', handleScroll)
			cancelAnimationFrame(rafId.current)
		}
	}, [scrollContainerRef, updateVisibility])

	const scrollToTop = () => {
		scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const scrollToBottom = () => {
		const el = scrollContainerRef.current
		if (!el) return
		el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
	}

	return (
		<div className='fixed right-6 bottom-24 z-50 flex flex-col gap-2 sm:bottom-8'>
			{showScrollTop && (
				<button
					onClick={scrollToTop}
					aria-label='Scroll to top'
					className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-zinc-800 text-white shadow-lg transition-opacity hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-300'
				>
					<ArrowUp size={20} />
				</button>
			)}
			{showScrollBottom && (
				<button
					onClick={scrollToBottom}
					aria-label='Scroll to bottom'
					className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-zinc-800 text-white shadow-lg transition-opacity hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-300'
				>
					<ArrowDown size={20} />
				</button>
			)}
		</div>
	)
}
