const header = document.getElementById("header");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const menuToggle = document.getElementById("menuToggle");
const navLinksBox = document.getElementById("navLinks");
const backTop = document.getElementById("backTop");
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

function handleScroll() {
    header.classList.toggle("scrolled", window.scrollY > 20);
    backTop.classList.toggle("show", window.scrollY > 500);

    let current = "home";
    sections.forEach(section => {
        const top = section.offsetTop - 150;
        if (window.scrollY >= top) current = section.id;
    });

    navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
}

window.addEventListener("scroll", handleScroll);
handleScroll();

menuToggle.addEventListener("click", () => {
    const opened = navLinksBox.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", opened);
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinksBox.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));



document.getElementById("year").textContent = new Date().getFullYear();
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const subject = document.querySelector('input[name="subject"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    const body =
        "Name: " + name +
        "\nEmail: " + email +
        "\n\nMessage:\n" + message;

    const gmailURL =
        "https://mail.google.com/mail/?view=cm&fs=1" +
        "&to=sowjanya.potnuri24@gmail.com" +
        "&su=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

    window.open(gmailURL, "_blank");
});