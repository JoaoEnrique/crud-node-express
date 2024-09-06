document.addEventListener("DOMContentLoaded", () => {
	const logoutButton = document.querySelector('.logout');

	function logout() {
		document.cookie =  'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
		location.reload();
	}

	if(logoutButton){
		logoutButton.addEventListener('click', logout)
	}
})