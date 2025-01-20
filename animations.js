document.addEventListener('DOMContentLoaded', function() {
    const viewer = document.getElementById('spline-viewer');
    
    if (viewer) {
        function updateSplineSize() {
            const viewer = document.getElementById('spline-viewer');
            if (!viewer) return;

            // Check if mobile device
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
                // On mobile, use simpler sizing logic
                viewer.style.width = '100%';
                viewer.style.height = '100%';
                viewer.style.transform = 'none';
            } else {
                // Desktop sizing logic
                const vw = window.innerWidth;
                const vh = window.innerHeight;
                const minWidth = 1024;
                const minHeight = 768;
                
                const scaleX = vw / minWidth;
                const scaleY = vh / minHeight;
                const scale = Math.max(scaleX, scaleY);
                
                const width = minWidth * scale;
                const height = minHeight * scale;
                
                const leftOffset = (vw - width) / 2;
                const topOffset = (vh - height) / 2;
                
                viewer.style.transform = `translate(${leftOffset}px, ${topOffset}px) scale(${scale})`;
                viewer.style.width = `${minWidth}px`;
                viewer.style.height = `${minHeight}px`;
            }
            
            // Force spline to recognize size change
            viewer.requestRender && viewer.requestRender();
        }
        
        // Handle initial load
        viewer.addEventListener('load', () => {
            console.log('Spline scene loaded successfully');
            updateSplineSize();
        });
        
        // Add resize handler with debounce
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updateSplineSize, 100);
        });
        
        // Initial size set
        updateSplineSize();
    }

    // Simplified word animation
    const changingText = document.querySelector('.changing-text');
    if (changingText && changingText.dataset.words) {
        const words = JSON.parse(changingText.dataset.words);
        let currentIndex = 0;
        let isAnimating = false;

        function updateText() {
            if (isAnimating || !words.length) return;
            isAnimating = true;

            changingText.style.opacity = '0';
            
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % words.length;
                const nextWord = words[currentIndex];
                
                if (nextWord && nextWord.trim()) {
                    changingText.textContent = nextWord;
                    changingText.style.opacity = '1';
                }
                isAnimating = false;
            }, 750);
        }
        
        // Basic transition
        changingText.style.transition = 'opacity 0.75s ease-in-out';
        
        // Start animation cycle
        setTimeout(updateText, 4000);
        setInterval(updateText, 4000);
    }
});
