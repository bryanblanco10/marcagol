console.log('Service Worker!!')
self.addEventListener('push', e => {
	 const data = e.data.json()
	 console.log(data)
	 self.registration.showNotification(data.title, {
	   body: data.message,
	   icon: 'marcagol10.ico',
	   sound: '',
	   vibrate: [75,75,75,75,75,75,75,75,150,150,150,450,75,75,75,75,75,525]
	 })
})