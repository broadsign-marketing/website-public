/**
 * File cta-tiles.js.
 *
 * Loads helpers for the cta-tile Custom Post Type
 */
(function () {
	const acfBgColorFieldID = "64247627d959e";
	const acfBgImageFieldID = "642308357f142";
	const acfTextColorFieldID = "64249bf83f765";

	const acfBgColorFieldSelector = `.acf-field-${acfBgColorFieldID} .selected input[name='acf[field_${acfBgColorFieldID}]']`;
	const acfBgImageFieldSelector = `.acf-field-${acfBgImageFieldID} .acf-switch`;
	const acfTextColorFieldSelector = `.acf-field-${acfTextColorFieldID} .selected input[name='acf[field_${acfTextColorFieldID}]']`;

	function getBgImageURL() {
		const featureImageURL = jQuery(".editor-post-featured-image img.components-responsive-wrapper__content");
		if (featureImageURL.length) {
			return featureImageURL.attr("src").replace(/(-\d+x\d+)(\.\w{3,4})$/i, "$2");
		}
		return "";
	}

	function setBgColorBasedOnACF(newBgColor) {
		if (newBgColor) {
			jQuery(".BlogCTATile").removeClass(function (index, className) {
				return (className.match(/(^|\s)bg-\S+/g) || []).join(" ");
			});

			jQuery(".BlogCTATile").addClass(`bg-${newBgColor}`);
		}
	}

	function setBgImageBasedOnACF() {
		setTimeout(() => {
			const isCheckboxChecked = jQuery(`${acfBgImageFieldSelector}.-on`).length;
			if (isCheckboxChecked) {
				const backgroundImage = getBgImageURL();
				if (backgroundImage) {
					jQuery(".BlogCTATile").css("background-image", `url(${backgroundImage})`);
					return;
				}
			}
			jQuery(".BlogCTATile").css("background-image", `none`);
		}, 200);
	}

	function setTextColorBasedOnACF(newBgColor) {
		if (newBgColor) {
			jQuery(".BlogCTATile").removeClass(function (index, className) {
				return (className.match(/(^|\s)text-\S+/g) || []).join(" ");
			});

			jQuery(".BlogCTATile").addClass(`text-${newBgColor}`);
		}
	}

	jQuery(document).ready(function () {
		const wpcInterval = setInterval(function () {
			if (jQuery(".wp-block-post-content").length) {
				jQuery(".wp-block-post-content").wrap('<div class="BlogCTATile blog_item blog_item_cta has_CTA"></div>');
				clearInterval(wpcInterval);
			}
		}, 200);

		const acfInterval = setInterval(function () {
			if (jQuery(acfBgColorFieldSelector).val()) {
				setBgColorBasedOnACF(jQuery(acfBgColorFieldSelector).val());
				setTextColorBasedOnACF(jQuery(acfTextColorFieldSelector).val());
				clearInterval(acfInterval);
			}
		}, 200);

		const featureImageInterval = setInterval(function () {
			const useFeatureImageCheck = jQuery(`${acfBgImageFieldSelector}.-on`);
			if (getBgImageURL() && useFeatureImageCheck.length) {
				setBgImageBasedOnACF();
				clearInterval(featureImageInterval);
			}
		}, 200);
	});

	// AMEND WHEN PUSHING TO PROD, TO GET THE RIGHT FIELD NAMES

	jQuery(document).on("change", `input[name='acf[field_${acfBgColorFieldID}]']`, function () {
		setBgColorBasedOnACF(jQuery(this).val());
	});

	jQuery(document).on("mouseup", jQuery(acfBgImageFieldSelector), function () {
		setBgImageBasedOnACF();
	});

	jQuery(document).on("change", `input[name='acf[field_${acfTextColorFieldID}]']`, function () {
		setTextColorBasedOnACF(jQuery(this).val());
	});
})();
