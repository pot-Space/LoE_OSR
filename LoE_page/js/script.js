"use strict";

const content = document.querySelector(".content"),
	contentBlock = document.querySelector(".content__block"),
	navMainMenu = document.querySelector(".main-menu"),
	navMainMenuShadow = document.querySelector(".main-menu__shadow"),
	sideMenuContent = document.querySelector(".side-menu__content"),
	sideMenuSwitchButton = document.querySelector(".side-menu__content_switch"),
	toTopButton = document.querySelector(".to-top");

function animationHeader() {
	var oldScroll = 0,
		animationCount = true;

	document.addEventListener("scroll", () => {    
		if (window.scrollY < oldScroll) {
			navMainMenu.style.width = `${navMainMenu.offsetWidth}px`;
			navMainMenu.style.position = "fixed";
			navMainMenuShadow.style.display = "block";
			if (animationCount) {
				navMainMenu.style.transform = `translateY(-${navMainMenu.offsetHeight + navMainMenuShadow.offsetHeight}px)`;
				anime({
					targets: navMainMenu,
					translateY: 0,
					duration: 1200,
					easing: "easeInOutExpo"
				});
				animationCount = false;
			}
		} 
		if (window.scrollY > oldScroll) {
			if (!animationCount) {
				anime({
					targets: navMainMenu,
					translateY: -100,
					duration: 1000,
					easing: "easeInOutExpo",
				});
				animationCount = true;
			}
		}
		if (window.scrollY === 0) {
			navMainMenu.style.width = "100%";
			navMainMenu.style.position = "relative";
			navMainMenu.style.transform = "translateY(0px)";
			navMainMenuShadow.style.display = "none";
		}
		oldScroll = window.scrollY;
	});
}
animationHeader();

document.querySelector(".side-menu__cover").style.height = `${document.querySelector(".side-menu__content").offsetHeight}px`;

// Side menu
sideMenuSwitchButton.addEventListener("click", () => {
	if (!sideMenuContent.classList.contains("open")) {
		sideMenuContent.classList.toggle("open");
		anime({
			targets: sideMenuContent,
			duration: 1100,
			translateX: 290
		});
		anime({
			targets: ".side-menu__content_switch_rotate",
			duration: 1000,
			rotate: "180deg"
		});
	} else {
		sideMenuContent.classList.toggle("open");
		anime({
			targets: sideMenuContent,
			translateX: 0
		});
		anime({
			targets: ".side-menu__content_switch_rotate",
			duration: 1000,
			rotate: "0deg"
		});
	}
});

// Button to-top
document.onscroll = () => {
	if(document.documentElement.scrollTop > document.documentElement.clientHeight) {
		toTopButton.style.display = "block";
		toTopButton.style.transform = `translateX(${contentBlock.offsetWidth - parseInt(window.getComputedStyle(content, null).paddingRight)}px)`;
		window.onresize = () => {
			toTopButton.style.transform = `translateX(${contentBlock.offsetWidth - parseInt(window.getComputedStyle(content, null).paddingRight)}px)`;
		};
	} else (
		toTopButton.style.display = "none"
	);
};

toTopButton.onclick = () => window.scrollTo({ top: 0, left: 0, behavior: "smooth" });