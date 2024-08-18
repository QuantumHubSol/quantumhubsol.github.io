document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const sidebarMenu = sidebar.querySelector('.nav-menu');
    const navMenu = document.getElementById('dynamicNavMenu');
    
    hamburger.addEventListener('click', function() {
        sidebar.classList.toggle('show');
    });

    function populateMenu(menuElement, menuItems) {
        menuElement.innerHTML = ''; // Clear any existing items
        menuItems.forEach(item => {
            const li = document.createElement('li');
            li.className = 'nav-item';
            if (item.dropdown) {
                li.classList.add('dropdown');
            }

            const a = document.createElement('a');
            a.href = item.link;
            a.textContent = item.name;

            li.appendChild(a);

            if (item.dropdown) {
                const ul = document.createElement('ul');
                ul.className = 'dropdown-menu';
                item.dropdown.forEach(dropItem => {
                    const dropLi = document.createElement('li');
                    const dropA = document.createElement('a');
                    dropA.href = dropItem.link;
                    dropA.className = 'dropdown-link';
                    dropA.textContent = dropItem.name;
                    dropLi.appendChild(dropA);
                    ul.appendChild(dropLi);
                });
                li.appendChild(ul);
            }

            if (item.icon) {
                const img = document.createElement('img');
                img.src = item.icon;
                img.alt = item.name + ' Icon';
                img.className = 'nav-icon';
                a.appendChild(img);
            }

            menuElement.appendChild(li);
        });
    }

    function handleMenuPopulation() {
        fetch('menu.json')
            .then(response => response.json())
            .then(data => {
                if (window.innerWidth <= 768) {
                    populateMenu(sidebarMenu, data.menuItems);
                    navMenu.innerHTML = ''; // Clear the desktop menu
                } else {
                    populateMenu(navMenu, data.menuItems);
                    sidebarMenu.innerHTML = ''; // Clear the sidebar menu
                }
            })
            .catch(error => console.error('Error loading the menu:', error));
    }

    // Initial population
    handleMenuPopulation();

    // Re-populate on window resize to handle screen size changes
    window.addEventListener('resize', handleMenuPopulation);
});
document.addEventListener('DOMContentLoaded', function() {
    fetch('footer-data.json')
        .then(response => response.json())
        .then(data => {
            const footer = document.getElementById('dynamicFooter');
            footer.className = 'footer';

            const footerContainer = document.createElement('div');
            footerContainer.className = 'footer-container';

            data.footerSections.forEach(section => {
                const sectionDiv = document.createElement('div');
                sectionDiv.className = 'footer-section';

                const title = document.createElement('h3');
                title.textContent = section.title;
                sectionDiv.appendChild(title);

                if (section.content) {
                    const content = document.createElement('p');
                    content.textContent = section.content;
                    sectionDiv.appendChild(content);
                }

                if (section.links) {
                    const ul = document.createElement('ul');
                    section.links.forEach(link => {
                        const li = document.createElement('li');
                        const a = document.createElement('a');
                        a.href = link.url;
                        a.textContent = link.name;
                        li.appendChild(a);
                        ul.appendChild(li);
                    });
                    sectionDiv.appendChild(ul);
                }

                if (section.contactInfo) {
                    const ul = document.createElement('ul');
                    section.contactInfo.forEach(info => {
                        const li = document.createElement('li');
                        li.textContent = `${info.type}: ${info.value}`;
                        ul.appendChild(li);
                    });
                    sectionDiv.appendChild(ul);
                }

                footerContainer.appendChild(sectionDiv);
            });

            footer.appendChild(footerContainer);

            const footerBottom = document.createElement('div');
            footerBottom.className = 'footer-bottom';
            const copyright = document.createElement('p');
            copyright.textContent = data.copyrightText;
            footerBottom.appendChild(copyright);
            footer.appendChild(footerBottom);
        })
        .catch(error => console.error('Error loading the footer:', error));
});