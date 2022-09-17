import { useEffect, useState } from 'react';
import{ ArrowUpIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react';

function ScrollToTopButton() {
    const [scrollToTop, setScrollToTop] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () =>{
            if (window.scrollY > 100) {
                setScrollToTop(true)
            } else {
                setScrollToTop(false)
            }
        })
    }, [])

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    return (
        <div>
            {scrollToTop && (
                <Button
                    style={{
                        position: "fixed",
                        bottom: "50px",
                        right: "50px",
                        height: "50px",
                        width: "50px",
                        fontSize: "50px",
                    }}
                    onClick={scrollUp}
                >
                    <ArrowUpIcon />
                </Button>
            )}
        </div>
    );
}

export default ScrollToTopButton;