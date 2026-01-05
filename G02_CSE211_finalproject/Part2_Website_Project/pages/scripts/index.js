document.addEventListener("DOMContentLoaded", () => {

  /* ================= MOBILE MENU ================= */
  const menuBtn = document.getElementById("menuBtn");
  const navMenu = document.getElementById("navMenu");

  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  /* ================= ACCORDION ================= */
  document.querySelectorAll(".accordion-title").forEach(title => {
  title.addEventListener("click", () => {
    const item = title.parentElement;
    const isOpen = item.classList.contains("active");

    item.classList.toggle("active");

    item.querySelectorAll(".accordion-content").forEach(c => {
      c.style.display = isOpen ? "none" : "block";
    });
  });
});

  /* ================= INFINITE SLIDER ================= */
  const track = document.getElementById("slideTrack");
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  let index = 0;

  function updateSlider() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  if (track && slides.length && nextBtn && prevBtn) {

    nextBtn.addEventListener("click", () => {
      index = (index + 1) % slides.length;   // ✅ wrap forward
      updateSlider();
    });

    prevBtn.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length; // ✅ wrap backward
      updateSlider();
    });

  }

});

// Simple working budget calculator
document.addEventListener('DOMContentLoaded', function() {
    console.log('Budget calculator loaded!');
    
    // Get all important elements
    const guestSlider = document.getElementById('guestSlider');
    const guestCount = document.getElementById('guestCount');
    const displayGuests = document.getElementById('displayGuests');
    const totalBudget = document.getElementById('totalBudget');
    const perGuest = document.getElementById('perGuest');
    const calculateBtn = document.getElementById('calculateBtn');
    const results = document.getElementById('results');
    const finalAmount = document.getElementById('finalAmount');
    const resultText = document.getElementById('resultText');
    
    // Category IDs
    const categories = [
        'venue', 'catering', 'decoration', 'entertainment', 
        'photography', 'invitations', 'transportation', 'miscellaneous'
    ];
    
    // Update guest count when slider moves
    guestSlider.addEventListener('input', function() {
        const value = this.value;
        guestCount.textContent = value;
        displayGuests.textContent = value;
        updateBudget();
    });
    
    // Update budget when any input changes
    categories.forEach(category => {
        const input = document.getElementById(category);
        input.addEventListener('input', updateBudget);
    });
    
    // Get recommendations button
    document.getElementById('recommendBtn').addEventListener('click', function() {
        const eventType = document.getElementById('eventType').value;
        const guests = parseInt(guestSlider.value);
        
        // Average costs per guest
        const avgCosts = {
            wedding: 150,
            graduation: 75,
            corporate: 200,
            birthday: 50
        };
        
        // Percentage allocations
        const percentages = {
            wedding: [40, 30, 10, 8, 7, 2, 2, 1],
            graduation: [30, 40, 8, 10, 5, 3, 2, 2],
            corporate: [35, 35, 5, 10, 8, 4, 2, 1],
            birthday: [25, 40, 15, 12, 3, 2, 1, 2]
        };
        
        const avgCost = avgCosts[eventType] || 100;
        const total = avgCost * guests;
        const percents = percentages[eventType] || percentages.wedding;
        
        // Fill in recommended amounts
        categories.forEach((category, index) => {
            const input = document.getElementById(category);
            const amount = Math.round((total * percents[index]) / 100);
            input.value = amount;
        });
        
        // Update display
        updateBudget();
        
        alert(`Recommended budget of $${total.toLocaleString()} applied for ${eventType} event with ${guests} guests.`);
    });
    
    // Reset all button
    document.getElementById('resetBtn').addEventListener('click', function() {
        guestSlider.value = 50;
        guestCount.textContent = '50';
        displayGuests.textContent = '50';
        document.getElementById('eventType').value = 'wedding';
        
        categories.forEach(category => {
            document.getElementById(category).value = '0';
        });
        
        results.style.display = 'none';
        updateBudget();
    });
    
    // Calculate total budget
    calculateBtn.addEventListener('click', function() {
        const total = calculateTotal();
        
        if (total === 0) {
            alert('Please enter budget amounts for at least one category.');
            return;
        }
        
        const guests = parseInt(guestSlider.value);
        const eventType = document.getElementById('eventType').value;
        const perGuestCost = (total / guests).toFixed(2);
        
        // Show results
        finalAmount.textContent = total.toLocaleString();
        resultText.textContent = `Your ${eventType} event for ${guests} guests costs $${perGuestCost} per person.`;
        results.style.display = 'block';
        
        // Scroll to results
        results.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Calculate total from all categories
    function calculateTotal() {
        let total = 0;
        categories.forEach(category => {
            const input = document.getElementById(category);
            const value = parseFloat(input.value) || 0;
            total += value;
        });
        return total;
    }
    
    // Update budget display
    function updateBudget() {
        const total = calculateTotal();
        const guests = parseInt(guestSlider.value) || 1;
        const perGuestCost = (total / guests).toFixed(2);
        
        // Update totals
        totalBudget.textContent = total.toLocaleString();
        perGuest.textContent = perGuestCost;
        
        // Update percentages and progress bars
        updatePercentages(total);
    }
    
    // Update percentages for each category
    function updatePercentages(total) {
        if (total === 0) {
            categories.forEach(category => {
                document.getElementById(`${category}-percent`).textContent = '0%';
                document.getElementById(`${category}-progress`).style.width = '0%';
            });
            return;
        }
        
        categories.forEach(category => {
            const input = document.getElementById(category);
            const value = parseFloat(input.value) || 0;
            const percentage = (value / total) * 100;
            
            document.getElementById(`${category}-percent`).textContent = 
                `${percentage.toFixed(1)}%`;
            document.getElementById(`${category}-progress`).style.width = 
                `${percentage}%`;
        });
    }
    
    // Initial calculation
    updateBudget();
});

/* ===== MOBILE MENU ===== */
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.onclick = () => navMenu.classList.toggle("active");

/* ===== FIXED ACCORDION (SHOW ALL CONTENT) ===== */
document.querySelectorAll(".accordion-item").forEach(item => {
  const title = item.querySelector(".accordion-title");

  title.onclick = () => {
    const contents = item.querySelectorAll(".accordion-content");

    contents.forEach(content => {
      content.style.display =
        content.style.display === "block" ? "none" : "block";
    });
  };
});

/* ===== SCROLL ANIMATION ===== */
const fades = document.querySelectorAll(".fade");

window.addEventListener("scroll", () => {
  fades.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 120) {
      el.classList.add("show");
    }
  });
});

/* ===== SCROLL TO SECTION ===== */
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}



/* ===== Contact page specific js ===== */

/* ===== Helpers ===== */
const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

function clearErrors(form) {
  $$('.error-message').forEach((n) => n.remove());
  form.querySelectorAll('input,textarea,select').forEach((i) => (i.style.borderColor = 'var(--border)'));
}

function showError(input, msg) {
  clearErrors(input.form);
  const err = document.createElement('div');
  err.className = 'error-message';
  err.textContent = msg;
  err.style.cssText = 'color:#e74c3c;font-size:.9rem;margin-top:6px';
  input.parentNode.appendChild(err);
  input.style.borderColor = '#e74c3c';
}

function validEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function showSuccess(form) {
  const n = document.createElement('div');
  n.className = 'success-message';
  n.innerHTML =
    '<div style="background:#2ecc71;color:#fff;padding:12px;border-radius:6px;margin:14px 0;text-align:center">' +
    '<i class="fas fa-check-circle"></i> <strong>Message Sent Successfully!</strong>' +
    '</div>';
  form.parentNode.insertBefore(n, form.nextSibling);
  form.reset();
  setTimeout(() => n.remove(), 5000);
}

/* ===== Form handling ===== */
const form = $('#contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = $('#name');
    const email = $('#email');
    const message = $('#message');
    const phone = $('#phone');

    clearErrors(form);

    if (!name.value.trim()) return showError(name, 'Name is required');
    if (!email.value.trim()) return showError(email, 'Email is required');
    if (!validEmail(email.value)) return showError(email, 'Please enter a valid email');

    
    if (phone && phone.value.trim()) {
      const normalized = phone.value.replace(/[^\d+]/g, '');
      if (!/^\+\d{8,15}$/.test(normalized))
        return showError(phone, 'Phone must include country code (e.g., +20) and be 8–15 digits. Example: +201234567890');
    }

    if (!message.value.trim() || message.value.trim().length < 10)
      return showError(message, 'Message must be at least 10 characters');

    const btn = form.querySelector('.btn-submit');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    showSuccess(form);

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = 'Send Message';
    }, 2000);
  });
}

/* ===== FAQ (event delegation) ===== */
const faq = $('.faq-container');
if (faq) {
  faq.addEventListener('click', (e) => {
    const item = e.target.closest('.faq-item');
    if (!item) return;
    $$('.faq-item').forEach((i) => i !== item && i.classList.remove('active'));
    item.classList.toggle('active');
  });
}



/* ===== Phone formatting ===== */
const phone = $('#phone');
if (phone) {
  phone.addEventListener('input', (e) => {
    let v = e.target.value.replace(/[^\d+]/g, ''); // keep + if present
    if (v.indexOf('+') > 0) v = v.replace(/\+/g, ''); // allow + only at start
    if (v.startsWith('+')) {
      v = '+' + v.slice(1).replace(/\D/g, '');
    } else {
      v = v.replace(/\D/g, '');
      if (v.length > 3 && v.length <= 6) v = `(${v.slice(0,3)}) ${v.slice(3)}`;
      else if (v.length > 6) v = `(${v.slice(0,3)}) ${v.slice(3,6)}-${v.slice(6,10)}`;
    }
    e.target.value = v;
  });
}

/* ===== Utility styles (injected) ===== */
(function injectStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    .btn-submit:active { transform: scale(0.98); }
    .faq-answer { animation: slideDown 0.3s ease; }
    @keyframes slideDown { from { opacity: 0; max-height: 0; } to { opacity: 1; max-height: 200px; } }
  `;
  document.head.appendChild(style);
})();