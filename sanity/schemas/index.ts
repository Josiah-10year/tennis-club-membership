//bookings
import booking from './court-booking-schema'
import court from './courts-schema'
//events calender
import event from './events-schema'
//Post Board
import post from './post-schema'
import comment from './comment-schema'
//user
import user from './user-schema'
//??
import interest from './interest-schema'
import topic from './topic-schema'



const schemas = [booking, comment, court, event, interest, post, topic, user];


export default schemas