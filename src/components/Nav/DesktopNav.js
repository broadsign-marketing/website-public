import React, { lazy, Suspense, useCallback, useMemo, useState } from "react";
import T from "i18n-react";
import { useL } from "@hooks/useDico";
import clsx from "clsx";

import Link from "@components/LocalizedLink";

const NavDrawerMediaOwners = lazy(() => import("@components/Nav/Drawers/NavDrawerMediaOwners"));
const NavDrawerAgencies = lazy(() => import("@components/Nav/Drawers/NavDrawerAgencies"));
const NavDrawerRetailers = lazy(() => import("@components/Nav/Drawers/NavDrawerRetailers"));
const NavDrawerResources = lazy(() => import("@components/Nav/Drawers/NavDrawerResources"));

export default function DesktopNav() {
	const [activeDrawer, setActiveDrawer] = useState("");
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const l = useL();

	const openDrawer = useCallback((drawerName) => {
		setActiveDrawer(drawerName);
		setIsDrawerOpen(true);
	}, []);

	const closeDrawer = useCallback(() => {
		setIsDrawerOpen(false);
		setActiveDrawer("");
	}, []);

	const topNavSections = useMemo(() => {
		switch (l) {
			case "zh":
				return [{ id: "mediaOwners", type: "drawer" }];
			case "ja":
				return [
					{ id: "mediaOwners", type: "drawer" },
					{ id: "resources", type: "drawer" },
				];
			case "de":
			case "es":
				return [
					{ id: "mediaOwners", type: "drawer" },
					{ id: "retailers", type: "drawer" },
					{ id: "resources", type: "drawer" },
				];
			case "fr":
			case "en":
				return [
					{ id: "mediaOwners", type: "drawer" },
					{ id: "agencies", type: "drawer" },
					{ id: "retailers", type: "drawer" },
					{ id: "resources", type: "drawer" },
				];
			default:
				return [];
		}
	}, [l]);

	return (
		<nav
			className="container main_nav pl-12 hidden md:flex"
			onMouseLeave={() => {
				closeDrawer();
			}}
			onBlur={() => {
				closeDrawer();
			}}>
			{topNavSections.map(({ id, type, to }) => {
				if (type === "link") {
					return (
						<Link
							className={clsx("drawer_link", id, { active: activeDrawer === id })}
							to={to}
							key={id}
							onMouseOver={() => {
								openDrawer(id);
							}}
							onFocus={() => {
								openDrawer(id);
							}}>
							<span className="label_normal">{id === "resources" ? T.translate("nav.resources") : T.translate(`nav.${id}`)}</span>
							<span className="label_hover font-bold absolute">
								{id === "resources" ? T.translate("nav.resources") : T.translate(`nav.${id}`)}
							</span>
						</Link>
					);
				} else {
					return (
						<div
							className={clsx("drawer_link", id, { active: activeDrawer === id })}
							key={id}
							onMouseOver={() => {
								openDrawer(id);
							}}
							onFocus={() => {
								openDrawer(id);
							}}
							onClick={() => {
								openDrawer(id);
							}}>
							<span className="label_normal" dangerouslySetInnerHTML={{ __html: T.translate(`nav.${id}`) }} />
							<span className="label_hover font-bold absolute" dangerouslySetInnerHTML={{ __html: T.translate(`nav.${id}`) }} />
						</div>
					);
				}
			})}
			<div className="spacer"></div>
			<div className={clsx("main_nav__master_drawer rounded-xl shadow-B", { open: isDrawerOpen })}>
				<Suspense fallback={<div />}>
					{["en", "fr", "es", "de", "ja", "zh"].includes(l) && <NavDrawerMediaOwners isActive={activeDrawer === "mediaOwners"} />}
				</Suspense>
				<Suspense fallback={<div />}>{["en", "fr"].includes(l) && <NavDrawerAgencies isActive={activeDrawer === "agencies"} />}</Suspense>
				<Suspense fallback={<div />}>{["en", "fr", "es", "de"].includes(l) && <NavDrawerRetailers isActive={activeDrawer === "retailers"} />}</Suspense>
				<Suspense fallback={<div />}>
					{["en", "fr", "es", "de", "ja"].includes(l) && <NavDrawerResources isActive={activeDrawer === "resources"} />}
				</Suspense>
			</div>
		</nav>
	);
}
