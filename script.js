document.addEventListener("DOMContentLoaded", () => {
    const texts = [
        { text: "Bug Hunter.", color: "rgb(255,0,0)" },
        { text: "Ethical Hacker.", color: "rgb(255,255,0)" },
        { text: "Coder", color: "rgb(0,255,0)" },
        { text: "Web Developer", color: "rgb(0,0,255)" }
    ];

    const el = document.querySelector('.elements');
    let textIndex = 0;
    let charIndex = 0;
    let typingTimeout;
    let freeze = false;
    let forceComplete = false;
    let isHover = false;

    function typeText() {
        if (!el) return;
        const { text, color } = texts[textIndex];
        el.innerHTML = `<span style="color:${color}">${text.slice(0, charIndex)}</span>`;
        if (charIndex < text.length) {
            charIndex++;
            typingTimeout = setTimeout(typeText, forceComplete ? 10 : 70);
        } else {
            forceComplete = false;
            // अगर mouse hover पर है, तो freeze कर दो
            if (isHover) {
                freeze = true;
                return;
            }
            // नहीं तो अगले text पर जाओ
            typingTimeout = setTimeout(() => {
                charIndex = 0;
                textIndex = (textIndex + 1) % texts.length;
                typeText();
            }, 1000);
        }
    }

    el.addEventListener('mouseenter', () => {
        isHover = true;
        if (charIndex < texts[textIndex].text.length) {
            forceComplete = true;
            clearTimeout(typingTimeout);
            typeText();
        } else {
            freeze = true;
            clearTimeout(typingTimeout);
        }
    });

    el.addEventListener('mouseleave', () => {
        isHover = false;
        if (charIndex === texts[textIndex].text.length && freeze) {
            freeze = false;
            forceComplete = false;
            charIndex = 0;
            textIndex = (textIndex + 1) % texts.length;
            typeText();
        }
    });

    typeText();
});
