const webpush = require('web-push')

webpush.setVapidDetails(
	process.env.PUBLIC_VAPID_KEY,
	process.env.PRIVATE_VAPID_KEY
	process.env.VAPID_SUBJECT,
)

export default webpush