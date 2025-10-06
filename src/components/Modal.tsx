import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState, MutableRefObject } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

import close_btn from "@img/controls/modal_close.svg";

import "@sass/components/Modal.scss";

import { Children } from "@types";

type ModalVariant = "xs" | "sm" | "md" | "lg" | "form" | "playbook" | "video";

interface DelayedRenderOptions {
	enterDelay?: number;
	exitDelay?: number;
	onUnmount?: () => void;
}

interface ModalProps {
	children: Children;
	id?: string;
	className?: string;
	onClose: Function;
	show?: boolean;
	variant: ModalVariant;
}

interface ModalContentProps {
	children: Children;
	id: string;
	className: string;
	variant: ModalVariant;
	isVisible: boolean;
	handleClose: undefined | Function;
}

function useDelayedRender(active: boolean = false, options: DelayedRenderOptions = {}) {
	const [, force] = useState<any>();
	const mounted = useRef(active);
	const rendered = useRef(false);
	const renderTimer = useRef<NodeJS.Timeout | null>(null);
	const unmountTimer = useRef<NodeJS.Timeout | null>(null);
	const prevActive = useRef(active);

	const recalculate = useCallback(() => {
		const { enterDelay = 1, exitDelay = 0 } = options;

		if (prevActive.current) {
			// Mount immediately
			mounted.current = true;
			if (unmountTimer.current) clearTimeout(unmountTimer.current);

			if (enterDelay <= 0) {
				// Render immediately
				rendered.current = true;
			} else {
				if (renderTimer.current) return;

				// Render after a delay
				renderTimer.current = setTimeout(() => {
					rendered.current = true;
					renderTimer.current = null;
					force({});
				}, enterDelay);
			}
		} else {
			// Immediately set to unrendered
			rendered.current = false;

			if (exitDelay <= 0) {
				mounted.current = false;
			} else {
				if (unmountTimer.current) return;

				// Unmount after a delay
				unmountTimer.current = setTimeout(() => {
					mounted.current = false;
					unmountTimer.current = null;
					force({});
				}, exitDelay);
			}
		}
	}, [options]);

	// When the active prop changes, need to re-calculate
	if (active !== prevActive.current) {
		prevActive.current = active;
		// We want to do this synchronously with the render, not in an effect
		// this way when active → true, mounted → true in the same pass
		recalculate();
	}

	return {
		mounted: mounted.current,
		rendered: rendered.current,
	};
}

const ModalContent = forwardRef(function ModalContent(
	{ variant, isVisible, id, className, children, handleClose }: ModalContentProps,
	ref: ForwardedRef<unknown>
) {
	return (
		<div id={id} className={clsx("Modal", `variant_${variant}`, { visible: isVisible }, className)} ref={ref}>
			<div role="button" className="bg" onClick={handleClose} aria-hidden="true" />
			<div className="card_wrapper">
				<div className="card">
					<button className="close" onClick={handleClose} aria-label="Close">
						<img src={close_btn} className="h-full w-full" alt="" />
					</button>
					{typeof children.type === "object" && children.type.hasOwnProperty("displayName") && children.type.displayName === "video"
						? React.cloneElement(children, { forceStop: true })
						: children}
				</div>
			</div>
		</div>
	);
});

export default function Modal({ children, id = "", className, onClose, show = true, variant = "med" }: ModalProps): JSX.Element | null {
	const [isOpen, setIsOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [isClient, setIsClient] = useState(false);

	const selfRef = useRef(null) as unknown as MutableRefObject<HTMLElement>;

	const handleClose = useCallback(() => {
		function handleStopVideo() {
			if (!children?.props?.YoutubeID && !children?.props?.sources) {
				return null;
			}

			const { YoutubeID } = children.props;
			const player = document.querySelector(`#iframe_${YoutubeID}`);
			const iframeUrl = player?.src;

			if (player && iframeUrl) {
				player.src = "";
				player.src = iframeUrl;
				return null;
			}

			const videoTag = selfRef.current.querySelector("video");
			if (videoTag) {
				videoTag.pause();
				return null;
			}
		}

		handleStopVideo();

		setIsVisible(false);
		setIsOpen(false);
		onClose && setTimeout(onClose, 600);
	}, []);

	const { mounted } = useDelayedRender(isOpen, {
		exitDelay: 600,
	});

	useEffect(() => {
		setIsOpen(show);
		let isVisibleTimeout = setTimeout(() => setIsVisible(show), 50);
		return () => {
			clearTimeout(isVisibleTimeout);
		};
	}, [show]);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflowY = "hidden";
		} else {
			document.body.style.overflowY = "unset";
		}
	}, [isOpen]);

	useEffect(() => {
		if (typeof document !== "undefined") {
			setIsClient(true);
		}
	}, []);

	if (!isClient) {
		return null;
	}

	// If the Modal is set to host a Video, it should be rendered always and be hidden via CSS.
	// This is to make sure that videos are trackable via GTM/GA4. I know, it's a pain.
	// If the Modal is anything else, then using the Portal makes sense.
	if (mounted || variant === "video") {
		return createPortal(
			<ModalContent variant={variant} isVisible={isVisible} id={id} className={className} children={children} handleClose={handleClose} ref={selfRef} />,
			document.getElementById("modal-portal")
		);
	}
}
