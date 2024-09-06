document.addEventListener("DOMContentLoaded", () => {
    const removeButton = document.querySelectorAll(".btn-remove-user");
    const apiUrl = document.querySelector('meta[name="api-url"]').getAttribute('content');

    removeButton.forEach(button => {
            button.addEventListener("click", async (event) => {
                const userId = button.getAttribute("data-user-id");
                const token = getCookie('token');

                try {
                    const removeResponse = await fetch(`${apiUrl}/api/users/${userId}`, {
                        method: "DELETE",
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    
                    location.reload();
                } catch(error) {
                    console.error('Erro ao enviar solicitação', error);
                }
        })
    })

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

})