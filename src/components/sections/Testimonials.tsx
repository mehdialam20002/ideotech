
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const testimonials = [
    {
      text: "Ideovent transformed our online presence completely. Their team delivered a website that not only looks stunning but also performs exceptionally well. The attention to detail and user experience focus has resulted in a 40% increase in our conversion rate.",
      name: "Sarah Johnson",
      position: "CEO, TechStart Inc.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    },
    {
      text: "Working with Ideovent has been a game-changer for our e-commerce business. Their expertise in UI/UX design and development helped us create an intuitive shopping experience that our customers love. Our sales have increased by 65% since launch.",
      name: "David Chen",
      position: "Founder, StyleMart",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    },
    {
      text: "The SEO strategy developed by Ideovent has dramatically improved our online visibility. We're now ranking on the first page for our key terms, and the increased traffic has led to substantial growth in leads and sales. Highly recommended!",
      name: "Emma Williams",
      position: "Marketing Director, GrowthBiz",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    },
    {
      text: "Ideovent exceeded our expectations in every way. Their team took the time to understand our unique needs and delivered a custom solution that perfectly aligned with our brand and business objectives. The ongoing support has been exceptional.",
      name: "Michael Rodriguez",
      position: "COO, InnovateNow",
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Touch event handlers for mobile swiping
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    if ('touches' in e) {
      setStartX(e.touches[0].clientX);
    } else {
      setStartX(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    
    let currentX;
    if ('touches' in e) {
      currentX = e.touches[0].clientX;
    } else {
      currentX = e.clientX;
    }
    
    const diff = startX - currentX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // For automatic sliding (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section 
      ref={sectionRef} 
      className="section bg-background relative pb-24"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
    >
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            Testimonials
          </div>
          <h2>What Our <span className="text-primary">Clients Say</span></h2>
          <p className="text-lg text-muted-foreground mt-4">
            Don't just take our word for it. Here's what our clients have to say about our work.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto overflow-hidden">
          <div 
            className="transition-all duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * 100}%)`,
              display: 'flex' 
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="min-w-full px-4"
              >
                <div 
                  className={`bg-white rounded-2xl shadow-lg p-8 transition-all duration-700 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  <div className="flex items-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg mb-6">{testimonial.text}</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.position}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg text-primary hover:bg-primary hover:text-white transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg text-primary hover:bg-primary hover:text-white transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? 'bg-primary w-6' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
