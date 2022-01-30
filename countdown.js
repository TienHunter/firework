const $ = document.querySelector.bind(document)
const contaniner = $('.container')
contaniner.innerHTML = `
         <div class="block">
            <div class="day"></div>
            <div class="text">Days</div>
         </div>

         <div class="block hour">
            <div class="hour"></div>
            <div class="text">Hours</div>
         </div>

         <div class="block minute">
            <div class="minute"></div>
            <div class="text">Minutes</div>
         </div>

         <div class="block ">
            <div class="second"></div>
            <div class="text">Seconds</div>
         </div>
      </div>
`

const day = $('.block .day')
const hour = $('.block .hour')
const minute = $('.block .minute')
const second = $('.block .second')

const finish = Date.parse("2022-2-1")
const formatShow = (input) => {
   if (input < 10)
      return '0' + input
   else return input
}
const caculation = () => {

   const current = new Date().getTime()
   let time = Math.floor((finish - current) / 1000);
   const days = Math.floor(time / 86400);
   time -= days * 86400;
   const hours = Math.floor(time / 3600);
   time -= hours * 3600;
   const minutes = Math.floor(time / 60);
   time -= minutes * 60
   const seconds = time;
   day.innerText = formatShow(days);
   hour.innerText = formatShow(hours);
   minute.innerText = formatShow(minutes);
   second.innerText = formatShow(seconds);
}
caculation
setInterval(() => {
   caculation()
}, 1000)
