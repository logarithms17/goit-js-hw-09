import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    datetimePicker: document.querySelector("input#datetime-picker"),
    startButton: document.querySelector("button[data-start]"),
    days: document.querySelector("span[data-days]"),
    hours: document.querySelector("span[data-hours]"),
    minutes: document.querySelector("span[data-minutes]"),
    seconds: document.querySelector("span[data-seconds]"),
};

refs.startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0])
    const selectedDate = selectedDates[0];
    const startTime = Date.now();

    if (selectedDate < startTime) {
      Notify.failure("Please choose a date in the future!")
      refs.startButton.disabled = true
      return
    }

    refs.startButton.disabled = false;
    let intervalId = null

    refs.startButton.addEventListener("click", startCountdown)

    function startCountdown() {
      refs.startButton.disabled = true
      refs.datetimePicker.disabled = true

      intervalId = setInterval(() => {
        const currentTime = Date.now()

        if (selectedDate < currentTime) {
          clearInterval(intervalId)
          refs.datetimePicker.disabled = false
          return
        }

        const timeDifference = selectedDate - currentTime;
        const { days, hours, minutes, seconds } = convertMs(timeDifference)
        
        refs.days.textContent = addLeadingZero(days)
        refs.hours.textContent = addLeadingZero(hours)
        refs.minutes.textContent = addLeadingZero(minutes)
        refs.seconds.textContent = addLeadingZero(seconds)

      })
    }
  },
};

flatpickr("#datetime-picker", options)

function addLeadingZero(value) {
  return String(value).padStart(2, "0"); //01
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000; //1000
  const minute = second * 60; // 60,000
  const hour = minute * 60; //3,600,000
  const day = hour * 24; //86,400,000


  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//example solution
//ms = 24,140,000
// days = 0 with remainder 24,140,000
// hours = 6 hours with remainder 2,540,000 from 6 x 3,600,000 then minus it from 24,140,000
// minutes = 42 minutes with remainder 20,000 from 60,000 x 42 then minus it from 2,540,000