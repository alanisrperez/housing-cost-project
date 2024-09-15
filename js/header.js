const slider = document.querySelector('.mySlider');
slider.addEventListener('input', function() {
    const value = (this.value - this.min) / (this.max - this.min) * 100;
    this.style.setProperty('--value', `${value}%`);
});