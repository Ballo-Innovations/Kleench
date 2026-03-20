import { DotLottieReact, DotLottie } from '@lottiefiles/dotlottie-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

interface LottieAnimationProps {
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  onComplete?: () => void;
}

export function LottieAnimation({ 
  src, 
  className = "w-full h-full", 
  loop = true, 
  autoplay = true,
  speed = 1,
  onComplete 
}: LottieAnimationProps) {
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

  useEffect(() => {
    if (!dotLottie || !onComplete) return;

    const onCompleteWrapper = () => {
      onComplete();
    };

    dotLottie.addEventListener('complete', onCompleteWrapper);
    
    return () => {
      dotLottie.removeEventListener('complete', onCompleteWrapper);
    };
  }, [dotLottie, onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={className}
    >
      <DotLottieReact
        src={src}
        loop={loop}
        autoplay={autoplay}
        speed={speed}
        dotLottieRefCallback={setDotLottie}
      />
    </motion.div>
  );
}
