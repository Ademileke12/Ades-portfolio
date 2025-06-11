function scrollToStart() {
    const list = document.querySelector('.list');
    list.scrollTo({
      left: 0,
      behavior: 'smooth'
    });
}

function scrollToEnd() {
    const list = document.querySelector('.list');
    list.scrollTo({
      left: list.scrollWidth,
      behavior: 'smooth'
    });
}