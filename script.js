
const projectList = document.getElementById("project-list");

fetch("projects.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Projects could not be loaded.");
        }
        return response.json();
    })
    .then(projects => {
        projectList.innerHTML = "";

        projects.forEach(project => {
            const card = document.createElement("div");
            card.className = "project-item";

            const title = document.createElement("h3");
            title.textContent = project.title;

            const description = document.createElement("p");
            description.textContent = project.description;

            const technologies = document.createElement("p");
            technologies.textContent =
                "Technologies: " + project.technologies;

            const role = document.createElement("p");
            role.textContent = "Role: " + project.role;

            const buttons = document.createElement("div");
            buttons.className = "project-buttons";

            if (project.link) {
                const source = document.createElement("a");
                source.href = project.link;
                source.target = "_blank";
                source.rel = "noopener noreferrer";
                source.className = "project-btn";
                source.textContent = "View Source Code";
                buttons.appendChild(source);
            }

            if (project.live) {
                const run = document.createElement("a");
                run.href = project.live;
                run.target = "_blank";
                run.rel = "noopener noreferrer";
                run.className = "project-btn live-btn";
                run.textContent = "Run Application";
                buttons.appendChild(run);
            }

            card.append(
                title,
                description,
                technologies,
                role,
                buttons
            );

            projectList.appendChild(card);
        });
    })
    .catch(error => {
        projectList.textContent =
            "Unable to load projects. Please try again later.";
        console.error(error);
    });


const githubUsername = "JohnPeterBullos";
const githubList = document.getElementById("github-list");

fetch(
    `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=5`
)
    .then(response => {
        if (!response.ok) {
            throw new Error("GitHub repositories could not be loaded.");
        }
        return response.json();
    })
    .then(repositories => {
        githubList.innerHTML = "";

        repositories.forEach(repo => {
            const card = document.createElement("div");
            card.className = "project-item";

            const title = document.createElement("h3");
            title.textContent = repo.name;

            const language = document.createElement("p");
            language.textContent =
                "Main Language: " + (repo.language || "Not specified");

            const link = document.createElement("a");
            link.href = repo.html_url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.className = "project-btn";
            link.textContent = "View Repository";

            card.append(title, language, link);
            githubList.appendChild(card);
        });
    })
    .catch(error => {
        githubList.textContent =
            "GitHub repositories are currently unavailable.";
        console.error(error);
    });


const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const formMessage = document.getElementById("form-message");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
        formMessage.textContent = "Please fill in all fields.";
        return;
    }

    if (!emailPattern.test(email)) {
        formMessage.textContent = "Please enter a valid email address.";
        return;
    }

    formMessage.textContent =
        "Form validated. Message sending is not configured yet.";

    contactForm.reset();
});


const backToTop = document.getElementById("back-to-top");

backToTop.style.display = "none";

window.addEventListener("scroll", function() {
    backToTop.style.display =
        window.scrollY > 300 ? "flex" : "none";
});

backToTop.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
