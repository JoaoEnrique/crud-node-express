document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const apiUrl = document.querySelector('meta[name="api-url"]').getAttribute('content');

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        try {
            const loginResponse = await fetch(`${apiUrl}/api/login`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            });

            if (!loginResponse.ok) {
                throw new Error("Erro ao fazer login.");
            }

            const  { token } = await loginResponse.json();
            
            if (token) {
                Cookies.set("token", `${token}`, { expires: 7 });
                location.replace('/');
            } else {
                const errorElement = document.querySelector('.error')
                errorElement.innerHTML = "Usuário ou senha incorretos"
            }
        } catch(err) {
            const errorElement = document.querySelector('.error')
            errorElement.innerHTML = "Usuário ou senha incorretos"
            console.error(err);
        }

    })
})