<template>
  <div>
    <div class="row mb-3">
      <div class="col">
        <div class="card card-primary">
          <div class="card-header">
            <div class="row">
              <div class="col">Calendário</div>
              <div class="col text-right">                
              </div>
            </div>
          </div>
          <div class="card-body">
            <FullCalendar defaultView="dayGridMonth" :plugins="calendarPlugins" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apis from '../services/api'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
export default {
  name: 'Calendar',
  data () {
    return {
      calendarPlugins: [ dayGridPlugin ]
    }
  },
  mounted () {
    
  },
  methods: {
    
  },
  components: {
    FullCalendar
  },
}

</script>
