document.addEventListener("DOMContentLoaded", () => {

  const menuBtn = document.getElementById("menuBtn");
  const navMenu = document.getElementById("navMenu");

  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }


  document.querySelectorAll(".faq-question").forEach(question => {
    question.addEventListener("click", () => {
      const item = question.parentElement;
      const toggle = question.querySelector(".faq-toggle");
      item.classList.toggle("active");
      if (toggle) {
        toggle.textContent = item.classList.contains("active") ? "−" : "+";
      }
    });
  });


  const track = document.getElementById("slideTrack");
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  let index = 0;

  function updateSlider() {
    if (!track) return;
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  if (track && slides.length && nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      updateSlider();
    });

    prevBtn.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      updateSlider();
    });
  }

  /* ================= SCROLL ANIMATION ================= */
  const fades = document.querySelectorAll(".fade");
  window.addEventListener("scroll", () => {
    fades.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 120) {
        el.classList.add("show");
      }
    });
  });


  const eventDateInput = document.getElementById("eventDate");
  if (eventDateInput) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    const minDate = `${y}-${m}-${d}`;
    eventDateInput.min = minDate;

    eventDateInput.addEventListener("input", () => {
      if (eventDateInput.value < minDate) {
        alert("❌ You cannot select a date before today.");
        eventDateInput.value = "";
      }
    });
  }


  const guestSlider = document.getElementById('guestSlider');
  if (guestSlider) {

    const guestCount = document.getElementById('guestCount');
    const displayGuests = document.getElementById('displayGuests');
    const totalBudget = document.getElementById('totalBudget');
    const perGuest = document.getElementById('perGuest');
    const calculateBtn = document.getElementById('calculateBtn');
    const results = document.getElementById('results');
    const finalAmount = document.getElementById('finalAmount');
    const resultText = document.getElementById('resultText');

    const categories = [
      'venue','catering','decoration','entertainment',
      'photography','invitations','transportation','miscellaneous'
    ];

    function calculateTotal() {
      let total = 0;
      categories.forEach(category => {
        const input = document.getElementById(category);
        total += parseFloat(input?.value) || 0;
      });
      return total;
    }

    function updatePercentages(total) {
      categories.forEach(category => {
        const percentEl = document.getElementById(`${category}-percent`);
        const progressEl = document.getElementById(`${category}-progress`);
        const input = document.getElementById(category);
        if (!percentEl || !progressEl || !input) return;
        const value = parseFloat(input.value) || 0;
        const percent = total ? (value / total) * 100 : 0;
        percentEl.textContent = `${percent.toFixed(1)}%`;
        progressEl.style.width = `${percent}%`;
      });
    }

    function updateBudget() {
      const total = calculateTotal();
      const guests = parseInt(guestSlider.value) || 1;
      totalBudget.textContent = total.toLocaleString();
      perGuest.textContent = (total / guests).toFixed(2);
      updatePercentages(total);
    }

    guestSlider.addEventListener('input', () => {
      guestCount.textContent = guestSlider.value;
      displayGuests.textContent = guestSlider.value;
      updateBudget();
    });

    categories.forEach(c => {
      document.getElementById(c)?.addEventListener('input', updateBudget);
    });

    calculateBtn?.addEventListener('click', () => {
      const total = calculateTotal();
      if (!total) return alert('Please enter budget amounts.');
      finalAmount.textContent = total.toLocaleString();
      resultText.textContent = `Your event costs $${(total / guestSlider.value).toFixed(2)} per person.`;
      results.style.display = 'block';
      results.scrollIntoView({ behavior:'smooth' });
    });

    updateBudget();
  }


  const searchInput = document.getElementById("searchEvent");
  const filterType = document.getElementById("filterType");
  const filterGuests = document.getElementById("filterGuests");
  const guestValue = document.getElementById("guestValue");
  const resetBtn = document.getElementById("resetFilters");
  const cards = document.querySelectorAll(".event-card");

  if (filterType && filterGuests && cards.length) {

    function applyFilters() {
      const search = searchInput ? searchInput.value.toLowerCase() : "";
      const type = filterType.value;
      const maxGuests = parseInt(filterGuests.value);

      cards.forEach(card => {
        const name = card.querySelector("h3").textContent.toLowerCase();
        const cardType = card.dataset.type;
        const guests = parseInt(card.dataset.guests);
        card.style.display =
          name.includes(search) &&
          (type === "all" || cardType === type) &&
          guests <= maxGuests ? "block" : "none";
      });
    }

    searchInput?.addEventListener("input", applyFilters);
    filterType.addEventListener("change", applyFilters);
    filterGuests.addEventListener("input", () => {
      guestValue.textContent = `Up to ${filterGuests.value}`;
      applyFilters();
    });

    resetBtn?.addEventListener("click", () => {
      searchInput && (searchInput.value = "");
      filterType.value = "all";
      filterGuests.value = 2000;
      guestValue.textContent = "Up to 2000";
      applyFilters();
    });

    applyFilters();
  }

});

document.getElementById('recommendBtn')?.addEventListener('click', () => {

  const guestSlider = document.getElementById('guestSlider');
  const eventTypeSelect = document.getElementById('eventType');

  if (!guestSlider || !eventTypeSelect) return;

  const categories = [
    'venue','catering','decoration','entertainment',
    'photography','invitations','transportation','miscellaneous'
  ];

  const eventType = eventTypeSelect.value;
  const guests = parseInt(guestSlider.value) || 1;

  const avgCosts = {
    wedding:150,
    graduation:75,
    corporate:200,
    birthday:50
  };

  const percentages = {
    wedding:[40,30,10,8,7,2,2,1],
    graduation:[30,40,8,10,5,3,2,2],
    corporate:[35,35,5,10,8,4,2,1],
    birthday:[25,40,15,12,3,2,1,2]
  };

  const total = (avgCosts[eventType] || 100) * guests;
  const percents = percentages[eventType];

  categories.forEach((category, i) => {
    const input = document.getElementById(category);
    if (input) {
      input.value = Math.round((total * percents[i]) / 100);
    }
  });


  let sum = 0;
  categories.forEach(c => {
    sum += parseFloat(document.getElementById(c)?.value) || 0;
  });

  document.getElementById('totalBudget').textContent = sum.toLocaleString();
  document.getElementById('perGuest').textContent =
    (sum / guests).toFixed(2);

  alert(`Recommended budget of $${total.toLocaleString()} applied.`);
});
