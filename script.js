// Tab switching
  document.querySelectorAll('.tab-btns button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.tab-btns button').forEach(b=>b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });

  // Mobile menu toggle
  const burger = document.getElementById('burger');
  const links = document.querySelector('nav.links');

  function openMenu(){
    links.style.display = 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = '64px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.background = '#fff';
    links.style.padding = '16px 20px';
    links.style.borderBottom = '1px solid var(--line)';
    links.style.zIndex = '40';
    links.style.maxHeight = 'calc(100vh - 64px)';
    links.style.overflowY = 'auto';
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  
  function closeMenu(){
    links.style.display = 'none';
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', (e)=>{
    e.stopPropagation();
    const isOpen = links.style.display === 'flex';
    isOpen ? closeMenu() : openMenu();
  });

  // Close the mobile menu after tapping a nav link
  links.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=>{
      if (window.innerWidth <= 1000) closeMenu();
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e)=>{
    if (links.style.display === 'flex' && !e.target.closest('nav') && !e.target.closest('.burger')){
      closeMenu();
    }
  });

  // Reset inline menu styles when resizing back to desktop width
  window.addEventListener('resize', ()=>{
    if (window.innerWidth > 1000){
      links.removeAttribute('style');
      document.body.style.overflow = '';
    } else if (links.style.display !== 'flex'){
      links.style.display = 'none';
    }
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav.links a');
  window.addEventListener('scroll', ()=>{
    let current = '';
    sections.forEach(sec=>{
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(a=>{
      a.classList.toggle('active', a.getAttribute('href') === '#'+current);
    });
  });

  // Touch-friendly improvements for mobile
  if (window.innerWidth <= 768){
    document.querySelectorAll('a, button').forEach(el=>{
      if (!el.style.minHeight){
        el.style.minHeight = '44px';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
      }
    });
  }