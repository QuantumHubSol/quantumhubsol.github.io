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
