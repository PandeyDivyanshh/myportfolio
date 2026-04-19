// ==========================================
// Portfolio — Divyansh Pandey
// Interactive JS — Professional Version v2
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // --- Loader ---
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.classList.add("hidden");
    }, 1800);

    // --- Floating Particles ---
    const canvas = document.getElementById("particles");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let particles = [];
        let w, h;

        function resizeCanvas() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.opacity = Math.random() * 0.4 + 0.1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > w) this.speedX *= -1;
                if (this.y < 0 || this.y > h) this.speedY *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 169, 126, ${this.opacity})`;
                ctx.fill();
            }
        }

        // Create particles
        const numParticles = Math.min(60, Math.floor(w * h / 20000));
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }

        // Draw connection lines between nearby particles
        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(200, 169, 126, ${0.06 * (1 - dist / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, w, h);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            drawConnections();
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // --- Scroll Progress Bar ---
    const scrollProgress = document.getElementById("scrollProgress");
    if (scrollProgress) {
        window.addEventListener("scroll", () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = progress + "%";
        }, { passive: true });
    }

    // --- Custom Cursor ---
    const cursor = document.getElementById("cursor");
    const follower = document.getElementById("cursorFollower");

    if (cursor && follower && window.matchMedia("(hover: hover)").matches) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX - 4 + "px";
            cursor.style.top = mouseY - 4 + "px";
        });

        function animateFollower() {
            followerX += (mouseX - followerX - 18) * 0.12;
            followerY += (mouseY - followerY - 18) * 0.12;
            follower.style.left = followerX + "px";
            follower.style.top = followerY + "px";
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // Hover effect on interactive elements
        const hoverTargets = document.querySelectorAll("a, button, .skill-card, .project-card, .cert-card, .detail-card");
        hoverTargets.forEach(el => {
            el.addEventListener("mouseenter", () => {
                cursor.classList.add("hover");
                follower.classList.add("hover");
            });
            el.addEventListener("mouseleave", () => {
                cursor.classList.remove("hover");
                follower.classList.remove("hover");
            });
        });
    }

    // --- Magnetic Hover on Buttons ---
    const magneticElements = document.querySelectorAll(".hero-btn, .nav-contact-btn, .submit-btn, .social-link, .back-to-top");
    magneticElements.forEach(el => {
        el.addEventListener("mousemove", (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        el.addEventListener("mouseleave", () => {
            el.style.transform = "";
        });
    });

    // --- Tilt Effect on Cards ---
    const tiltCards = document.querySelectorAll(".skill-card, .project-card, .cert-card, .detail-card");
    tiltCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });

    // --- Active Nav Highlight on Scroll ---
    const sections = document.querySelectorAll("section[id]");
    const navAnchors = document.querySelectorAll(".nav-links a[data-num]");

    function highlightNav() {
        const scrollY = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");
            if (scrollY >= top && scrollY < top + height) {
                navAnchors.forEach(a => {
                    a.classList.remove("active");
                    if (a.getAttribute("href") === "#" + id) {
                        a.classList.add("active");
                    }
                });
            }
        });
    }
    window.addEventListener("scroll", highlightNav, { passive: true });

    // --- Mobile menu toggle ---
    const toggle = document.getElementById("navToggle");
    const links = document.getElementById("navLinks");

    if (toggle && links) {
        toggle.addEventListener("click", () => {
            toggle.classList.toggle("active");
            links.classList.toggle("open");
        });

        links.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                toggle.classList.remove("active");
                links.classList.remove("open");
            });
        });
    }

    // --- Navbar scroll ---
    const navbar = document.getElementById("navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            navbar.classList.toggle("scrolled", window.scrollY > 20);
        }, { passive: true });
    }

    // --- Smooth scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", (e) => {
            const target = document.querySelector(anchor.getAttribute("href"));
            if (target) {
                e.preventDefault();
                const y = target.getBoundingClientRect().top + window.scrollY - 64;
                window.scrollTo({ top: y, behavior: "smooth" });
            }
        });
    });

    // --- Back to top ---
    const backBtn = document.getElementById("backToTop");
    if (backBtn) {
        backBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // --- Typing Animation ---
    const typingEl = document.getElementById("typingText");
    if (typingEl) {
        const phrases = [
            "AI / ML Developer",
            "Deep Learning Enthusiast",
            "LangChain Builder",
            "Problem Solver"
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 80;

        function typeEffect() {
            const current = phrases[phraseIndex];

            if (isDeleting) {
                typingEl.textContent = current.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 40;
            } else {
                typingEl.textContent = current.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 80;
            }

            if (!isDeleting && charIndex === current.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 400;
            }

            setTimeout(typeEffect, typeSpeed);
        }

        setTimeout(typeEffect, 2000);
    }

    // --- Reveal on Scroll (staggered) ---
    const revealTargets = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add("visible");
                    }, i * 100);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

        revealTargets.forEach(el => revealObserver.observe(el));
    } else {
        revealTargets.forEach(el => el.classList.add("visible"));
    }

    // --- Skill Bars Animation ---
    const skillBars = document.querySelectorAll(".skill-fill");

    if ("IntersectionObserver" in window && skillBars.length) {
        const barObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute("data-width");
                    entry.target.style.width = width + "%";
                    barObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        skillBars.forEach(bar => barObserver.observe(bar));
    }

    // --- Counter Animation for Stats ---
    const statNumbers = document.querySelectorAll(".stat-number");

    if ("IntersectionObserver" in window && statNumbers.length) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseFloat(entry.target.getAttribute("data-target"));
                    const isDecimal = target % 1 !== 0;
                    const duration = 1500;
                    const start = performance.now();

                    function updateCounter(now) {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const current = eased * target;

                        if (isDecimal) {
                            entry.target.textContent = current.toFixed(1);
                        } else {
                            entry.target.textContent = Math.floor(current);
                        }

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        }
                    }

                    requestAnimationFrame(updateCounter);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(num => counterObserver.observe(num));
    }

    // --- Parallax on Hero Image ---
    const heroImage = document.querySelector(".hero-image-frame img");
    if (heroImage) {
        window.addEventListener("scroll", () => {
            const scrollY = window.scrollY;
            if (scrollY < window.innerHeight) {
                heroImage.style.transform = `scale(1.05) translateY(${scrollY * 0.08}px)`;
            }
        }, { passive: true });
    }

    // --- Section title text scramble on reveal ---
    const sectionTitles = document.querySelectorAll(".section-title");
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

    if ("IntersectionObserver" in window) {
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const original = el.textContent;
                    let iteration = 0;
                    const interval = setInterval(() => {
                        el.textContent = original
                            .split("")
                            .map((char, index) => {
                                if (index < iteration) return original[index];
                                if (char === " ") return " ";
                                return chars[Math.floor(Math.random() * chars.length)];
                            })
                            .join("");
                        iteration += 1 / 2;
                        if (iteration >= original.length) {
                            el.textContent = original;
                            clearInterval(interval);
                        }
                    }, 30);
                    titleObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        sectionTitles.forEach(title => titleObserver.observe(title));
    }

    // --- Contact Form ---
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            const btn = form.querySelector(".submit-btn span");
            if (btn) {
                btn.textContent = "Sending...";
            }
        });
    }
});
