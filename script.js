const menuIcon =
    document.getElementById("menuIcon");

const navLinks =
    document.getElementById("navLinks");

const typingText =
    document.getElementById("typing");

const contactForm =
    document.getElementById("contactForm");

const backToTop =
    document.getElementById("backToTop");

const toast =
    document.getElementById("toast");

const header =
    document.querySelector(".site-header");

const navItems =
    document.querySelectorAll(".nav-link");

const sections =
    document.querySelectorAll("main section[id]");

if (menuIcon && navLinks) {

    menuIcon.addEventListener(
        "click",
        () => {

            const isOpen =
                navLinks.classList.toggle("active");

            menuIcon.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            const icon =
                menuIcon.querySelector("i");

            if (icon) {

                if (isOpen) {

                    icon.classList.remove(
                        "fa-bars"
                    );

                    icon.classList.add(
                        "fa-xmark"
                    );

                } else {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }

        }
    );

}

navItems.forEach(
    (link) => {

        link.addEventListener(
            "click",
            () => {

                if (!navLinks) {
                    return;
                }

                navLinks.classList.remove(
                    "active"
                );

                if (menuIcon) {

                    menuIcon.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    const icon =
                        menuIcon.querySelector("i");

                    if (icon) {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }

            }
        );

    }
);

const words = [

    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Web Application Developer",
    "Full Stack Web Developer"

];

let wordIndex =
    0;

let charIndex =
    0;

let isDeleting =
    false;

function typeEffect() {

    if (!typingText) {
        return;
    }

    const currentWord =
        words[wordIndex];

    if (isDeleting) {

        charIndex--;

    } else {

        charIndex++;

    }

    typingText.textContent =
        currentWord.substring(
            0,
            charIndex
        );

    let speed =
        isDeleting
            ? 55
            : 95;

    if (
        !isDeleting &&
        charIndex === currentWord.length
    ) {

        speed =
            1800;

        isDeleting =
            true;

    }

    else if (
        isDeleting &&
        charIndex === 0
    ) {

        isDeleting =
            false;

        wordIndex++;

        if (
            wordIndex >=
            words.length
        ) {

            wordIndex =
                0;

        }

        speed =
            450;

    }

    setTimeout(
        typeEffect,
        speed
    );

}

if (typingText) {

    typeEffect();

}

function showToast(
    title = "Message Ready",
    message = "Your message has been received."
) {

    if (!toast) {
        return;
    }

    const titleElement =
        toast.querySelector("strong");

    const messageElement =
        toast.querySelector("span");

    if (titleElement) {

        titleElement.textContent =
            title;

    }

    if (messageElement) {

        messageElement.textContent =
            message;

    }

    toast.classList.add(
        "show"
    );

    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },
        3500
    );

}

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            const nameInput =
                document.getElementById(
                    "contactName"
                );

            const emailInput =
                document.getElementById(
                    "contactEmail"
                );

            const messageInput =
                document.getElementById(
                    "message"
                );

            const name =
                nameInput
                    ? nameInput.value.trim()
                    : "";

            const email =
                emailInput
                    ? emailInput.value.trim()
                    : "";

            const message =
                messageInput
                    ? messageInput.value.trim()
                    : "";

            if (
                !name ||
                !email ||
                !message
            ) {

                showToast(
                    "Missing Information",
                    "Please complete all fields."
                );

                return;

            }

            showToast(
                "Message Ready",
                "Thank you, " +
                name +
                "! Your message has been received."
            );

            contactForm.reset();

        }
    );

}

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );

if (
    "IntersectionObserver"
    in window
) {

    const observer =
        new IntersectionObserver(
            (
                entries,
                observerInstance
            ) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observerInstance.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );

    revealElements.forEach(
        (element) => {

            observer.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        (element) => {

            element.classList.add(
                "visible"
            );

        }
    );

}

function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 180;

    sections.forEach(
        (section) => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            const sectionId =
                section.getAttribute(
                    "id"
                );

            if (
                scrollPosition >=
                    sectionTop &&

                scrollPosition <
                    sectionTop +
                    sectionHeight
            ) {

                navItems.forEach(
                    (item) => {

                        item.classList.remove(
                            "active"
                        );

                        if (
                            item.getAttribute(
                                "href"
                            ) ===
                            "#" + sectionId
                        ) {

                            item.classList.add(
                                "active"
                            );

                        }

                    }
                );

            }

        }
    );

}

function handleScroll() {

    const scrollPosition =
        window.scrollY;

    if (header) {

        if (
            scrollPosition > 40
        ) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }

    if (backToTop) {

        if (
            scrollPosition > 500
        ) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }

    updateActiveNavigation();

}

window.addEventListener(
    "scroll",
    handleScroll,
    {
        passive: true
    }
);

handleScroll();

if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key ===
            "Escape"
        ) {

            if (navLinks) {

                navLinks.classList.remove(
                    "active"
                );

            }

            if (menuIcon) {

                menuIcon.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon =
                    menuIcon.querySelector("i");

                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }

        }

    }
);

const certificationLinks =
    document.querySelectorAll(
        ".certification-link"
    );

certificationLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            (event) => {

                const href =
                    link.getAttribute(
                        "href"
                    );

                if (
                    !href ||
                    href === "#"
                ) {

                    event.preventDefault();

                    showToast(
                        "Certificate Link",
                        "Add your certificate URL here."
                    );

                }

            }
        );

    }
);

const hashLinks =
    document.querySelectorAll(
        'a[href="#"]'
    );

hashLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

            }
        );

    }
);

const spatialCards =
    document.querySelectorAll(
        ".technology-card, .skill-area, .project-card, .hobby-card, .certification-card"
    );

spatialCards.forEach(
    (card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (
                    window.innerWidth <
                    900
                ) {

                    return;

                }

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((y - centerY) /
                        centerY) *
                    -2;

                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    2;

                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-4px)`;

            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    }
);

const profileImageWrapper =
    document.querySelector(
        ".profile-image-wrapper"
    );

if (profileImageWrapper) {

    profileImageWrapper.addEventListener(
        "mousemove",
        (event) => {

            if (
                window.innerWidth <
                900
            ) {

                return;

            }

            const rect =
                profileImageWrapper.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) /
                    centerY) *
                -2;

            const rotateY =
                ((x - centerX) /
                    centerX) *
                2;

            profileImageWrapper.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-7px)
                 scale(1.015)`;

        }
    );

    profileImageWrapper.addEventListener(
        "mouseleave",
        () => {

            profileImageWrapper.style.transform =
                "";

        }
    );

}

const buttons =
    document.querySelectorAll(
        ".btn, .github-btn, .certification-link"
    );

buttons.forEach(
    (button) => {

        button.addEventListener(
            "mousedown",
            () => {

                button.style.transform =
                    "scale(0.97)";

            }
        );

        button.addEventListener(
            "mouseup",
            () => {

                button.style.transform =
                    "";

            }
        );

        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "";

            }
        );

    }
);

console.log(
    "%cPrem Kumar Pandey Portfolio",
    "font-size:18px;font-weight:bold;color:#5ee7ff;"
);

console.log(
    "%cBuilt with HTML, CSS & JavaScript",
    "font-size:12px;color:#9ba7c7;"
);