// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// @Component({
//   selector: 'app-homepage',
//   templateUrl: './homepage.component.html',
//   styleUrls: ['./homepage.component.scss']
// })
// export class HomepageComponent implements OnInit {

//   constructor(private router: Router) {}

// goToLogin() {
//   this.router.navigate(['/login']);
// }


//   ngOnInit(): void {
//   }

// }



import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-homepage',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  animations: [
    trigger('ripple', [
      state('void', style({ opacity: 0, transform: 'scale(0)' })),
      transition('void => *', [
        animate('600ms ease-out', style({ opacity: 1, transform: 'scale(4)' }))
      ])
    ])
  ]
})
export class HomepageComponent implements OnInit, OnDestroy {
  // Navbar scroll state
  isScrolled = false;

  // Typewriter effect
  fullText = 'Connecting Equipment, Empowering Care';
  displayedText = '';
  typingComplete = false;
  private typingInterval: any;

  // Section visibility for animations
  heroVisible = false;
  featuresVisible = false;
  testimonialsVisible = false;

  // Ripple effect
  showRipple = false;

  // Particles for hero background
  particles: Array<{ x: number; y: number; delay: number }> = [];

  // Features data
  features = [
    {
      icon: 'fas fa-tools',
      title: 'Maintenance Scheduling',
      description: 'Automate inspections and routine checks. Get notified before breakdowns happen.'
    },
    {
      icon: 'fas fa-box',
      title: 'Supplier Integration',
      description: 'Real-time access to suppliers, spare parts inventory, and transparent procurement process.'
    },
    {
      icon: 'fas fa-hospital',
      title: 'Hospital Coordination',
      description: 'Seamless collaboration between departments, branches, and healthcare teams across regions.'
    }
  ];

  // Testimonials data
  testimonials = [
    {
      text: 'MediSphere has transformed how we manage our hospital\'s equipment. It\'s efficient and intuitive.',
      name: 'Dr. Maya Thomas',
      role: 'Chief Medical Officer',
      avatarIcon: 'fas fa-user-md'
    },
    {
      text: 'Maintenance scheduling is now effortless and highly accurate. We\'ve reduced downtime by 40%!',
      name: 'Ramesh Iyer',
      role: 'Lead Technician',
      avatarIcon: 'fas fa-user-cog'
    },
    {
      text: 'The supplier integration is a complete game-changer. Procurement has never been easier.',
      name: 'Sneha Kapoor',
      role: 'Supply Chain Manager',
      avatarIcon: 'fas fa-user-tie'
    }
  ];

  private intersectionObserver: IntersectionObserver | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialize AOS
    if (typeof window !== 'undefined') {
      // import('aos').then(AOS => {
      //   AOS.init({
      //     duration: 1000,
      //     once: true,
      //     easing: 'ease-out-cubic'
      //   });
      // });
    }

    // Generate particles
    this.generateParticles();

    // Start typewriter effect
    this.startTypewriter();

    // Setup Intersection Observer for scroll animations
    this.setupIntersectionObserver();

    // Show hero content after a brief delay
    setTimeout(() => {
      this.heroVisible = true;
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.pageYOffset > 50;
  }

  generateParticles(): void {
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3
      });
    }
  }

  startTypewriter(): void {
    let index = 0;
    this.typingInterval = setInterval(() => {
      if (index < this.fullText.length) {
        this.displayedText += this.fullText.charAt(index);
        index++;
      } else {
        clearInterval(this.typingInterval);
        this.typingComplete = true;
      }
    }, 50);
  }

  setupIntersectionObserver(): void {
    const options = {
      threshold: 0.2,
      rootMargin: '0px'
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'features') {
            this.featuresVisible = true;
          } else if (entry.target.id === 'testimonials') {
            this.testimonialsVisible = true;
          }
        }
      });
    }, options);

    // Observe sections
    setTimeout(() => {
      const featuresSection = document.getElementById('features');
      const testimonialsSection = document.getElementById('testimonials');
      
      if (featuresSection) {
        this.intersectionObserver?.observe(featuresSection);
      }
      if (testimonialsSection) {
        this.intersectionObserver?.observe(testimonialsSection);
      }
    }, 100);
  }

  goToLogin(): void {
    this.showRipple = true;
    setTimeout(() => {
      this.router.navigate(['/login']);
      this.showRipple = false;
    }, 300);
  }

  smoothScroll(event: Event, targetId: string): void {
    event.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }

  // 3D Tilt Effect for Feature Cards
  onCardHover(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    card.style.transition = 'none';
  }

  onCardMove(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  }

  onCardLeave(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    card.style.transition = 'transform 0.5s ease';
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  }
}
