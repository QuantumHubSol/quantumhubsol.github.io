document.addEventListener('DOMContentLoaded', function() {
    fetch('menu.json')
        .then(response => response.json())
        .then(data => {
            const navMenu = document.getElementById('dynamicNavMenu');
            data.menuItems.forEach(item => {
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
                
                navMenu.appendChild(li);
            });
        })
        .catch(error => console.error('Error loading the menu:', error));
        const showMoreBtn = document.querySelector('.show-more');
    const content = document.querySelector('.content');

    showMoreBtn.addEventListener('click', function() {
        content.classList.toggle('expanded');
        if (content.classList.contains('expanded')) {
            showMoreBtn.textContent = 'Show less';
        } else {
            showMoreBtn.textContent = 'Show more';
        }
    });
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