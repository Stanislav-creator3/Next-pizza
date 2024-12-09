import { FC, MutableRefObject, useEffect, useRef, useState } from "react";

interface returnProps<T> { 
    isSticky: boolean;
    ref: React.RefObject<T>;
    setIsSticky: (type: boolean) => void;
 
}


export const useSticky = <T extends HTMLElement> ( observerSettings = {threshold: [1]}) : returnProps<T>=> {
  const [isSticky, setIsSticky] = useState(false)
  const ref = useRef<T>(null)
  
  useEffect(()=>{
    const cachedRef = ref.current,
          observer = new IntersectionObserver(
            ([e]) => setIsSticky(e.intersectionRatio < 1),
            observerSettings
          )

    if (cachedRef) observer.observe(cachedRef)
    
    return () => {
      if(cachedRef) observer.unobserve(cachedRef!)
    }
  }, [])
  
  return {isSticky, ref, setIsSticky};
}
