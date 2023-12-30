
document.addEventListener('DOMContentLoaded', () => {
    const resetPassBtn = document.getElementById('resetPassBtn');
    const resetPassForm = document.getElementById('resetPassForm');

    resetPassBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (resetPassForm.style.display === 'none') {
            resetPassForm.style.display = 'block';
        } else {
            resetPassForm.style.display = 'none';
        }
    })
});
