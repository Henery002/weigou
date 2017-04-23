function prev(a) {
    a.preventDefault()
}
document.addEventListener('touchmove', prev(a), false);
document.removeEventListener('touchmove', prev(a), false);