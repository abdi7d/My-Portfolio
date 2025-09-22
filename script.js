// EmailJS
emailjs.init("rP3Q--SoF8J4DHCCD");

document.getElementById("contactForm").addEventListener("submit", function(e){
  e.preventDefault();
  emailjs.sendForm("service_qbzzrxn","template_mnld11s",this)
  .then(()=>{ Swal.fire({ icon:"success", title:"Message Sent!", text:"Your message has been sent successfully." }); this.reset(); })
  .catch(err=>{ Swal.fire({ icon:"error", title:"Oops...", text:"Failed to send message." }); console.error(err); });
});


// Smooth scroll for navbar links
document.querySelectorAll(".nav-links a").forEach(link=>{
  link.addEventListener("click", e=>{
    e.preventDefault();
    document.querySelector(link.getAttribute("href")).scrollIntoView({ behavior:"smooth" });
  });
});

// Typing effect
const typingElement = document.querySelector(".typing");
// const texts = ["Software Engineer","Agentic AI Developer","Frontend Web Developer","Passionate Problem Solver"];
const texts = ["an Agentic AI Developer","a Frontend Developer","a Passionate Problem Solver"];
let textIndex=0, charIndex=0, typingDelay=150, erasingDelay=100, newTextDelay=1500;

function type(){ if(charIndex<texts[textIndex].length){ typingElement.textContent += texts[textIndex].charAt(charIndex); charIndex++; setTimeout(type,typingDelay); } else{ setTimeout(erase,newTextDelay); } }
function erase(){ if(charIndex>0){ typingElement.textContent = texts[textIndex].substring(0,charIndex-1); charIndex--; setTimeout(erase,erasingDelay); } else{ textIndex=(textIndex+1)%texts.length; setTimeout(type,typingDelay); } }
document.addEventListener("DOMContentLoaded",()=>{ if(texts.length) setTimeout(type,newTextDelay); });

// Dark/Light mode
const themeBtn = document.getElementById("themeBtn");
themeBtn.addEventListener("click", ()=>{
  document.body.classList.toggle("dark");
  themeBtn.innerHTML = document.body.classList.contains("dark") ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark":"light");
});
if(localStorage.getItem("theme")==="dark"){ document.body.classList.add("dark"); themeBtn.innerHTML='<i class="fas fa-sun"></i>'; }




/* =========================
   Section reveal & active nav link
   ========================= */
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".nav-link");

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      // set active nav
      const id = entry.target.getAttribute("id");
      navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
    }
  });
}, { threshold: 0.25 });

sections.forEach(s => io.observe(s));

/* Smooth scrolling for internal links */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href || href === "#") return;
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    // close mobile nav if open
    document.getElementById("primary-nav")?.classList.remove("show");
    document.getElementById("navToggle")?.setAttribute("aria-expanded", "false");
  });
});



/* =========================
   Project filter + search
   ========================= */
const filterBtns = document.querySelectorAll(".filter-btn");
const projectsGrid = document.getElementById("projectsGrid");
const projectSearch = document.getElementById("projectSearch");

function filterProjects(filter, searchTerm="") {
  const cards = projectsGrid ? Array.from(projectsGrid.querySelectorAll(".project-card")) : [];
  cards.forEach(card => {
    const type = card.dataset.type || "all";
    const title = (card.dataset.title || card.querySelector("h3")?.innerText || "").toLowerCase();
    const matchesFilter = filter === "all" || type === filter;
    const matchesSearch = !searchTerm || title.includes(searchTerm.toLowerCase());
    card.style.display = (matchesFilter && matchesSearch) ? "" : "none";
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    filterProjects(filter, projectSearch?.value || "");
  });
});

projectSearch && projectSearch.addEventListener("input", (e) => {
  const active = document.querySelector(".filter-btn.active")?.dataset.filter || "all";
  filterProjects(active, e.target.value);
});








// Visitor counter using CountAPI

// Check if the user has already visited
if (!localStorage.getItem('visited')) {
  // Increment the counter only once
  fetch('https://api.countapi.xyz/hit/abdi-portfolio-website/views')
    .then(res => res.json())
    .then(res => {
      const counterElement = document.getElementById("visitor-count");
      if (counterElement) counterElement.innerText = res.value;
    })
    .catch(err => console.error('Error fetching visitor count:', err));

  // Mark this user as visited
  localStorage.setItem('visited', 'true');
} else {
  // Just fetch current count without incrementing
  fetch('https://api.countapi.xyz/get/abdi-portfolio-website/views')
    .then(res => res.json())
    .then(res => {
      const counterElement = document.getElementById("visitor-count");
      if (counterElement) counterElement.innerText = res.value;
    });
}
