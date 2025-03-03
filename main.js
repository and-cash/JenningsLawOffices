// main.js
const { createApp, ref } = Vue;

const App = {
  setup() {
    const title = ref('');
    const subtitle = ref('');
    const services = ref([]);
    const attorneys = ref([]);
    const testimonials = ref([]);
    const currentTestimonial = ref(1);
    const isLoading = ref(true);
    
    const contactForm = ref({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
    
    // Fetch data from JSON file
    fetch('./info.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        title.value = data.title;
        subtitle.value = data.subtitle;
        services.value = data.services;
        attorneys.value = data.attorneys;
        testimonials.value = data.testimonials;
        isLoading.value = false;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        isLoading.value = false;
      });
    
    const nextTestimonial = () => {
      if (currentTestimonial.value < testimonials.value.length) {
        currentTestimonial.value++;
      } else {
        currentTestimonial.value = 1;
      }
    };
    
    const prevTestimonial = () => {
      if (currentTestimonial.value > 1) {
        currentTestimonial.value--;
      } else {
        currentTestimonial.value = testimonials.value.length;
      }
    };
    
    const submitForm = () => {
      alert('Thank you for contacting us. We will get back to you shortly.');
      contactForm.value = {
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      };
    };
    
    return {
      title,
      subtitle,
      services,
      attorneys,
      testimonials,
      currentTestimonial,
      contactForm,
      isLoading,
      nextTestimonial,
      prevTestimonial,
      submitForm
    };
  }
};

// Wait for DOM to be fully loaded before mounting the app
document.addEventListener('DOMContentLoaded', () => {
  createApp(App).mount('#app');
});